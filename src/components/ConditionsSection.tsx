import React from 'react';
import {
  Activity,
  CloudRain,
  Flame,
  ShieldAlert,
  Repeat,
  HeartHandshake,
  Users,
  Moon,
  Zap,
  Sparkles,
  BedDouble,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { CONDITIONS } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const ConditionsSection: React.FC = () => {
  const { openConditionDetail, openAppointment } = usePractice();

  const getConditionIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-[#286C6A]' };
    switch (iconName) {
      case 'Activity':
        return <Activity {...props} />;
      case 'CloudRain':
        return <CloudRain {...props} />;
      case 'Flame':
        return <Flame {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'Repeat':
        return <Repeat {...props} />;
      case 'HeartHandshake':
        return <HeartHandshake {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'Moon':
        return <Moon {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'BedDouble':
        return <BedDouble {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      default:
        return <Activity {...props} />;
    }
  };

  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10" id="conditions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Clinical Focus Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Support For What You're Going Through
          </h2>
          <p className="text-base text-[#526363] max-w-[680px] mx-auto font-normal">
            Whether your concern has been building for years or emerged recently, our clinicians provide structured, compassionate guidance.
          </p>
        </div>

        {/* 12 Condition Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
          {CONDITIONS.map((cond) => (
            <div
              key={cond.id}
              className="bg-white rounded-2xl p-6 border border-[#286C6A]/10 shadow-xs hover:border-[#286C6A]/40 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
            >
              <div
                onClick={() => openConditionDetail(cond.id)}
                className="cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EAF2ED] flex items-center justify-center mb-4 group-hover:bg-[#d8e6dc] transition-colors">
                  {getConditionIcon(cond.iconName)}
                </div>

                <h3 className="text-lg font-heading font-bold text-[#243333] group-hover:text-[#286C6A] transition-colors mb-2">
                  {cond.title}
                </h3>

                {/* 2-line explanation */}
                <p className="text-xs text-[#526363] leading-[1.65] font-normal line-clamp-3 mb-4">
                  {cond.twoLineExplanation}
                </p>
              </div>

              <div className="pt-3 border-t border-[#286C6A]/10 flex items-center justify-between">
                <button
                  onClick={() => openConditionDetail(cond.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#286C6A] hover:text-[#1f5654] transition-colors"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => openAppointment(cond.title)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#286C6A] bg-[#EAF2ED] hover:bg-[#286C6A] hover:text-white rounded-md transition-colors"
                >
                  Book Consult
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
