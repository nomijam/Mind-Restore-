import React from 'react';

interface MindRestoreLogoProps {
  variant?: 'fullImage' | 'horizontal' | 'stacked' | 'iconOnly' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
  lightMode?: boolean; // when rendered on dark backgrounds
}

/**
 * Pure SVG Vector Emblem of the MindSukoon Logo
 * Features the serene profile silhouette with closed peaceful eye,
 * the 3 flourishing sage leaves inside the mind, and the arching crescent halo.
 */
export const MindRestoreEmblem: React.FC<{
  className?: string;
  size?: number | string;
  colorTheme?: 'default' | 'light';
}> = ({
  className = 'w-10 h-10',
  size,
  colorTheme = 'default',
}) => {
  const isLight = colorTheme === 'light';
  const pineGreen = isLight ? '#F8F7F2' : '#1C433E';
  const sageGreen = isLight ? '#A3C2B1' : '#7BA28E';
  const eyeColor = isLight ? '#1C433E' : '#F8F7F2';

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="MindSukoon Emblem"
    >
      {/* Outer Sweeping Crescent Halo */}
      <path
        d="M 108 34 C 88 23 63 28 47 44 C 33 58 29 79 33 99 C 34 104 36 107 38 106 C 40 105 38 98 38 93 C 38 76 46 59 58 48 C 72 35 91 32 108 34 C 111 35 110 33 108 34 Z"
        fill={sageGreen}
      />
      <path
        d="M 112 36 C 88 25 58 32 42 51 C 31 64 28 82 32 98 C 30 83 34 67 44 54 C 58 36 84 27 106 35 C 109 36 112 36 112 36 Z"
        fill={sageGreen}
        opacity="0.95"
      />

      {/* Human Silhouette in deep pine green */}
      {/* Serene brow, nose, lips, chin, neck, arching cranial dome */}
      <path
        d="M 44 56 C 58 36 84 32 104 42 C 116 48 123 60 126 73 C 127 76 126 78 124 79 C 122 80 124 81 125 82 C 127 84 130 86 130 88 C 130 90 126 91 125 92 C 124 93 126 95 126 96 C 126 98 123 99 122 100 C 121 101 123 103 123 104 C 123 108 119 110 116 111 C 110 113 104 115 97 116 C 90 117 76 124 73 127 C 78 120 84 113 90 108 C 96 103 103 98 106 91 C 110 83 107 72 102 65 C 96 57 87 52 77 50 C 65 47 53 49 44 56 Z"
        fill={pineGreen}
      />

      {/* Profile facial contour refined overlay for pristine silhouette definition */}
      <path
        d="M 96 46 C 109 50 118 60 122 73 C 123 77 121 80 121 82 C 124 84 126 86 126 88 C 126 90 122 92 122 93 C 124 94 124 97 123 98 C 121 99 120 100 120 102 C 120 105 116 108 113 110 C 107 113 100 116 93 118 C 88 120 78 126 74 128 C 80 120 87 112 93 106 C 98 101 106 95 109 88 C 112 80 110 70 104 63 C 98 56 89 51 80 49 C 85 47 91 46 96 46 Z"
        fill={pineGreen}
      />

      {/* Peaceful Closed Eye line */}
      <path
        d="M 113 77 C 115 79.5 119 79.5 121 77"
        stroke={eyeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* 3 Botanical Flourishing Healing Leaves inside the mindful dome */}
      {/* Central upright leaf */}
      <path
        d="M 83 95 C 79 81 81 67 89 54 C 98 67 100 81 94 95 C 89 97 86 97 83 95 Z"
        fill={sageGreen}
      />
      {/* Left flourishing leaf */}
      <path
        d="M 80 92 C 67 87 56 77 56 65 C 69 63 81 74 84 88 C 84 90 82 92 80 92 Z"
        fill={sageGreen}
      />
      {/* Right flourishing leaf */}
      <path
        d="M 89 91 C 97 81 108 75 115 76 C 113 89 101 95 91 92 C 90 92 89 91 89 91 Z"
        fill={sageGreen}
      />

      {/* Delicate inner vein accents for organic botanical warmth */}
      <path
        d="M 87 91 Q 87 75 89 60"
        stroke={pineGreen}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
};

export const MindRestoreLogo: React.FC<MindRestoreLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline = true,
  lightMode = false,
}) => {
  const isLight = lightMode;
  const textColor = isLight ? 'text-white' : 'text-[#1C433E]';
  const taglineColor = isLight ? 'text-[#A3C2B1]' : 'text-[#6A947E]';
  const ruleBg = isLight ? 'bg-[#A3C2B1]/60' : 'bg-[#7BA28E]/70';

  // Dimension scaling
  const emblemSizeClass =
    size === 'sm'
      ? 'w-9 h-9'
      : size === 'lg'
      ? 'w-14 h-14'
      : size === 'xl'
      ? 'w-20 h-20'
      : 'w-11 h-11';

  const titleSizeClass =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
      ? 'text-2xl'
      : size === 'xl'
      ? 'text-3xl'
      : 'text-xl sm:text-[22px]';

  const subSizeClass =
    size === 'sm'
      ? 'text-[9px] tracking-[0.2em]'
      : size === 'lg'
      ? 'text-[11px] tracking-[0.22em]'
      : size === 'xl'
      ? 'text-[12px] tracking-[0.24em]'
      : 'text-[9.5px] sm:text-[10.5px] tracking-[0.2em]';

  if (variant === 'iconOnly') {
    return (
      <MindRestoreEmblem
        className={`${emblemSizeClass} ${className}`}
        colorTheme={isLight ? 'light' : 'default'}
      />
    );
  }

  // Stacked Layout (Directly matching the uploaded image presentation)
  if (variant === 'stacked' || variant === 'fullImage') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="relative mb-2 transition-transform duration-300 group-hover:scale-105">
          <MindRestoreEmblem
            className={size === 'xl' ? 'w-28 h-28' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14 sm:w-16 sm:h-16'}
            colorTheme={isLight ? 'light' : 'default'}
          />
        </div>

        <h1
          className={`font-heading font-bold ${textColor} tracking-tight leading-tight ${
            size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-2xl' : 'text-xl sm:text-2xl'
          }`}
          style={{ letterSpacing: '-0.02em' }}
        >
          MindSukoon
        </h1>

        {showTagline && (
          <div className="flex items-center justify-center gap-2.5 mt-1.5 w-full max-w-[220px]">
            <span className={`h-[1px] flex-1 ${ruleBg}`} aria-hidden="true" />
            <span className={`font-semibold uppercase whitespace-nowrap ${taglineColor} ${subSizeClass}`}>
              ESTABLISHED 1981
            </span>
            <span className={`h-[1px] flex-1 ${ruleBg}`} aria-hidden="true" />
          </div>
        )}
      </div>
    );
  }

  // Horizontal Layout (Standard for Header Navigation & Footer Lockup)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="shrink-0 relative transition-transform duration-200 group-hover:scale-105">
        <MindRestoreEmblem
          className={emblemSizeClass}
          colorTheme={isLight ? 'light' : 'default'}
        />
      </div>

      <div className="flex flex-col text-left justify-center">
        <span
          className={`font-heading font-extrabold ${textColor} tracking-tight leading-none ${titleSizeClass}`}
          style={{ letterSpacing: '-0.02em' }}
        >
          MindSukoon
        </span>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`h-[1px] w-3 ${ruleBg} hidden sm:inline-block`} aria-hidden="true" />
            <span className={`font-semibold uppercase tracking-[0.18em] ${taglineColor} ${subSizeClass} leading-none`}>
              ESTABLISHED 1981
            </span>
            <span className={`h-[1px] w-3 ${ruleBg} hidden sm:inline-block`} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MindRestoreLogo;
