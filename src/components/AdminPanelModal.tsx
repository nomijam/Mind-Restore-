import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Lock,
  UserCheck,
  ShieldCheck,
  LogOut,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Search,
  RefreshCw,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Database,
  Filter,
  Download,
  AlertCircle,
  Eye,
  KeyRound,
  Sliders,
  Save,
  RotateCcw,
} from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import {
  isAdminSlotAvailable,
  getRegisteredAdminInfo,
  registerAdminAccount,
  loginAdmin,
  getAdminSession,
  logoutAdmin,
  changeAdminPassword,
  AdminSession,
} from '../lib/adminAuth';
import {
  fetchAllAppointments,
  updateAppointmentStatus,
  deleteAppointmentRecord,
  UnifiedAppointmentRecord,
  checkSupabaseStatus,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_SQL_SETUP,
} from '../lib/supabase';
import { MindRestoreEmblem } from './MindRestoreLogo';

export const AdminPanelModal: React.FC = () => {
  const { activeModal, closeModal, settings, updateSettings, resetSettings } = usePractice();

  // Authentication State
  const [session, setSession] = useState<AdminSession | null>(null);
  const [slotAvailable, setSlotAvailable] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings' | 'supabase' | 'security'>('bookings');

  // Login & Registration Forms
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Password Change Form
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [passMessage, setPassMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Bookings Data & Filters
  const [bookings, setBookings] = useState<UnifiedAppointmentRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [supabaseOnline, setSupabaseOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<UnifiedAppointmentRecord | null>(null);

  // Practice Settings Form
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
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Supabase Status State
  const [supabaseTest, setSupabaseTest] = useState<{
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

  // Initial Check on Mount or Modal Open
  useEffect(() => {
    if (activeModal === 'admin') {
      const activeSession = getAdminSession();
      setSession(activeSession);
      const isAvailable = isAdminSlotAvailable();
      setSlotAvailable(isAvailable);
      if (activeSession) {
        loadBookings();
        testSupabase();
      }
    }
  }, [activeModal]);

  // Keep settings form synced
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

  if (activeModal !== 'admin') return null;

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const result = await fetchAllAppointments();
      setBookings(result.records);
      setSupabaseOnline(result.supabaseAvailable);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const testSupabase = async () => {
    setSupabaseTest((prev) => ({ ...prev, loading: true }));
    const res = await checkSupabaseStatus();
    setSupabaseTest({
      loading: false,
      connected: res.connected,
      tableFound: res.tableFound,
      tableName: res.tableName,
      error: res.error,
    });
  };

  // Handle Initial Account Creation (Single Slot)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (authPassword !== confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    setAuthLoading(true);
    const res = await registerAdminAccount(authName, authEmail, authPassword);
    setAuthLoading(false);

    if (res.success) {
      const active = getAdminSession();
      setSession(active);
      setSlotAvailable(false);
      loadBookings();
      testSupabase();
    } else {
      setAuthError(res.error || 'Failed to create admin account.');
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const res = await loginAdmin(authEmail, authPassword);
    setAuthLoading(false);

    if (res.success && res.session) {
      setSession(res.session);
      loadBookings();
      testSupabase();
    } else {
      setAuthError(res.error || 'Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setSession(null);
    setAuthPassword('');
    setSlotAvailable(isAdminSlotAvailable());
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    await updateAppointmentStatus(id, newStatus);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking record?')) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (selectedBooking?.id === id) setSelectedBooking(null);
    await deleteAppointmentRecord(id);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage(null);

    if (newPass !== confirmNewPass) {
      setPassMessage({ text: 'New passwords do not match.', isError: true });
      return;
    }

    const res = await changeAdminPassword(currentPass, newPass);
    if (res.success) {
      setPassMessage({ text: 'Password successfully updated!', isError: false });
      setCurrentPass('');
      setNewPass('');
      setConfirmNewPass('');
    } else {
      setPassMessage({ text: res.error || 'Failed to update password.', isError: true });
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
    setSettingsSavedNotice(true);
    setTimeout(() => setSettingsSavedNotice(false), 2200);
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
      const matchSearch =
        searchQuery === '' ||
        b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone.includes(searchQuery) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.selectedPlan && b.selectedPlan.toLowerCase().includes(searchQuery.toLowerCase())) ||
        b.reasonForContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.message && b.message.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter.toLowerCase();

      const matchPlan =
        planFilter === 'all' ||
        (b.selectedPlan && b.selectedPlan.toLowerCase().includes(planFilter.toLowerCase())) ||
        (b.reasonForContact && b.reasonForContact.toLowerCase().includes(planFilter.toLowerCase()));

      return matchSearch && matchStatus && matchPlan;
    });
  }, [bookings, searchQuery, statusFilter, planFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = bookings.length;
    const newCount = bookings.filter((b) => b.status === 'new').length;
    const contactedCount = bookings.filter((b) => b.status === 'contacted').length;
    const scheduledCount = bookings.filter((b) => b.status === 'scheduled').length;
    const completedCount = bookings.filter((b) => b.status === 'completed').length;
    return { total, newCount, contactedCount, scheduledCount, completedCount };
  }, [bookings]);

  const handleExportCsv = () => {
    if (filteredBookings.length === 0) return;
    const headers = [
      'ID',
      'Date',
      'Name',
      'Phone',
      'Email',
      'Plan',
      'Preferred Format',
      'Language',
      'Contact Method',
      'Preferred Time',
      'Reason',
      'Status',
      'Message',
    ];
    const rows = filteredBookings.map((b) => [
      `"${b.id}"`,
      `"${new Date(b.createdAt).toLocaleString()}"`,
      `"${b.fullName.replace(/"/g, '""')}"`,
      `"${b.phone}"`,
      `"${b.email}"`,
      `"${(b.selectedPlan || b.reasonForContact).replace(/"/g, '""')}"`,
      `"${b.preferredAppointmentType}"`,
      `"${b.preferredLanguage || 'Urdu & English'}"`,
      `"${b.preferredContactMethod}"`,
      `"${(b.preferredDate || '').replace(/"/g, '""')}"`,
      `"${b.reasonForContact.replace(/"/g, '""')}"`,
      `"${b.status}"`,
      `"${(b.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MindSukoon_Bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl border border-[#286C6A]/20 relative text-left cursor-default overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* ======================================================== */}
        {/* MODAL HEADER */}
        {/* ======================================================== */}
        <div className="bg-[#112A27] text-white px-6 py-4 border-b border-[#1C433E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/15">
              <MindRestoreEmblem className="w-full h-full text-white" colorTheme="light" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-heading font-bold tracking-tight text-white">
                  MindSukoon Admin Portal
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#D8B878] text-[#112A27]">
                  Internal Management
                </span>
              </div>
              <p className="text-[11px] text-[#A3C2B1]">
                {session ? `Logged in as: ${session.email}` : 'Secure Administrator Access (1 Slot Restricted)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session && (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              type="button"
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* NOT LOGGED IN: AUTH GATE (SIGN UP 1 SLOT OR LOGIN)       */}
        {/* ======================================================== */}
        {!session ? (
          <div className="p-6 sm:p-12 overflow-y-auto flex-1 flex items-center justify-center bg-[#F8F7F2]">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#286C6A]/20 shadow-xl space-y-6">
              {slotAvailable ? (
                /* Slot 1 of 1: Create Master Admin Account */
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF2ED] text-[#286C6A] mx-auto flex items-center justify-center border border-[#286C6A]/20">
                      <KeyRound className="w-6 h-6 text-[#1C433E]" />
                    </div>
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                      Initial Setup · 1 Slot Available
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-[#1C433E]">
                      Create Master Admin Account
                    </h3>
                    <p className="text-xs text-[#526363] leading-relaxed">
                      You are establishing the single administrator account for MindSukoon. Once created, sign-up will be permanently locked and no one else can register.
                    </p>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Administrator Name
                      </label>
                      <input
                        type="text"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Dr. Farah / Administrator"
                        required
                        className="w-full p-3 rounded-xl border border-[#286C6A]/25 bg-[#F8F7F2] text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Admin Email Address
                      </label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="admin@mindsukoon.pk"
                        required
                        className="w-full p-3 rounded-xl border border-[#286C6A]/25 bg-[#F8F7F2] text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Create Password (min. 6 characters)
                      </label>
                      <input
                        type="password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full p-3 rounded-xl border border-[#286C6A]/25 bg-[#F8F7F2] text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full p-3 rounded-xl border border-[#286C6A]/25 bg-[#F8F7F2] text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-3.5 px-4 rounded-xl text-xs font-heading font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {authLoading ? (
                        <span>Initializing Account...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-[#D8B878]" />
                          <span>CREATE ACCOUNT & CLAIM ADMIN SLOT</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Slot Locked: Existing Admin Login */
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF2ED] text-[#286C6A] mx-auto flex items-center justify-center border border-[#286C6A]/20">
                      <Lock className="w-6 h-6 text-[#1C433E]" />
                    </div>
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Admin Slot Claimed · Signups Locked
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-[#1C433E]">
                      Administrator Login
                    </h3>
                    <p className="text-xs text-[#526363] leading-relaxed">
                      Enter your master administrator credentials to access client bookings and management.
                    </p>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Admin Email Address
                      </label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="admin@mindsukoon.pk"
                        required
                        className="w-full p-3 rounded-xl border border-[#286C6A]/25 bg-[#F8F7F2] text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full p-3 rounded-xl border border-[#286C6A]/25 bg-[#F8F7F2] text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-3.5 px-4 rounded-xl text-xs font-heading font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {authLoading ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#D8B878]" />
                          <span>SIGN IN TO ADMIN PORTAL</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* LOGGED IN: FULL ADMIN DASHBOARD INTERFACE                */
          /* ======================================================== */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F7F2]">
            {/* Top Navigation Tabs */}
            <div className="bg-white border-b border-[#286C6A]/15 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'bookings'
                      ? 'bg-[#1C433E] text-white shadow-xs'
                      : 'text-[#526363] hover:text-[#1C433E] hover:bg-[#EAF2ED]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>All Bookings & Inquiries</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#D8B878] text-[#112A27] font-bold">
                    {bookings.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'settings'
                      ? 'bg-[#1C433E] text-white shadow-xs'
                      : 'text-[#526363] hover:text-[#1C433E] hover:bg-[#EAF2ED]'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Practice Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('supabase')}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'supabase'
                      ? 'bg-[#1C433E] text-white shadow-xs'
                      : 'text-[#526363] hover:text-[#1C433E] hover:bg-[#EAF2ED]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Supabase Backend</span>
                  <span className={`w-2 h-2 rounded-full ${supabaseOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'security'
                      ? 'bg-[#1C433E] text-white shadow-xs'
                      : 'text-[#526363] hover:text-[#1C433E] hover:bg-[#EAF2ED]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Security & Account</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadBookings}
                  disabled={loadingBookings}
                  className="px-3 py-1.5 rounded-xl border border-[#286C6A]/20 bg-white hover:bg-[#EAF2ED] text-xs font-medium text-[#1C433E] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reload Bookings"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingBookings ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                {activeTab === 'bookings' && (
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    disabled={filteredBookings.length === 0}
                    className="px-3 py-1.5 rounded-xl border border-[#286C6A]/20 bg-white hover:bg-[#EAF2ED] text-xs font-medium text-[#1C433E] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                    title="Export Bookings to CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content Body Based on Tab */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* =================================================== */}
              {/* TAB 1: ALL BOOKINGS & INQUIRIES                    */}
              {/* =================================================== */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  {/* Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#526363] block">
                        Total Bookings
                      </span>
                      <span className="text-2xl font-heading font-extrabold text-[#1C433E] block mt-0.5">
                        {stats.total}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                        New Inquiries
                      </span>
                      <span className="text-2xl font-heading font-extrabold text-amber-700 block mt-0.5">
                        {stats.newCount}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                        Contacted
                      </span>
                      <span className="text-2xl font-heading font-extrabold text-blue-700 block mt-0.5">
                        {stats.contactedCount}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                        Scheduled
                      </span>
                      <span className="text-2xl font-heading font-extrabold text-emerald-700 block mt-0.5">
                        {stats.scheduledCount}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                        Completed
                      </span>
                      <span className="text-2xl font-heading font-extrabold text-neutral-700 block mt-0.5">
                        {stats.completedCount}
                      </span>
                    </div>
                  </div>

                  {/* Search & Filters */}
                  <div className="bg-white p-4 rounded-2xl border border-[#286C6A]/15 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
                    <div className="relative w-full md:w-80">
                      <Search className="w-4 h-4 text-[#8EAD9A] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by client name, phone, email, plan..."
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <div className="flex items-center gap-1.5 text-xs text-[#526363]">
                        <Filter className="w-3.5 h-3.5 text-[#286C6A]" />
                        <span>Status:</span>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="p-1.5 rounded-lg border border-[#286C6A]/20 bg-[#F8F7F2] text-xs text-[#243333]"
                        >
                          <option value="all">All Statuses</option>
                          <option value="new">New Inquiry</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#526363]">
                        <span>Plan:</span>
                        <select
                          value={planFilter}
                          onChange={(e) => setPlanFilter(e.target.value)}
                          className="p-1.5 rounded-lg border border-[#286C6A]/20 bg-[#F8F7F2] text-xs text-[#243333]"
                        >
                          <option value="all">All Plans</option>
                          <option value="Single Session">Single Session (Rs. 2,500)</option>
                          <option value="5-Session Package">5-Session Package (Rs. 10,000)</option>
                          <option value="Weekly Text">Weekly Text (Rs. 3,500)</option>
                          <option value="Monthly Text">Monthly Text (Rs. 11,000)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Bookings List */}
                  {loadingBookings ? (
                    <div className="p-12 text-center text-xs text-[#526363] bg-white rounded-2xl border border-[#286C6A]/15">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#286C6A] mx-auto mb-2" />
                      <span>Loading booking inquiries from Supabase...</span>
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="p-12 text-center text-xs text-[#526363] bg-white rounded-2xl border border-[#286C6A]/15 space-y-2">
                      <Calendar className="w-8 h-8 text-[#8EAD9A] mx-auto" />
                      <p className="text-sm font-semibold text-[#243333]">No bookings found</p>
                      <p>
                        {bookings.length === 0
                          ? 'No appointments have been submitted yet. When visitors fill out the booking form or select a counselling plan, their details will appear here automatically.'
                          : 'No bookings match your current search or status filter.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredBookings.map((b) => {
                        const dateFormatted = new Date(b.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        });

                        const cleanPhone = b.phone.replace(/[^0-9]/g, '');
                        const waMsg = encodeURIComponent(
                          `Hello ${b.fullName}, this is the patient care coordinator from MindSukoon regarding your appointment inquiry for ${b.selectedPlan || b.reasonForContact}.`
                        );
                        const waLink = `https://wa.me/${cleanPhone}?text=${waMsg}`;

                        const isNew = b.status === 'new';

                        return (
                          <div
                            key={b.id}
                            className={`p-5 rounded-2xl bg-white border transition-all duration-200 shadow-2xs hover:shadow-sm ${
                              isNew
                                ? 'border-amber-300 ring-1 ring-amber-200'
                                : 'border-[#286C6A]/15 hover:border-[#286C6A]/30'
                            }`}
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              {/* Left: Client Info & Plan */}
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-base font-heading font-bold text-[#1C433E]">
                                    {b.fullName}
                                  </h4>

                                  {/* Plan Badge */}
                                  {(b.selectedPlan || b.reasonForContact.includes('Rs.')) && (
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D8B878]/25 text-[#73571d] border border-[#D8B878]/50">
                                      {b.selectedPlan || b.reasonForContact}
                                    </span>
                                  )}

                                  {/* Format Badge */}
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF2ED] text-[#1C433E]">
                                    {b.preferredAppointmentType}
                                  </span>

                                  {/* Language Badge */}
                                  {b.preferredLanguage && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-[#526363]">
                                      {b.preferredLanguage}
                                    </span>
                                  )}

                                  {/* Source Badge */}
                                  <span className="px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider font-mono text-[#8EAD9A]">
                                    {b.source}
                                  </span>
                                </div>

                                {/* Contact Details */}
                                <div className="flex flex-wrap items-center gap-4 text-xs text-[#526363]">
                                  <span className="flex items-center gap-1 font-medium text-[#243333]">
                                    <Phone className="w-3.5 h-3.5 text-[#286C6A]" />
                                    <span>{b.phone}</span>
                                  </span>

                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3.5 h-3.5 text-[#8EAD9A]" />
                                    <span>{b.email}</span>
                                  </span>

                                  <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                                    <Clock className="w-3 h-3" />
                                    <span>{dateFormatted}</span>
                                  </span>

                                  {b.preferredDate && (
                                    <span className="text-[11px] text-[#286C6A] font-medium">
                                      Pref. Time: {b.preferredDate}
                                    </span>
                                  )}
                                </div>

                                {/* Message / Notes */}
                                {(b.message || b.reasonForContact) && (
                                  <p className="text-xs text-[#526363] bg-[#F8F7F2] p-2.5 rounded-xl border border-[#286C6A]/10 mt-1">
                                    <strong>Concern:</strong> {b.reasonForContact}
                                    {b.message && (
                                      <>
                                        {' '}• <strong>Notes:</strong> {b.message}
                                      </>
                                    )}
                                  </p>
                                )}
                              </div>

                              {/* Right: Status Dropdown & Action Buttons */}
                              <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#286C6A]/10">
                                {/* Status Selector */}
                                <select
                                  value={b.status}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                                    b.status === 'new'
                                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                                      : b.status === 'contacted'
                                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                                      : b.status === 'scheduled'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : b.status === 'completed'
                                      ? 'bg-neutral-100 text-neutral-700 border-neutral-300'
                                      : 'bg-red-50 text-red-700 border-red-200'
                                  }`}
                                >
                                  <option value="new">● New Inquiry</option>
                                  <option value="contacted">● Contacted</option>
                                  <option value="scheduled">● Scheduled</option>
                                  <option value="completed">● Completed</option>
                                  <option value="cancelled">● Cancelled</option>
                                </select>

                                {/* WhatsApp Button */}
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-1.5 shadow-2xs transition-colors"
                                  title="Message Client on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </a>

                                {/* Call Button */}
                                <a
                                  href={`tel:${b.phone}`}
                                  className="p-2 rounded-xl text-xs text-[#286C6A] hover:bg-[#EAF2ED] border border-[#286C6A]/20 transition-colors"
                                  title="Call Client"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>

                                {/* Email Button */}
                                <a
                                  href={`mailto:${b.email}?subject=MindSukoon%20Consultation%20Inquiry`}
                                  className="p-2 rounded-xl text-xs text-[#286C6A] hover:bg-[#EAF2ED] border border-[#286C6A]/20 transition-colors"
                                  title="Email Client"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>

                                {/* Delete Button */}
                                <button
                                  type="button"
                                  onClick={() => handleDelete(b.id)}
                                  className="p-2 rounded-xl text-xs text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
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
                <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#286C6A]/15 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#1C433E]">
                      Practice Configuration
                    </h3>
                    <p className="text-xs text-[#526363] mt-0.5">
                      Configure contact numbers, operational hours, fees, and institutional details.
                    </p>
                  </div>

                  {settingsSavedNotice && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Practice settings successfully updated and saved!</span>
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
                          onChange={(e) => setSettingsForm({ ...settingsForm, organizationName: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Founded Year
                        </label>
                        <input
                          type="number"
                          value={settingsForm.foundedYear}
                          onChange={(e) => setSettingsForm({ ...settingsForm, foundedYear: Number(e.target.value) })}
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Phone Display
                        </label>
                        <input
                          type="text"
                          value={settingsForm.phoneDisplay}
                          onChange={(e) => setSettingsForm({ ...settingsForm, phoneDisplay: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          WhatsApp Number (Clean digits)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.whatsappNumber}
                          onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#243333] mb-1">
                          Standard Single Session (PKR)
                        </label>
                        <input
                          type="number"
                          value={settingsForm.standardInitialFeePkr}
                          onChange={(e) => setSettingsForm({ ...settingsForm, standardInitialFeePkr: Number(e.target.value) })}
                          className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        value={settingsForm.hoursOfOperation}
                        onChange={(e) => setSettingsForm({ ...settingsForm, hoursOfOperation: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        GoHighLevel (GHL) Webhook Endpoint
                      </label>
                      <input
                        type="url"
                        value={settingsForm.ghlWebhookUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, ghlWebhookUrl: e.target.value })}
                        placeholder="https://services.leadconnectorhq.com/hooks/..."
                        className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs font-mono text-[#243333]"
                      />
                    </div>

                    <div className="pt-4 border-t border-[#286C6A]/10 flex items-center justify-between">
                      {showResetConfirm ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-red-600">Confirm reset?</span>
                          <button
                            type="button"
                            onClick={executeResetSettings}
                            className="px-2.5 py-1 bg-red-600 text-white rounded text-xs"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowResetConfirm(false)}
                            className="px-2.5 py-1 border rounded text-xs"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowResetConfirm(true)}
                          className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Defaults</span>
                        </button>
                      )}

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-heading font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-[#D8B878]" />
                        <span>Save Practice Settings</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* =================================================== */}
              {/* TAB 3: SUPABASE BACKEND DIAGNOSTICS                 */}
              {/* =================================================== */}
              {activeTab === 'supabase' && (
                <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#286C6A]/15 shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-[#1C433E]">
                        Supabase Backend Integration
                      </h3>
                      <p className="text-xs text-[#526363] mt-0.5">
                        Connected database details for live appointment storage.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={testSupabase}
                      disabled={supabaseTest.loading}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1C433E] bg-[#EAF2ED] hover:bg-[#286C6A] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${supabaseTest.loading ? 'animate-spin' : ''}`} />
                      <span>Ping Connection</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-[#286C6A]/15 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#526363]">Supabase Project ID:</span>
                      <span className="font-mono font-bold text-[#1C433E]">{SUPABASE_PROJECT_ID}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#526363]">Project URL:</span>
                      <span className="font-mono text-[#1C433E]">{SUPABASE_URL}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#286C6A]/10">
                      <span className="text-[#526363]">Live Connection Status:</span>
                      {supabaseTest.loading ? (
                        <span className="text-[#286C6A] font-medium animate-pulse">Testing ping...</span>
                      ) : supabaseTest.tableFound ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Connected · Table '{supabaseTest.tableName}' Active</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>Connected to Project (Run SQL Schema below)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#243333]">
                        PostgreSQL Schema Script
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopySql}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#1C433E] text-white hover:bg-[#122e2a] flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedSql ? <Check className="w-3.5 h-3.5 text-[#D8B878]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                        </button>
                        <a
                          href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg text-xs font-semibold border border-[#286C6A]/20 text-[#1C433E] hover:bg-[#EAF2ED] flex items-center gap-1"
                        >
                          <span>Open SQL Editor</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <pre className="p-3 bg-[#112A27] text-emerald-300 rounded-xl text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed select-all">
                      {SUPABASE_SQL_SETUP}
                    </pre>
                  </div>
                </div>
              )}

              {/* =================================================== */}
              {/* TAB 4: SECURITY & MASTER ADMIN ACCOUNT              */}
              {/* =================================================== */}
              {activeTab === 'security' && (
                <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#286C6A]/15 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#1C433E]">
                      Administrator Account & Security
                    </h3>
                    <p className="text-xs text-[#526363] mt-0.5">
                      Review single admin slot status or update your administrator password.
                    </p>
                  </div>

                  {/* Slot Status Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-800">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Single Admin Slot Claimed & Locked</span>
                    </div>
                    <p className="leading-relaxed">
                      This MindSukoon deployment has claimed its 1 allowed administrator slot ({session.email}). New public sign-ups are permanently disabled.
                    </p>
                  </div>

                  {/* Change Password Form */}
                  <form onSubmit={handlePasswordChange} className="space-y-4 pt-2">
                    <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#243333]">
                      Change Administrator Password
                    </h4>

                    {passMessage && (
                      <div
                        className={`p-3 text-xs rounded-xl border flex items-center gap-2 ${
                          passMessage.isError
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {passMessage.isError ? (
                          <AlertCircle className="w-4 h-4 shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 shrink-0" />
                        )}
                        <span>{passMessage.text}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        New Password (min. 6 characters)
                      </label>
                      <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#243333] mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmNewPass}
                        onChange={(e) => setConfirmNewPass(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-[#286C6A]/20 text-xs text-[#243333] focus:outline-none focus:border-[#286C6A]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-heading font-bold text-white bg-[#1C433E] hover:bg-[#122e2a] flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <KeyRound className="w-4 h-4 text-[#D8B878]" />
                      <span>Update Password</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanelModal;
