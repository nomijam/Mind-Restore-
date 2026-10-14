import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Lock,
  User,
  Mail,
  Key,
  LogOut,
  RefreshCw,
  Search,
  Calendar,
  Phone,
  MessageCircle,
  Download,
  CheckCircle2,
  AlertCircle,
  Settings,
  Database,
  Copy,
  ExternalLink,
  Check,
  Clock,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import {
  isSingleAdminSlotAvailable,
  registerSingleAdminAccount,
  loginAdmin,
  getAdminSession,
  logoutAdmin,
  AdminSession,
} from '../lib/adminAuth';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  checkSupabaseStatus,
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase,
  deleteAppointmentFromSupabase,
  SUPABASE_SQL_SETUP,
  AdminBookingRecord,
} from '../lib/supabase';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const AdminPortal: React.FC = () => {
  const { activeModal, closeModal, settings, updateSettings, resetSettings } = usePractice();

  // Authentication State
  const [session, setSession] = useState<AdminSession | null>(null);
  const [slotAvailable, setSlotAvailable] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Forms state
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Portal Navigation Tabs: 'bookings' | 'settings' | 'database'
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings' | 'database'>('bookings');

  // Bookings state
  const [bookings, setBookings] = useState<AdminBookingRecord[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState<boolean>(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');

  // Practice Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    organizationName: settings.organizationName,
    foundedYear: settings.foundedYear,
    heritageTagline: settings.heritageTagline,
    phoneDisplay: settings.phoneDisplay,
    phoneNumber: settings.phoneNumber,
    whatsappDisplayNumber: settings.whatsappDisplayNumber,
    whatsappNumber: settings.whatsappNumber,
    email: settings.email,
    inPersonClinicAddress: settings.inPersonClinicAddress,
    hoursOfOperation: settings.hoursOfOperation,
    standardInitialFeePkr: settings.standardInitialFeePkr,
    standardFollowUpFeePkr: settings.standardFollowUpFeePkr,
    standardOverseasFeeUsd: settings.standardOverseasFeeUsd,
    ghlWebhookUrl: settings.ghlWebhookUrl || '',
  });
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Database Tab State
  const [dbStatus, setDbStatus] = useState<{
    loading: boolean;
    connected: boolean;
    tableFound: boolean;
    tableName?: string;
    error?: string;
  }>({
    loading: false,
    connected: true,
    tableFound: false,
  });
  const [copiedSql, setCopiedSql] = useState(false);

  // Initial Auth Check whenever modal opens
  useEffect(() => {
    if (activeModal === 'admin') {
      checkAuthAndSlot();
    }
  }, [activeModal]);

  // Sync settings form when settings change
  useEffect(() => {
    setSettingsForm({
      organizationName: settings.organizationName,
      foundedYear: settings.foundedYear,
      heritageTagline: settings.heritageTagline,
      phoneDisplay: settings.phoneDisplay,
      phoneNumber: settings.phoneNumber,
      whatsappDisplayNumber: settings.whatsappDisplayNumber,
      whatsappNumber: settings.whatsappNumber,
      email: settings.email,
      inPersonClinicAddress: settings.inPersonClinicAddress,
      hoursOfOperation: settings.hoursOfOperation,
      standardInitialFeePkr: settings.standardInitialFeePkr,
      standardFollowUpFeePkr: settings.standardFollowUpFeePkr,
      standardOverseasFeeUsd: settings.standardOverseasFeeUsd,
      ghlWebhookUrl: settings.ghlWebhookUrl || '',
    });
  }, [settings]);

  const checkAuthAndSlot = async () => {
    setAuthLoading(true);
    setAuthError(null);
    const existingSession = getAdminSession();
    setSession(existingSession);

    const available = await isSingleAdminSlotAvailable();
    setSlotAvailable(available);
    setAuthLoading(false);

    if (existingSession) {
      loadBookings();
      loadDbStatus();
    }
  };

  const loadBookings = async () => {
    setBookingsLoading(true);
    setBookingsError(null);

    // 1. Fetch from Supabase
    const supaResult = await fetchAppointmentsFromSupabase();

    // 2. Fetch local backup inquiries
    let localInquiries: AdminBookingRecord[] = [];
    try {
      const raw = localStorage.getItem('inst_1981_inquiries');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          localInquiries = parsed.map((item: any, idx: number) => ({
            id: `local-${item.timestamp || idx}`,
            created_at: item.timestamp || new Date().toISOString(),
            full_name: item.fullName || 'Anonymous Patient',
            phone: item.phone || '',
            email: item.email || '',
            preferred_contact_method: item.preferredContactMethod || 'WhatsApp',
            reason_for_contact: item.reasonForContact || 'General Consultation',
            preferred_appointment_type: item.preferredAppointmentType || 'Online Video',
            preferred_language: item.preferredLanguage || 'Urdu & English',
            selected_plan: item.selectedPlan || '',
            preferred_date: item.preferredDate || '',
            message: item.message || '',
            consent: item.consent ?? true,
            status: item.ghlPipelineStage ? 'new' : 'new',
            source: 'local',
          }));
        }
      }
    } catch {
      // ignore
    }

    if (supaResult.success && supaResult.data.length > 0) {
      // Merge unique by phone/email/timestamp
      const combined = [...supaResult.data];
      for (const loc of localInquiries) {
        const exists = combined.some(
          (c) =>
            (c.phone && c.phone === loc.phone && Math.abs(new Date(c.created_at).getTime() - new Date(loc.created_at).getTime()) < 3600000) ||
            (c.email && c.email === loc.email && Math.abs(new Date(c.created_at).getTime() - new Date(loc.created_at).getTime()) < 3600000)
        );
        if (!exists) {
          combined.push(loc);
        }
      }
      setBookings(combined);
    } else if (localInquiries.length > 0) {
      setBookings(localInquiries);
      if (!supaResult.success) {
        setBookingsError(
          "Supabase 'appointments' table not found yet. Showing inquiries captured on this browser."
        );
      }
    } else {
      setBookings([]);
      if (!supaResult.success) {
        setBookingsError(
          "Supabase 'appointments' table has not been created yet. You can create it with the one-click SQL script in the Database tab."
        );
      }
    }

    setBookingsLoading(false);
  };

  const loadDbStatus = async () => {
    setDbStatus((s) => ({ ...s, loading: true }));
    const result = await checkSupabaseStatus();
    setDbStatus({
      loading: false,
      connected: result.connected,
      tableFound: result.tableFound,
      tableName: result.tableName,
      error: result.error,
    });
  };

  const handleRegisterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (signupForm.password !== signupForm.confirmPassword) {
      setAuthError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    setIsSubmittingAuth(true);
    const result = await registerSingleAdminAccount(
      signupForm.name,
      signupForm.email,
      signupForm.password
    );
    setIsSubmittingAuth(false);

    if (result.success) {
      const newSession = getAdminSession();
      setSession(newSession);
      setSlotAvailable(false);
      loadBookings();
      loadDbStatus();
    } else {
      setAuthError(result.error || 'Failed to create admin account.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmittingAuth(true);

    const result = await loginAdmin(loginForm.email, loginForm.password);
    setIsSubmittingAuth(false);

    if (result.success && result.session) {
      setSession(result.session);
      loadBookings();
      loadDbStatus();
    } else {
      setAuthError(result.error || 'Invalid credentials.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setSession(null);
    checkAuthAndSlot();
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    // 1. Optimistic UI update
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    // 2. Persist to Supabase if it's a Supabase record
    await updateAppointmentStatusInSupabase(bookingId, newStatus);

    // 3. Update localStorage cache if present
    try {
      const raw = localStorage.getItem('inst_1981_inquiries');
      if (raw) {
        const parsed = JSON.parse(raw);
        const updated = parsed.map((item: any) =>
          item.id === bookingId || `local-${item.timestamp}` === bookingId
            ? { ...item, status: newStatus }
            : item
        );
        localStorage.setItem('inst_1981_inquiries', JSON.stringify(updated));
      }
    } catch {
      // ignore
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking record?')) return;

    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    await deleteAppointmentFromSupabase(bookingId);

    try {
      const raw = localStorage.getItem('inst_1981_inquiries');
      if (raw) {
        const parsed = JSON.parse(raw);
        const filtered = parsed.filter(
          (item: any) => item.id !== bookingId && `local-${item.timestamp}` !== bookingId
        );
        localStorage.setItem('inst_1981_inquiries', JSON.stringify(filtered));
      }
    } catch {
      // ignore
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      organizationName: settingsForm.organizationName,
      foundedYear: Number(settingsForm.foundedYear),
      heritageTagline: settingsForm.heritageTagline,
      phoneDisplay: settingsForm.phoneDisplay,
      phoneNumber: settingsForm.phoneNumber,
      whatsappDisplayNumber: settingsForm.whatsappDisplayNumber,
      whatsappNumber: settingsForm.whatsappNumber.replace(/[^0-9]/g, ''),
      email: settingsForm.email,
      inPersonClinicAddress: settingsForm.inPersonClinicAddress,
      hoursOfOperation: settingsForm.hoursOfOperation,
      standardInitialFeePkr: Number(settingsForm.standardInitialFeePkr),
      standardFollowUpFeePkr: Number(settingsForm.standardFollowUpFeePkr),
      standardOverseasFeeUsd: Number(settingsForm.standardOverseasFeeUsd),
      ghlWebhookUrl: settingsForm.ghlWebhookUrl,
    });
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 2200);
  };

  const executeResetSettings = () => {
    resetSettings();
    setShowResetConfirm(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // Filter Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        searchQuery === '' ||
        b.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone.includes(searchQuery) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.selected_plan && b.selected_plan.toLowerCase().includes(searchQuery.toLowerCase())) ||
        b.reason_for_contact.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || (b.status || 'new').toLowerCase() === statusFilter.toLowerCase();

      const matchesFormat =
        formatFilter === 'all' ||
        b.preferred_appointment_type.toLowerCase().includes(formatFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesFormat;
    });
  }, [bookings, searchQuery, statusFilter, formatFilter]);

  // Financial Pipeline Calculation
  const pipelineMetrics = useMemo(() => {
    let totalEstimatedValue = 0;
    let newInquiriesCount = 0;
    let confirmedCount = 0;

    for (const b of bookings) {
      if ((b.status || 'new') === 'new') newInquiriesCount++;
      if (b.status === 'confirmed' || b.status === 'completed') confirmedCount++;

      const planText = (b.selected_plan || b.reason_for_contact || '').toLowerCase();
      if (planText.includes('10,000') || planText.includes('5-session')) {
        totalEstimatedValue += 10000;
      } else if (planText.includes('11,000') || planText.includes('monthly text')) {
        totalEstimatedValue += 11000;
      } else if (planText.includes('3,500') || planText.includes('weekly text')) {
        totalEstimatedValue += 3500;
      } else if (planText.includes('2,500') || planText.includes('single session')) {
        totalEstimatedValue += 2500;
      } else {
        totalEstimatedValue += 2500; // baseline consultation
      }
    }

    return {
      totalBookings: bookings.length,
      newInquiriesCount,
      confirmedCount,
      totalEstimatedValue,
    };
  }, [bookings]);

  const handleExportCsv = () => {
    if (bookings.length === 0) return;
    const headers = [
      'ID',
      'Date',
      'Client Name',
      'Phone',
      'Email',
      'Plan / Reason',
      'Session Format',
      'Language',
      'Availability Time',
      'Status',
      'Message',
    ];

    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${new Date(b.created_at).toLocaleString()}"`,
      `"${b.full_name.replace(/"/g, '""')}"`,
      `"${b.phone}"`,
      `"${b.email}"`,
      `"${(b.selected_plan || b.reason_for_contact).replace(/"/g, '""')}"`,
      `"${b.preferred_appointment_type}"`,
      `"${b.preferred_language}"`,
      `"${(b.preferred_date || '').replace(/"/g, '""')}"`,
      `"${b.status || 'new'}"`,
      `"${(b.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `liferesetpakistan-bookings-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (activeModal !== 'admin') return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl border border-[#1C433E]/15 flex flex-col relative text-left cursor-default"
        role="dialog"
        aria-modal="true"
      >
        {/* ========================================================= */}
        {/* TOP BAR / HEADER */}
        {/* ========================================================= */}
        <div className="bg-[#112A27] text-white px-6 py-4.5 border-b border-[#1C433E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/10 shadow-xs">
              <MindRestoreEmblem className="w-full h-full" colorTheme="light" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">
                  Life Reset Pakistan Admin Portal
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D8B878] text-[#112A27]">
                  Internal Management
                </span>
              </div>
              <p className="text-[11px] text-[#A3C2B1]">
                Confidential Clinical Bookings & Practice Administration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {session && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-neutral-200 font-medium">{session.name}</span>
                <span className="text-[11px] text-neutral-400">({session.email})</span>
              </div>
            )}

            {session && (
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                title="Log out of admin session"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Log Out</span>
              </button>
            )}

            <button
              type="button"
              onClick={closeModal}
              className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close admin portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* AUTHENTICATION GATEWAY (LOGIN OR SINGLE-SLOT REGISTRATION) */}
        {/* ========================================================= */}
        {!session ? (
          <div className="p-6 sm:p-12 overflow-y-auto flex items-center justify-center min-h-[460px] bg-[#F8F7F2]">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#1C433E]/15 shadow-md space-y-6">
              {authLoading ? (
                <div className="text-center py-12 space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#286C6A] animate-spin mx-auto" />
                  <p className="text-xs text-[#526363]">Checking administrator credentials...</p>
                </div>
              ) : slotAvailable ? (
                /* ================================================= */
                /* 1. INITIAL ADMIN REGISTRATION (SINGLE SLOT)       */
                /* ================================================= */
                <div className="space-y-5">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Initial Setup · 1 Admin Slot Available</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1C433E]">
                      Create Your Admin Account
                    </h3>
                    <p className="text-xs text-[#526363] leading-relaxed">
                      Please establish your primary administrator credentials. Life Reset Pakistan permits only <strong>1 administrator account</strong>. Once registered, public registration is permanently disabled.
                    </p>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <form onSubmit={handleRegisterAdmin} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Administrator Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                          placeholder="e.g. Lead Clinical Administrator"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#1C433E] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Administrator Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          placeholder="admin@liferesetpakistan.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#1C433E] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Master Password (min 6 characters) *
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#1C433E] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Confirm Master Password *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={signupForm.confirmPassword}
                          onChange={(e) =>
                            setSignupForm({ ...signupForm, confirmPassword: e.target.value })
                          }
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#1C433E] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingAuth}
                      className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-heading font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmittingAuth ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Creating & Locking Slot...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#D8B878]" />
                          <span>Register & Lock Single Admin Account</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* ================================================= */
                /* 2. ADMIN LOGIN (SIGNUPS ARE CLOSED)               */
                /* ================================================= */
                <div className="space-y-5">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-neutral-100 text-[#1C433E] border border-[#1C433E]/15">
                      <Lock className="w-3.5 h-3.5 text-[#286C6A]" />
                      <span>Admin Slot Claimed · Sign-ups Closed</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1C433E]">
                      Administrator Sign In
                    </h3>
                    <p className="text-xs text-[#526363]">
                      Enter your master credentials to access the confidential bookings registry.
                    </p>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Admin Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          placeholder="admin@liferesetpakistan.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#1C433E] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Key className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                        <input
                          type="password"
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#1C433E] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingAuth}
                      className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-heading font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmittingAuth ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-[#D8B878]" />
                          <span>Sign In to Admin Dashboard</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* AUTHENTICATED ADMIN DASHBOARD                             */
          /* ========================================================= */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F7F2]">
            {/* Nav Tabs */}
            <div className="bg-white px-6 pt-3 border-b border-[#286C6A]/15 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2.5 text-xs font-heading font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'border-[#1C433E] text-[#1C433E] bg-[#EAF2ED]'
                      : 'border-transparent text-[#526363] hover:text-[#1C433E] hover:bg-neutral-50'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-[#286C6A]" />
                  <span>Bookings Registry</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#1C433E] text-white">
                    {bookings.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2.5 text-xs font-heading font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'border-[#1C433E] text-[#1C433E] bg-[#EAF2ED]'
                      : 'border-transparent text-[#526363] hover:text-[#1C433E] hover:bg-neutral-50'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-[#286C6A]" />
                  <span>Practice Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('database')}
                  className={`px-4 py-2.5 text-xs font-heading font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'database'
                      ? 'border-[#1C433E] text-[#1C433E] bg-[#EAF2ED]'
                      : 'border-transparent text-[#526363] hover:text-[#1C433E] hover:bg-neutral-50'
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-[#286C6A]" />
                  <span>Supabase Sync</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      dbStatus.tableFound ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </button>
              </div>

              {activeTab === 'bookings' && (
                <div className="flex items-center gap-2 pb-2">
                  <button
                    type="button"
                    onClick={loadBookings}
                    disabled={bookingsLoading}
                    className="p-2 rounded-xl text-[#286C6A] hover:bg-[#EAF2ED] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    title="Reload bookings"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${bookingsLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    disabled={bookings.length === 0}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#286C6A]/20 hover:border-[#286C6A] text-[#1C433E] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D8B878]" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </div>
              )}
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* =================================================== */}
              {/* TAB 1: BOOKINGS & INQUIRIES                         */}
              {/* =================================================== */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8EAD9A] block">
                        Total Inquiries
                      </span>
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1C433E] mt-0.5 block">
                        {pipelineMetrics.totalBookings}
                      </span>
                      <span className="text-[11px] text-[#526363] mt-0.5 block">
                        Lifetime captured
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8EAD9A] block">
                        New / Action Required
                      </span>
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-600 mt-0.5 block">
                        {pipelineMetrics.newInquiriesCount}
                      </span>
                      <span className="text-[11px] text-[#526363] mt-0.5 block">
                        Pending clinical reply
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8EAD9A] block">
                        Confirmed Consultations
                      </span>
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-600 mt-0.5 block">
                        {pipelineMetrics.confirmedCount}
                      </span>
                      <span className="text-[11px] text-[#526363] mt-0.5 block">
                        Scheduled & In progress
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8EAD9A] block">
                        Estimated Pipeline
                      </span>
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1C433E] mt-0.5 block">
                        Rs. {pipelineMetrics.totalEstimatedValue.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[#526363] mt-0.5 block">
                        Based on plan values
                      </span>
                    </div>
                  </div>

                  {bookingsError && (
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                        <div>
                          <p className="font-semibold">Notice regarding Supabase connection:</p>
                          <p className="text-[11px] mt-0.5">{bookingsError}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('database')}
                        className="text-xs font-bold text-amber-900 underline shrink-0 cursor-pointer"
                      >
                        View SQL Setup
                      </button>
                    </div>
                  )}

                  {/* Filter & Search Bar */}
                  <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by client name, phone, email, or plan..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#1C433E] bg-[#F8F7F2]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2] focus:outline-none focus:border-[#1C433E]"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <select
                        value={formatFilter}
                        onChange={(e) => setFormatFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2] focus:outline-none focus:border-[#1C433E]"
                      >
                        <option value="all">All Session Formats</option>
                        <option value="video">Online Video</option>
                        <option value="voice">Voice Consultation</option>
                        <option value="text">WhatsApp Text</option>
                      </select>
                    </div>
                  </div>

                  {/* Bookings List Cards */}
                  {bookingsLoading ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-[#286C6A]/15 space-y-3">
                      <RefreshCw className="w-8 h-8 text-[#286C6A] animate-spin mx-auto" />
                      <p className="text-xs text-[#526363]">Retrieving inquiries from database...</p>
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-[#286C6A]/15 space-y-3">
                      <Calendar className="w-12 h-12 text-[#8EAD9A]/50 mx-auto" />
                      <h4 className="text-base font-heading font-bold text-[#1C433E]">
                        {bookings.length === 0 ? 'No Bookings Recorded Yet' : 'No Bookings Match Your Filter'}
                      </h4>
                      <p className="text-xs text-[#526363] max-w-md mx-auto">
                        {bookings.length === 0
                          ? 'When patients book sessions or inquiry forms on Life Reset Pakistan, their full details will appear here and sync to your Supabase tables.'
                          : 'Try clearing your search query or setting the status filter back to All.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {filteredBookings.map((b) => {
                        const statusKey = (b.status || 'new').toLowerCase();
                        const statusColors: Record<string, string> = {
                          new: 'bg-amber-100 text-amber-900 border-amber-300',
                          contacted: 'bg-blue-100 text-blue-900 border-blue-300',
                          confirmed: 'bg-emerald-100 text-emerald-900 border-emerald-300',
                          completed: 'bg-purple-100 text-purple-900 border-purple-300',
                          cancelled: 'bg-neutral-100 text-neutral-700 border-neutral-300',
                        };

                        const cleanPhone = b.phone.replace(/[^0-9]/g, '');
                        const waText = encodeURIComponent(
                          `Hello ${b.full_name}, this is the Life Reset Pakistan clinical reception team regarding your appointment inquiry for ${b.selected_plan || b.reason_for_contact}. When is a good time to confirm your session?`
                        );
                        const clientWaLink = `https://wa.me/${cleanPhone}?text=${waText}`;

                        return (
                          <div
                            key={b.id}
                            className="bg-white rounded-2xl p-5 border border-[#286C6A]/15 shadow-2xs hover:shadow-sm transition-all space-y-4"
                          >
                            {/* Card Header */}
                            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#286C6A]/10">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-heading font-bold text-base text-[#1C433E]">
                                    {b.full_name}
                                  </h4>
                                  {b.source === 'supabase' ? (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                      <Database className="w-2.5 h-2.5" />
                                      <span>Supabase</span>
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                                      Local Intake
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#526363] flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-[#8EAD9A]" />
                                  <span>Received {new Date(b.created_at).toLocaleString()}</span>
                                </p>
                              </div>

                              {/* Status Dropdown */}
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-medium text-[#526363]">Status:</span>
                                <select
                                  value={statusKey}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-xl text-xs font-bold border capitalize focus:outline-none cursor-pointer ${
                                    statusColors[statusKey] || statusColors.new
                                  }`}
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </div>

                            {/* Card Body Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                              {/* Selected Plan & Reason */}
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EAD9A] block">
                                  Selected Plan / Concern
                                </span>
                                <p className="font-heading font-bold text-[#1C433E]">
                                  {b.selected_plan || b.reason_for_contact}
                                </p>
                                <p className="text-[11px] text-[#526363]">
                                  Format: <span className="font-semibold">{b.preferred_appointment_type}</span>
                                </p>
                              </div>

                              {/* Contact Details */}
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EAD9A] block">
                                  Contact Info
                                </span>
                                <p className="font-medium text-[#243333] flex items-center gap-1.5">
                                  <Phone className="w-3 h-3 text-[#286C6A]" />
                                  <span>{b.phone}</span>
                                </p>
                                <p className="text-[11px] text-[#526363] flex items-center gap-1.5 truncate">
                                  <Mail className="w-3 h-3 text-[#286C6A]" />
                                  <span>{b.email}</span>
                                </p>
                              </div>

                              {/* Preferred Timing & Language */}
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EAD9A] block">
                                  Preferences
                                </span>
                                <p className="text-[#243333]">
                                  Language: <span className="font-semibold">{b.preferred_language}</span>
                                </p>
                                <p className="text-[11px] text-[#526363]">
                                  Timing:{' '}
                                  <span className="font-medium">
                                    {b.preferred_date || 'Flexible'}
                                  </span>
                                </p>
                              </div>
                            </div>

                            {/* Client Message */}
                            {b.message && (
                              <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#286C6A]/10 text-xs text-[#243333]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EAD9A] block mb-0.5">
                                  Client Note:
                                </span>
                                <p className="italic leading-relaxed">"{b.message}"</p>
                              </div>
                            )}

                            {/* Card Footer Quick Actions */}
                            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#286C6A]/10">
                              <div className="flex items-center gap-2">
                                {cleanPhone && (
                                  <a
                                    href={clientWaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#112A27] text-xs font-semibold transition-colors"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                                    <span>WhatsApp Client</span>
                                  </a>
                                )}

                                {b.phone && (
                                  <a
                                    href={`tel:${b.phone}`}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[#243333] text-xs font-medium transition-colors"
                                  >
                                    <Phone className="w-3 h-3" />
                                    <span>Call</span>
                                  </a>
                                )}

                                {b.email && (
                                  <a
                                    href={`mailto:${b.email}?subject=Life Reset Pakistan Appointment Inquiry`}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[#243333] text-xs font-medium transition-colors"
                                  >
                                    <Mail className="w-3 h-3" />
                                    <span>Email</span>
                                  </a>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors rounded-lg cursor-pointer"
                                title="Delete booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* =================================================== */}
              {/* TAB 2: PRACTICE SETTINGS                            */}
              {/* =================================================== */}
              {activeTab === 'settings' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#286C6A]/15 shadow-2xs space-y-6 max-w-3xl mx-auto">
                  <div className="border-b border-[#286C6A]/10 pb-4">
                    <h3 className="text-lg font-heading font-bold text-[#1C433E]">
                      Practice Configuration
                    </h3>
                    <p className="text-xs text-[#526363]">
                      Update clinic contact numbers, address, and consultation fees displayed across the site.
                    </p>
                  </div>

                  {savedSettingsNotice && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Settings saved successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.organizationName}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, organizationName: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Founded Year
                        </label>
                        <input
                          type="number"
                          value={settingsForm.foundedYear}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, foundedYear: Number(e.target.value) })
                          }
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Phone Display Number
                        </label>
                        <input
                          type="text"
                          value={settingsForm.phoneDisplay}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, phoneDisplay: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          WhatsApp Number (Digits only)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.whatsappNumber}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Practice Email
                        </label>
                        <input
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, email: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Clinic / Office Address
                        </label>
                        <input
                          type="text"
                          value={settingsForm.inPersonClinicAddress}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, inPersonClinicAddress: e.target.value })
                          }
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2]"
                        />
                      </div>
                    </div>

                    {/* GoHighLevel Webhook */}
                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        GoHighLevel (GHL) Webhook URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={settingsForm.ghlWebhookUrl}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, ghlWebhookUrl: e.target.value })
                        }
                        placeholder="https://services.leadconnectorhq.com/hooks/..."
                        className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] bg-[#F8F7F2] font-mono"
                      />
                    </div>

                    {showResetConfirm ? (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs flex items-center justify-between">
                        <span className="text-red-700">Reset settings to defaults?</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={executeResetSettings}
                            className="px-2.5 py-1 bg-red-600 text-white font-medium rounded hover:bg-red-700 text-xs cursor-pointer"
                          >
                            Yes, Reset
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowResetConfirm(false)}
                            className="px-2.5 py-1 bg-white border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 text-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-[#286C6A]/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setShowResetConfirm(true)}
                          className="inline-flex items-center gap-1.5 text-xs text-[#b84c4c] hover:underline cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Defaults</span>
                        </button>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-heading font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] rounded-xl shadow-xs cursor-pointer"
                        >
                          <Save className="w-4 h-4 text-[#D8B878]" />
                          <span>Save Settings</span>
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* =================================================== */}
              {/* TAB 3: SUPABASE SYNC & SQL SETUP                   */}
              {/* =================================================== */}
              {activeTab === 'database' && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#286C6A]/15 shadow-2xs space-y-6 max-w-3xl mx-auto">
                  <div className="border-b border-[#286C6A]/10 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-[#1C433E]">
                        Supabase Backend Sync
                      </h3>
                      <p className="text-xs text-[#526363]">
                        Connection diagnostics and table status for project{' '}
                        <strong className="text-[#1C433E]">{SUPABASE_PROJECT_ID}</strong>.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={loadDbStatus}
                      disabled={dbStatus.loading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#286C6A]/20 hover:border-[#286C6A] text-xs font-semibold text-[#1C433E] cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${dbStatus.loading ? 'animate-spin' : ''}`} />
                      <span>Test Connection</span>
                    </button>
                  </div>

                  {/* Status Banner */}
                  <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-[#286C6A]/15 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#526363]">Supabase Project ID:</span>
                      <span className="font-mono font-bold text-[#1C433E]">{SUPABASE_PROJECT_ID}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#526363]">Project URL:</span>
                      <span className="font-mono text-[#1C433E] text-[11px] truncate max-w-xs">{SUPABASE_URL}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-[#286C6A]/10">
                      <span className="text-[#526363]">Live Table Status:</span>
                      {dbStatus.loading ? (
                        <span className="text-[#286C6A] font-semibold animate-pulse">Pinging...</span>
                      ) : dbStatus.tableFound ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Active ('{dbStatus.tableName}' table operational)</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>Connected (Requires table creation)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* SQL Setup Instructions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#1C433E]">
                        Supabase SQL Table Schema
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopySql}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[#1C433E] text-white rounded-lg text-xs font-semibold hover:bg-[#122e2a] transition-colors cursor-pointer"
                        >
                          {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D8B878]" />}
                          <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                        </button>
                        <a
                          href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#286C6A] hover:underline"
                        >
                          <span>Open Supabase SQL Editor</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-[#526363] leading-relaxed">
                      To enable PostgreSQL storage in your Supabase backend, open your Supabase SQL Editor, paste this query, and click <strong>Run</strong>.
                    </p>

                    <pre className="p-4 bg-[#112A27] text-emerald-300 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-60 select-all border border-[#1C433E]">
                      {SUPABASE_SQL_SETUP}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
