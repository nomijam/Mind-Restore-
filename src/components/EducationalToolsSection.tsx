import React from 'react';
import { Activity, CloudRain, Flame, Scale, Moon, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import { EDUCATIONAL_TOOLS } from '../data/practiceData';
import { usePractice } from '../context/PracticeContext';

export const EducationalToolsSection: React.FC = () => {
  const { openEducationalTool } = usePractice();

  const getToolIcon = (id: string) => {
    const props = { className: 'w-5 h-5 text-[#286C6A]' };
    switch (id) {
      case 'stress-check':
        return <Scale {...props} />;
      case 'anxiety-check':
        return <Activity {...props} />;
      case 'mood-check':
        return <CloudRain {...props} />;
      case 'burnout-check':
        return <Flame {...props} />;
      case 'sleep-check':
        return <Moon {...props} />;
      default:
        return <Activity {...props} />;
    }
  };

  return (
    <section className="py-20 bg-[#F8F7F2] border-b border-[#286C6A]/10" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold tracking-wider text-[#286C6A] uppercase">
            Self-Reflection Resources
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#243333] tracking-tight">
            Understand What You're Feeling
          </h2>
          <p className="text-base text-[#526363] font-normal max-w-[650px] mx-auto">
            These structured educational self-checks offer structured insight into your recent emotional patterns and stress levels.
          </p>

          {/* Mandatory Prominent Educational Disclaimer Banner */}
          <div className="mt-4 p-3.5 bg-white border border-[#D8B878]/60 rounded-xl text-xs text-[#243333] flex items-center justify-center gap-2 max-w-2xl mx-auto shadow-2xs">
            <AlertTriangle className="w-4 h-4 text-[#D8B878] shrink-0" />
            <span>
              <strong>Important Notice:</strong> This tool is for educational or screening purposes only. It is not a diagnosis and should not replace assessment by a qualified professional.
            </span>
          </div>
        </div>

        {/* 5 Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {EDUCATIONAL_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-7 border border-[#286C6A]/10 shadow-xs hover:border-[#286C6A]/40 transition-all flex flex-col justify-between group"
            >
              <div
                onClick={() => openEducationalTool(tool.id)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF2ED] flex items-center justify-center group-hover:bg-[#d8e6dc] transition-colors">
                    {getToolIcon(tool.id)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#526363]">
                    <Clock className="w-3.5 h-3.5 text-[#286C6A]" />
                    <span>~{tool.estimatedMinutes} mins</span>
                  </div>
                </div>

                <h3 className="text-lg font-heading font-bold text-[#243333] group-hover:text-[#286C6A] transition-colors mb-2">
                  {tool.title}
                </h3>

                <p className="text-xs text-[#526363] leading-[1.65] mb-4 font-normal">
                  {tool.subtitle}
                </p>

                <p className="text-[11px] text-[#526363] italic mb-6">
                  {tool.scientificContext}
                </p>
              </div>

              <div className="pt-3 border-t border-[#286C6A]/10 flex items-center justify-between">
                <button
                  onClick={() => openEducationalTool(tool.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#286C6A] hover:text-[#1f5654] transition-colors"
                >
                  <span>Begin Self-Check</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <span className="text-[11px] text-[#526363]">
                  Confidential
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
