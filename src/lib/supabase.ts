import { createClient } from '@supabase/supabase-js';
import { AppointmentInquiry } from '../types';

export const SUPABASE_PROJECT_ID = 'bvjzskzlwcbycmnmhsqf';
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_CaCkwvvh4t0gYKIYk9i6Ow_Fgzhe6Ao';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseInsertResult {
  success: boolean;
  table?: string;
  data?: any;
  error?: any;
  message?: string;
}

/**
 * Persists an appointment booking inquiry to Supabase tables.
 * Tries the primary 'appointments' table first, with fallbacks to other common table names.
 */
export async function saveAppointmentToSupabase(
  inquiry: Omit<AppointmentInquiry, 'timestamp' | 'ghlPipelineStage' | 'ghlTags'>
): Promise<SupabaseInsertResult> {
  const payload = {
    full_name: inquiry.fullName.trim(),
    phone: inquiry.phone.trim(),
    email: inquiry.email.trim(),
    preferred_contact_method: inquiry.preferredContactMethod,
    reason_for_contact: inquiry.reasonForContact,
    preferred_appointment_type: inquiry.preferredAppointmentType,
    preferred_language: inquiry.preferredLanguage || 'Urdu & English',
    selected_plan: inquiry.selectedPlan || (inquiry.reasonForContact.includes('Rs.') ? inquiry.reasonForContact : null),
    preferred_date: inquiry.preferredDate?.trim() || null,
    message: inquiry.message?.trim() || null,
    consent: inquiry.consent,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  const candidateTables = ['appointments', 'appointment_inquiries', 'bookings', 'inquiries'];

  for (const tableName of candidateTables) {
    try {
      const { data, error } = await supabase.from(tableName).insert([payload]).select();

      if (!error) {
        console.log(`[Supabase] Successfully saved appointment to table '${tableName}':`, data);
        return {
          success: true,
          table: tableName,
          data,
          message: `Appointment saved in Supabase table '${tableName}'`,
        };
      }

      // If table doesn't exist in schema cache (PGRST205), try next candidate table
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        continue;
      }

      // If column mismatch error, try minimal payload
      if (error.code === 'PGRST204' || error.message?.includes('column')) {
        const minimalPayload = {
          full_name: payload.full_name,
          phone: payload.phone,
          email: payload.email,
          message: `${payload.selected_plan ? `[Plan: ${payload.selected_plan}] ` : ''}${payload.message || payload.reason_for_contact}`,
        };
        const { data: minData, error: minError } = await supabase.from(tableName).insert([minimalPayload]).select();
        if (!minError) {
          console.log(`[Supabase] Successfully saved minimal appointment to '${tableName}':`, minData);
          return {
            success: true,
            table: tableName,
            data: minData,
            message: `Appointment saved in Supabase '${tableName}' (adapted columns)`,
          };
        }
      }

      console.warn(`[Supabase] Table '${tableName}' returned error:`, error);
    } catch (err) {
      console.warn(`[Supabase] Error attempting insert into '${tableName}':`, err);
    }
  }

  return {
    success: false,
    message: 'Could not find a matching appointments table in Supabase. Please ensure the table is created in your Supabase SQL editor.',
  };
}

/**
 * Pings Supabase to check connection and database table existence.
 */
export async function checkSupabaseStatus(): Promise<{
  connected: boolean;
  tableFound: boolean;
  tableName?: string;
  error?: string;
}> {
  try {
    const candidateTables = ['appointments', 'appointment_inquiries', 'bookings', 'inquiries'];
    for (const tbl of candidateTables) {
      const { error } = await supabase.from(tbl).select('id').limit(1);
      if (!error) {
        return { connected: true, tableFound: true, tableName: tbl };
      }
      if (error.code !== 'PGRST205') {
        // Table exists but maybe empty or has RLS policy notice
        return { connected: true, tableFound: true, tableName: tbl };
      }
    }
    return {
      connected: true,
      tableFound: false,
      error: "Project connected, but 'appointments' table has not been created yet.",
    };
  } catch (err: any) {
    return {
      connected: false,
      tableFound: false,
      error: err?.message || 'Connection failed',
    };
  }
}

export interface AdminBookingRecord {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  preferred_contact_method: string;
  reason_for_contact: string;
  preferred_appointment_type: string;
  preferred_language: string;
  selected_plan?: string;
  preferred_date?: string;
  message?: string;
  consent: boolean;
  status: string;
  source?: 'supabase' | 'local';
}

/**
 * Fetches all appointments from Supabase tables.
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  success: boolean;
  data: AdminBookingRecord[];
  table?: string;
  error?: any;
}> {
  const candidateTables = ['appointments', 'appointment_inquiries', 'bookings', 'inquiries'];
  for (const tbl of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(tbl)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        const formatted: AdminBookingRecord[] = data.map((item: any, idx: number) => ({
          id: item.id || `supa-${idx}-${Date.now()}`,
          created_at: item.created_at || new Date().toISOString(),
          full_name: item.full_name || item.fullName || 'Anonymous Patient',
          phone: item.phone || item.phoneNumber || '',
          email: item.email || '',
          preferred_contact_method: item.preferred_contact_method || item.preferredContactMethod || 'WhatsApp',
          reason_for_contact: item.reason_for_contact || item.reasonForContact || 'General Consultation',
          preferred_appointment_type: item.preferred_appointment_type || item.preferredAppointmentType || 'Online Video',
          preferred_language: item.preferred_language || item.preferredLanguage || 'Urdu & English',
          selected_plan: item.selected_plan || item.selectedPlan || '',
          preferred_date: item.preferred_date || item.preferredDate || '',
          message: item.message || '',
          consent: item.consent ?? true,
          status: item.status || 'new',
          source: 'supabase',
        }));
        return { success: true, data: formatted, table: tbl };
      }
    } catch (err) {
      // try next table
    }
  }

  return {
    success: false,
    data: [],
    error: "No appointments table found in Supabase yet",
  };
}

/**
 * Updates the clinical status of an appointment.
 */
export async function updateAppointmentStatusInSupabase(
  id: string,
  newStatus: string
): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) return { success: true };
    return { success: false, error };
  } catch (err) {
    return { success: false, error: err };
  }
}

/**
 * Deletes an appointment record.
 */
export async function deleteAppointmentFromSupabase(
  id: string
): Promise<{ success: boolean; error?: any }> {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    if (!error) return { success: true };
    return { success: false, error };
  } catch (err) {
    return { success: false, error: err };
  }
}

export const SUPABASE_SQL_SETUP = `-- Supabase SQL Setup for MindSukoon Appointments
-- Copy and run this in your Supabase project (SQL Editor -> New query -> Run)

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    preferred_contact_method TEXT DEFAULT 'WhatsApp',
    reason_for_contact TEXT,
    preferred_appointment_type TEXT DEFAULT 'Online Video',
    preferred_language TEXT DEFAULT 'Urdu & English',
    selected_plan TEXT,
    preferred_date TEXT,
    message TEXT,
    consent BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'new'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous booking requests from the website
CREATE POLICY "Allow anonymous users to submit appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading appointments (for website administrators)
CREATE POLICY "Allow reading appointments"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updating appointments status
CREATE POLICY "Allow updating appointments"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Allow deleting appointments
CREATE POLICY "Allow deleting appointments"
ON public.appointments
FOR DELETE
TO anon, authenticated
USING (true);
`;
