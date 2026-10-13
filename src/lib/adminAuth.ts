import { supabase } from './supabase';

const ADMIN_STORAGE_KEY = 'mindsukoon_admin_master_account';
const SESSION_STORAGE_KEY = 'mindsukoon_admin_session';

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  slotClaimed: boolean;
}

export interface AdminSession {
  email: string;
  name: string;
  loggedInAt: number;
}

/**
 * SHA-256 password hashing using standard Web Crypto API.
 */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks whether the single admin account slot is still available for initial registration.
 */
export async function isSingleAdminSlotAvailable(): Promise<boolean> {
  // 1. Check local secure storage
  const localAccount = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (localAccount) {
    try {
      const parsed = JSON.parse(localAccount);
      if (parsed?.slotClaimed && parsed?.email) {
        return false;
      }
    } catch {
      // ignore
    }
  }

  // 2. Check Supabase 'admin_profile' or 'admin_users' table if created
  try {
    const { data, error } = await supabase.from('admin_profile').select('id, email').limit(1);
    if (!error && data && data.length > 0) {
      return false;
    }
  } catch {
    // Supabase table may not exist yet; rely on local flag
  }

  return true;
}

/**
 * Registers the SINGLE allowed admin account.
 * Rejects immediately if an account has already been established.
 */
export async function registerSingleAdminAccount(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const slotAvailable = await isSingleAdminSlotAvailable();
  if (!slotAvailable) {
    return {
      success: false,
      error: 'The single administrator slot is already claimed. Additional admin accounts cannot be created.',
    };
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanName || !cleanEmail || cleanPassword.length < 6) {
    return {
      success: false,
      error: 'Please provide a valid name, email address, and a password of at least 6 characters.',
    };
  }

  const passwordHash = await hashPassword(cleanPassword);
  const account: AdminAccount = {
    id: 'mindsukoon-admin-primary',
    name: cleanName,
    email: cleanEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
    slotClaimed: true,
  };

  // Save to persistent storage
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(account));

  // Try persisting to Supabase admin_profile table if available
  try {
    await supabase.from('admin_profile').insert([
      {
        id: account.id,
        name: account.name,
        email: account.email,
        password_hash: passwordHash,
        created_at: account.createdAt,
      },
    ]);
  } catch (err) {
    console.log('[Admin Auth] Supabase admin_profile sync note:', err);
  }

  // Automatically start authenticated session
  setAdminSession({
    name: account.name,
    email: account.email,
    loggedInAt: Date.now(),
  });

  return { success: true };
}

/**
 * Authenticates the single admin account.
 */
export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const localRaw = localStorage.getItem(ADMIN_STORAGE_KEY);
  let account: AdminAccount | null = null;

  if (localRaw) {
    try {
      account = JSON.parse(localRaw);
    } catch {
      account = null;
    }
  }

  // If not found in localStorage, attempt to fetch from Supabase
  if (!account) {
    try {
      const { data } = await supabase
        .from('admin_profile')
        .select('*')
        .eq('email', cleanEmail)
        .limit(1);
      if (data && data.length > 0) {
        account = {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          passwordHash: data[0].password_hash,
          createdAt: data[0].created_at,
          slotClaimed: true,
        };
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(account));
      }
    } catch {
      // ignore
    }
  }

  if (!account) {
    return {
      success: false,
      error: 'No administrator account found. Please complete the initial admin setup.',
    };
  }

  if (account.email.toLowerCase() !== cleanEmail) {
    return {
      success: false,
      error: 'Invalid administrator email address.',
    };
  }

  const inputHash = await hashPassword(cleanPassword);
  if (inputHash !== account.passwordHash) {
    return {
      success: false,
      error: 'Incorrect administrator password.',
    };
  }

  const session: AdminSession = {
    name: account.name,
    email: account.email,
    loggedInAt: Date.now(),
  };

  setAdminSession(session);

  return { success: true, session };
}

/**
 * Retrieves active admin session.
 */
export function getAdminSession(): AdminSession | null {
  const raw = sessionStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Sets active admin session.
 */
export function setAdminSession(session: AdminSession): void {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

/**
 * Logs out the active admin.
 */
export function logoutAdmin(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
