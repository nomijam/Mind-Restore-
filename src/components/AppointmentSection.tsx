import React, { useState, useEffect } from 'react';
import { Check, Calendar, Phone, Mail, Shield, MessageCircle, Clock, ArrowRight, Database } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

interface AppointmentSectionProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ onClose, isModal = false }) => {
  const { prefillReason, prefillSpecialistId, selectedPlan, setSelectedPlan, submitAppointment, getWhatsAppLink, settings } = usePractice();

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp');
  const [preferredLanguage, setPreferredLanguage] = useState<'Urdu' | 'English' | 'Urdu & English'>('Urdu & English');
  const [reasonForContact, setReasonForContact] = useState<string>(selectedPlan || prefillReason || 'General Consultation');
  const [preferredAppointmentType, setPreferredAppointmentType] = useState<'Online Video' | 'Voice Consultation' | 'WhatsApp Text Counselling'>('Online Video');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(true);

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{
    whatsappUrl: string;
    payload: any;
  } | null>(null);

  useEffect(() => {
    if (selectedPlan) {
      setReasonForContact(selectedPlan);
      if (selectedPlan.toLowerCase().includes('text')) {
        setPreferredAppointmentType('WhatsApp Text Counselling');
      }
    } else if (prefillReason) {
      setReasonForContact(prefillReason);
      if (prefillReason.toLowerCase().includes('text')) {
        setPreferredAppointmentType('WhatsApp Text Counselling');
      }
    }
  }, [prefillReason, selectedPlan]);

  const reasonsList = [
    'Single Session (Rs. 2,500)',
    '5-Session Package (Rs. 10,000)',
    'Weekly Text Plan (Rs. 3,500)',
    'Monthly Text Plan (Rs. 11,000)',
    'General Consultation',
    'Anxiety & Worry',
    'Low Mood & Depression',
    'Stress & Burnout',
    'Relationship Difficulties',
    'Family Concerns',
    'Child / Adolescent Support',
    'Trauma & PTSD',
    'Psychological Assessment',
    'Other Concerns',
  ];

  // Ensure current reason is present in options list
  const fullReasonsList = reasonsList.includes(reasonForContact)
    ? reasonsList
    : [reasonForContact, ...reasonsList];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!fullName.trim() || !phone.trim() || !email.trim() || !consent) {
      setFormError('Please fill out all required contact fields and confirm the consent agreement.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = submitAppointment({
        fullName,
        phone,
        email,
        preferredContactMethod,
        preferredLanguage,
        selectedPlan: selectedPlan || (reasonForContact.includes('Rs.') ? reasonForContact : undefined),
        reasonForContact,
        preferredAppointmentType,
        preferredDate,
        message,
        consent,
      });

      setSubmissionResult(res);
      setIsSubmitting(false);
    }, 350);
  };

  return (
    <div className={`w-full ${isModal ? 'p-0' : 'py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10'}`} id="appointments">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#286C6A]/15 shadow-sm text-left">
          {/* Section Header */}
          <div className="mb-8 space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
              Confidential Intake
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#243333]">
              Take the First Step
            </h2>
            <p className="text-sm text-[#526363] leading-[1.65]">
              You don't have to know exactly what you need before contacting us. A member of our clinical intake team will guide you thoughtfully.
            </p>
          </div>

          {/* Submission Success State */}
          {submissionResult ? (
            <div className="text-center py-8 space-y-6 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-[#EAF2ED] text-[#286C6A] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-heading font-bold text-[#243333]">
                  Thank You, {fullName}.
                </h3>
                <p className="text-sm text-[#526363] leading-[1.68]">
                  Your request has been received. A member of our team will contact you regarding the next available appointment via {preferredContactMethod}.
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={submissionResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#D8B878]" />
                  <span>CONTINUE ON WHATSAPP</span>
                </a>

                {onClose ? (
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#243333] bg-[#F8F7F2] hover:bg-neutral-200 rounded-xl transition-colors"
                  >
                    Close Window
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionResult(null);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#243333] bg-[#F8F7F2] hover:bg-neutral-200 rounded-xl transition-colors"
                  >
                    Submit Another Request
                  </button>
                )}
              </div>

              <div className="mt-8 pt-5 border-t border-[#286C6A]/10 text-left text-xs text-[#526363] space-y-1">
                <p className="font-semibold text-[#243333]">Intake Record Verified & Stored:</p>
                <p>Pipeline Status: <span className="font-mono text-[#286C6A]">NEW INQUIRY (EST. 1981)</span></p>
                <p className="text-[11px] text-[#286C6A] flex items-center gap-1.5 pt-0.5">
                  <Database className="w-3.5 h-3.5 text-[#286C6A]" />
                  <span>Synced with Supabase Backend (Project: bvjzskzlwcbycmnmhsqf)</span>
                </p>
              </div>
            </div>
          ) : (
            /* Appointment Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Plan Notification Banner */}
              {selectedPlan && (
                <div className="p-3.5 rounded-2xl bg-[#EAF2ED] border border-[#1C433E]/20 flex items-center justify-between gap-3 text-xs text-[#1C433E]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#286C6A]" />
                    <span className="font-semibold">Selected Plan:</span>
                    <span className="font-bold">{selectedPlan}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlan(null);
                      setReasonForContact('General Consultation');
                    }}
                    className="text-[11px] text-[#526363] hover:text-[#1C433E] underline font-medium cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name or initials"
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    value={preferredContactMethod}
                    onChange={(e) => setPreferredContactMethod(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                  >
                    <option value="WhatsApp">WhatsApp (Discreet & Convenient)</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Counselling Plan / Reason for Contact
                  </label>
                  <select
                    value={reasonForContact}
                    onChange={(e) => {
                      setReasonForContact(e.target.value);
                      if (e.target.value.toLowerCase().includes('text')) {
                        setPreferredAppointmentType('WhatsApp Text Counselling');
                      }
                    }}
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                  >
                    {fullReasonsList.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Preferred Session Format
                  </label>
                  <select
                    value={preferredAppointmentType}
                    onChange={(e) => setPreferredAppointmentType(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                  >
                    <option value="Online Video">Online Video Consultation (Secure HD Tele-Health)</option>
                    <option value="Voice Consultation">Confidential Voice Consultation (Telephone / Audio)</option>
                    <option value="WhatsApp Text Counselling">WhatsApp Text Counselling (Daily Replies 9 AM – 9 PM)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Preferred Language
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                  >
                    <option value="Urdu & English">Urdu & English (Bilingual / Mixed)</option>
                    <option value="Urdu">Urdu (اردو)</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#243333] mb-1">
                    Preferred Appointment Time or Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    placeholder="e.g. Weekdays 6 PM, or Saturdays"
                    className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#243333] mb-1">
                  Brief Message or Notes (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  placeholder="Share any questions or preferences you wish your specialist to know..."
                  className="w-full p-3 rounded-xl border border-[#286C6A]/20 bg-[#F8F7F2] text-sm text-[#243333] focus:outline-none focus:border-[#286C6A]"
                />
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#286C6A] focus:ring-[#286C6A]"
                  required
                />
                <span className="text-xs text-[#526363] leading-[1.6]">
                  By submitting this form, I agree to be contacted regarding my confidential appointment request. I understand this service is strictly an outpatient practice and not an emergency response service.
                </span>
              </label>

              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {formError}
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-wider text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-xl shadow-xs transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Intake...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-[#D8B878]" />
                      <span>REQUEST AN APPOINTMENT</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
