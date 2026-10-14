import React, { useState } from 'react';
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
  Shield,
  Lock,
  User,
  Heart,
  Smile,
  GraduationCap,
  UserCheck,
} from 'lucide-react';
import { CONDITIONS_CARDS } from '../data/conditionsCardsData';
import { usePractice } from '../context/PracticeContext';

export const ConditionsSection: React.FC = () => {
  const { openConditionDetail, openAppointment } = usePractice();
  const [activeTab, setActiveTab] = useState<'all' | 'common-concerns' | 'specialised-care'>('all');

  const getConditionIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-[#1C433E]' };
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
      case 'Shield':
        return <Shield {...props} />;
      case 'Lock':
        return <Lock {...props} />;
      case 'User':
        return <User {...props} />;
      case 'Heart':
        return <Heart {...props} />;
      case 'Smile':
        return <Smile {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      default:
        return <Activity {...props} />;
    }
  };

  const filteredConditions = CONDITIONS_CARDS.filter((c) => {
    if (activeTab === 'all') return true;
    return c.category === activeTab;
  });

  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10" id="conditions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-semibold tracking-wider text-[#1C433E] uppercase bg-[#EAF2ED] px-3 py-1 rounded-full border border-[#1C433E]/15">
            Clinical Focus Areas · 19 Specialized Tracks
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1C433E] tracking-tight">
            Support For What You're Going Through
          </h2>
          <p className="text-base text-[#526363] max-w-[680px] mx-auto font-normal">
            Whether your concern has been building for years or emerged recently, our licensed
            clinical psychologists provide structured, compassionate guidance in a confidential
            space.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#1C433E] text-white shadow-xs'
                  : 'bg-white text-[#526363] hover:text-[#1C433E] border border-[#286C6A]/10'
              }`}
            >
              All Conditions (19)
            </button>
            <button
              onClick={() => setActiveTab('common-concerns')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'common-concerns'
                  ? 'bg-[#1C433E] text-white shadow-xs'
                  : 'bg-white text-[#526363] hover:text-[#1C433E] border border-[#286C6A]/10'
              }`}
            >
              Common Concerns (8)
            </button>
            <button
              onClick={() => setActiveTab('specialised-care')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'specialised-care'
                  ? 'bg-[#1C433E] text-white shadow-xs'
                  : 'bg-white text-[#526363] hover:text-[#1C433E] border border-[#286C6A]/10'
              }`}
            >
              Specialised Care (11)
            </button>
          </div>
        </div>

        {/* Condition Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
          {filteredConditions.map((cond) => (
            <div
              key={cond.id}
              className="bg-white rounded-2xl p-6 border border-[#286C6A]/10 shadow-xs hover:border-[#1C433E]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div
                onClick={() => openConditionDetail(cond.slug || cond.id)}
                className="cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF2ED] flex items-center justify-center group-hover:bg-[#d8e6dc] transition-colors">
                    {getConditionIcon(cond.iconName)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C433E] bg-[#EAF2ED] px-2 py-0.5 rounded-md border border-[#1C433E]/15">
                    {cond.category === 'common-concerns' ? 'Common Concern' : 'Specialised Care'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-bold text-[#1C433E] group-hover:text-[#14322e] transition-colors">
                    {cond.title}
                  </h3>
                  <p className="text-xs text-[#526363] leading-[1.65] font-normal line-clamp-3 mt-1.5">
                    {cond.twoLineExplanation}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-[#286C6A]/10 flex items-center justify-between">
                <button
                  onClick={() => openConditionDetail(cond.slug || cond.id)}
                  aria-label={`Read comprehensive clinical guide on ${cond.title}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C433E] hover:text-[#122e2a] transition-colors group-hover:underline cursor-pointer"
                >
                  <span>READ FULL PAGE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openAppointment(cond.title)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1C433E] bg-[#EAF2ED] hover:bg-[#1C433E] hover:text-white rounded-md transition-colors"
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
