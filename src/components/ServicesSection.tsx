import React from 'react';
import {
  User,
  HeartHandshake,
  Home,
  Sparkles,
  ShieldAlert,
  Flame,
  ClipboardList,
  Zap,
  Monitor,
  Building,
  ArrowRight,
} from 'lucide-react';
import { SERVICES } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const ServicesSection: React.FC = () => {
  const { openServiceDetail, openAppointment } = usePractice();

  const getServiceIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-[#286C6A]' };
    switch (name) {
      case 'User':
        return <User {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Home':
        return <Home {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'Flame':
        return <Flame {...props} />;
      case 'ClipboardList':
        return <ClipboardList {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Monitor':
        return <Monitor {...props} />;
      case 'Building':
        return <Building {...props} />;
      default:
        return <User {...props} />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-[#286C6A]/10" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
              Clinical Psychology & Psychotherapy
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-base text-[#526363] font-normal">
              Structured psychological care tailored to individuals, couples and families across all stages of life.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => openAppointment()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#286C6A] hover:bg-[#1f5654] rounded-lg shadow-xs transition-all"
            >
              <span>REQUEST APPOINTMENT</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D8B878]" />
            </button>
          </div>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {SERVICES.map((srv, index) => (
            <div
              key={srv.id}
              className="bg-[#F8F7F2] rounded-2xl p-7 border border-[#286C6A]/10 hover:border-[#286C6A]/40 hover:bg-white shadow-xs transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#286C6A]/10 flex items-center justify-center group-hover:bg-[#EAF2ED] transition-colors">
                    {getServiceIcon(srv.iconName)}
                  </div>
                  <span className="text-xs font-heading text-[#8EAD9A] font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-bold text-[#243333] group-hover:text-[#286C6A] transition-colors mb-2">
                  {srv.title}
                </h3>

                <p className="text-xs text-[#526363] leading-[1.68] mb-5 font-normal">
                  {srv.shortDescription}
                </p>

                {/* Modalities Preview */}
                <div className="pt-3 border-t border-[#286C6A]/10 text-[11px] text-[#526363] mb-4">
                  <span className="font-semibold text-[#243333]">Approaches: </span>
                  <span>{srv.approaches.join(' · ')}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#286C6A]/10 flex items-center justify-between">
                <button
                  onClick={() => openServiceDetail(srv.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#286C6A] hover:text-[#1f5654] transition-colors"
                >
                  <span>Learn more about this service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => openAppointment(srv.title)}
                  className="text-xs font-medium text-[#526363] hover:text-[#286C6A]"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
