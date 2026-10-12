import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Check, Database, Copy, ExternalLink, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { SUPABASE_PROJECT_ID, SUPABASE_URL, checkSupabaseStatus, SUPABASE_SQL_SETUP } from '../lib/supabase';

export const AdminDrawer: React.FC = () => {
  const { activeModal, closeModal, settings, updateSettings, resetSettings } = usePractice();

  const [form, setForm] = useState({
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

  const [savedNotice, setSavedNotice] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    loading: boolean;
    tested: boolean;
    connected: boolean;
    tableFound: boolean;
    tableName?: string;
    error?: string;
  }>({
    loading: false,
    tested: false,
    connected: true,
    tableFound: false,
  });
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSql, setShowSql] = useState(false);

  useEffect(() => {
    if (activeModal === 'admin') {
      checkSupabase();
    }
  }, [activeModal]);

  const checkSupabase = async () => {
    setSupabaseStatus((s) => ({ ...s, loading: true }));
    const result = await checkSupabaseStatus();
    setSupabaseStatus({
      loading: false,
      tested: true,
      connected: result.connected,
      tableFound: result.tableFound,
      tableName: result.tableName,
      error: result.error,
    });
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  if (activeModal !== 'admin') return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      organizationName: form.organizationName,
      foundedYear: Number(form.foundedYear),
      heritageTagline: form.heritageTagline,
      phoneDisplay: form.phoneDisplay,
      phoneNumber: form.phoneNumber,
      whatsappDisplayNumber: form.whatsappDisplayNumber,
      whatsappNumber: form.whatsappNumber.replace(/[^0-9]/g, ''),
      email: form.email,
      inPersonClinicAddress: form.inPersonClinicAddress,
      hoursOfOperation: form.hoursOfOperation,
      standardInitialFeePkr: Number(form.standardInitialFeePkr),
      standardFollowUpFeePkr: Number(form.standardFollowUpFeePkr),
      standardOverseasFeeUsd: Number(form.standardOverseasFeeUsd),
      ghlWebhookUrl: form.ghlWebhookUrl,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2200);
  };

  const executeReset = () => {
    resetSettings();
    setShowResetConfirm(false);
    closeModal();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#286C6A]/15 relative text-left cursor-default"
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#286C6A]/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#286C6A]">
              Institutional Configuration
            </span>
            <h2 className="text-lg font-heading font-bold text-[#243333]">
              Practice Settings & GoHighLevel Integration
            </h2>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-neutral-100 active:bg-neutral-200 text-[#243333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1C433E] cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6">
          {savedNotice && (
            <div className="p-3 bg-[#EAF2ED] text-[#286C6A] rounded-xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              Settings updated successfully and persisted!
            </div>
          )}

          {/* Core Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#526363]">
              Organization Name & Heritage
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#243333] mb-1">
                  Organization Legal / Display Name
                </label>
                <input
                  type="text"
                  value={form.organizationName}
                  onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs text-[#243333]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243333] mb-1">
                  Founded Year
                </label>
                <input
                  type="number"
                  value={form.foundedYear}
                  onChange={(e) => setForm({ ...form, foundedYear: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs text-[#243333]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#243333] mb-1">
                Heritage Tagline
              </label>
              <input
                type="text"
                value={form.heritageTagline}
                onChange={(e) => setForm({ ...form, heritageTagline: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs text-[#243333]"
                required
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="pt-4 border-t border-[#286C6A]/10 space-y-4">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#526363]">
              Contact Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#243333] mb-1">
                  Phone Display Number
                </label>
                <input
                  type="text"
                  value={form.phoneDisplay}
                  onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs text-[#243333]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243333] mb-1">
                  WhatsApp Contact Number (Digits only)
                </label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs text-[#243333]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#243333] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs text-[#243333]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243333] mb-1">
                  Registered Clinic / Office Address
                </label>
                <input
                  type="text"
                  value={form.inPersonClinicAddress}
                  onChange={(e) => setForm({ ...form, inPersonClinicAddress: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs text-[#243333]"
                />
              </div>
            </div>
          </div>

          {/* Supabase Backend Integration */}
          <div className="pt-4 border-t border-[#286C6A]/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#286C6A]" />
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#1C433E]">
                  Supabase Backend Storage
                </h3>
              </div>
              <button
                type="button"
                onClick={checkSupabase}
                disabled={supabaseStatus.loading}
                className="text-[11px] text-[#286C6A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${supabaseStatus.loading ? 'animate-spin' : ''}`} />
                <span>Test Connection</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#286C6A]/15 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#526363]">Project ID:</span>
                <span className="font-mono font-bold text-[#1C433E]">{SUPABASE_PROJECT_ID}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#526363]">Endpoint:</span>
                <span className="font-mono text-[11px] text-[#526363] truncate max-w-[240px]">{SUPABASE_URL}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#286C6A]/10">
                <span className="text-[#526363]">Status:</span>
                {supabaseStatus.loading ? (
                  <span className="text-[#286C6A] font-medium animate-pulse">Checking status...</span>
                ) : supabaseStatus.tableFound ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Table '{supabaseStatus.tableName}' Active</span>
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Connected (Needs Table SQL)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Table Setup Guidance */}
            {!supabaseStatus.tableFound && (
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="leading-relaxed">
                  Your Supabase project is connected! To begin storing bookings in Supabase, run the one-click SQL schema in your Supabase SQL Editor.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-700 text-white rounded-lg text-xs font-semibold hover:bg-amber-800 transition-colors cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSql(!showSql)}
                    className="text-xs text-amber-800 underline hover:text-amber-950 cursor-pointer"
                  >
                    {showSql ? 'Hide SQL' : 'View SQL'}
                  </button>
                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1 text-[11px] text-amber-800 hover:underline"
                  >
                    <span>Open SQL Editor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                {showSql && (
                  <pre className="p-2.5 bg-black/90 text-emerald-300 rounded-lg text-[10.5px] font-mono overflow-x-auto max-h-48 select-all">
                    {SUPABASE_SQL_SETUP}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* GoHighLevel Endpoint */}
          <div className="pt-4 border-t border-[#286C6A]/10 space-y-2">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#526363]">
              GoHighLevel (GHL) Webhook Endpoint
            </h3>
            <p className="text-[11px] text-[#526363]">
              Appointments automatically generate standard GHL pipeline triggers and tags.
            </p>
            <input
              type="url"
              value={form.ghlWebhookUrl}
              onChange={(e) => setForm({ ...form, ghlWebhookUrl: e.target.value })}
              placeholder="https://services.leadconnectorhq.com/hooks/..."
              className="w-full p-2.5 rounded-lg border border-[#286C6A]/20 text-xs font-mono text-[#243333]"
            />
          </div>

          {showResetConfirm ? (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs flex items-center justify-between">
              <span className="text-red-700">Reset all practice settings to 1981 defaults?</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={executeReset}
                  className="px-2.5 py-1 bg-red-600 text-white font-medium rounded hover:bg-red-700 text-xs"
                >
                  Yes, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2.5 py-1 bg-white border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 text-xs"
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
                className="inline-flex items-center gap-1.5 text-xs text-[#b84c4c] hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs"
              >
                <Save className="w-4 h-4 text-[#D8B878]" />
                Save Configuration
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
