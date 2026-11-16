import React from 'react';

export function SunIllustration({ className = "w-32 h-32", animated = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3A8" />
            <stop offset="100%" stopColor="#F5D982" />
          </linearGradient>
          <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient glow */}
        <circle cx="80" cy="80" r="48" fill="#F5D982" opacity="0.35" filter="url(#sunGlow)" />

        {/* Sun rays */}
        <g className={animated ? "animate-spin-slow origin-center" : ""}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="80"
              y1="22"
              x2="80"
              y2="10"
              stroke="#F5D982"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${angle} 80 80)`}
              opacity="0.85"
            />
          ))}
        </g>

        {/* Sun Core */}
        <circle cx="80" cy="80" r="42" fill="url(#sunGrad)" />

        {/* Friendly cute face */}
        <ellipse cx="68" cy="74" rx="4" ry="4.5" fill="#493A59" />
        <ellipse cx="92" cy="74" rx="4" ry="4.5" fill="#493A59" />
        <circle cx="69.5" cy="72.5" r="1.3" fill="#FFFDFB" />
        <circle cx="93.5" cy="72.5" r="1.3" fill="#FFFDFB" />

        {/* Rosy cheeks */}
        <ellipse cx="62" cy="81" rx="4.5" ry="3" fill="#F2D5DF" opacity="0.9" />
        <ellipse cx="98" cy="81" rx="4.5" ry="3" fill="#F2D5DF" opacity="0.9" />

        {/* Calm smile */}
        <path d="M 72 84 Q 80 92 88 84" stroke="#493A59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function PartlyCloudyIllustration({ className = "w-32 h-32", animated = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="sunBehind" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3A8" />
            <stop offset="100%" stopColor="#F5D982" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDFB" />
            <stop offset="100%" stopColor="#EAE2F4" />
          </linearGradient>
        </defs>

        {/* Sun behind */}
        <g className={animated ? "animate-float-slow" : ""}>
          <circle cx="106" cy="58" r="28" fill="url(#sunBehind)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="106"
              y1="22"
              x2="106"
              y2="14"
              stroke="#F5D982"
              strokeWidth="3.5"
              strokeLinecap="round"
              transform={`rotate(${angle} 106 58)`}
              opacity="0.75"
            />
          ))}
        </g>

        {/* Cloud in front */}
        <g className={animated ? "animate-float-medium" : ""}>
          {/* Cloud base shadow */}
          <path
            d="M 44 116 L 118 116 A 18 18 0 0 0 118 80 A 24 24 0 0 0 74 68 A 20 20 0 0 0 44 86 A 18 18 0 0 0 44 116 Z"
            fill="#C8B6E2"
            opacity="0.3"
            transform="translate(2, 4)"
          />
          {/* Cloud body */}
          <path
            d="M 44 116 L 118 116 A 18 18 0 0 0 118 80 A 24 24 0 0 0 74 68 A 20 20 0 0 0 44 86 A 18 18 0 0 0 44 116 Z"
            fill="url(#cloudGrad)"
            stroke="#C8B6E2"
            strokeWidth="2"
          />

          {/* Gentle eyes on cloud */}
          <ellipse cx="72" cy="94" rx="3" ry="3.5" fill="#493A59" />
          <ellipse cx="90" cy="94" rx="3" ry="3.5" fill="#493A59" />
          <path d="M 77 101 Q 81 105 85 101" stroke="#493A59" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Little blush */}
          <ellipse cx="66" cy="98" rx="3.5" ry="2.2" fill="#F2D5DF" />
          <ellipse cx="96" cy="98" rx="3.5" ry="2.2" fill="#F2D5DF" />
        </g>
      </svg>
    </div>
  );
}

export function CloudyIllustration({ className = "w-32 h-32", animated = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="cloudBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EAE2F4" />
            <stop offset="100%" stopColor="#C8B6E2" />
          </linearGradient>
          <linearGradient id="cloudFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDFB" />
            <stop offset="100%" stopColor="#EAE2F4" />
          </linearGradient>
        </defs>

        {/* Back cloud */}
        <g className={animated ? "animate-float-slow" : ""} opacity="0.8">
          <path
            d="M 38 90 L 100 90 A 16 16 0 0 0 100 58 A 22 22 0 0 0 62 48 A 18 18 0 0 0 38 64 A 16 16 0 0 0 38 90 Z"
            fill="url(#cloudBack)"
          />
        </g>

        {/* Front cloud */}
        <g className={animated ? "animate-float-medium" : ""}>
          <path
            d="M 52 124 L 126 124 A 18 18 0 0 0 126 88 A 26 26 0 0 0 80 74 A 22 22 0 0 0 52 94 A 18 18 0 0 0 52 124 Z"
            fill="url(#cloudFront)"
            stroke="#C8B6E2"
            strokeWidth="2.5"
          />

          {/* Sleepy / restful closed eyes */}
          <path d="M 78 102 Q 83 97 88 102" stroke="#493A59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 98 102 Q 103 97 108 102" stroke="#493A59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 90 110 Q 93 113 96 110" stroke="#493A59" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Cheeks */}
          <ellipse cx="73" cy="106" rx="4" ry="2.5" fill="#F2D5DF" />
          <ellipse cx="113" cy="106" rx="4" ry="2.5" fill="#F2D5DF" />
        </g>
      </svg>
    </div>
  );
}

export function RainIllustration({ className = "w-32 h-32", animated = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EAE2F4" />
            <stop offset="100%" stopColor="#A9C6D8" />
          </linearGradient>
        </defs>

        {/* Raindrops */}
        <g className={animated ? "animate-pulse-gentle" : ""}>
          <path d="M 50 112 Q 52 124 50 126 A 4 4 0 0 1 46 122 Z" fill="#A9C6D8" />
          <path d="M 72 120 Q 74 134 72 136 A 4.5 4.5 0 0 1 67 131 Z" fill="#A9C6D8" />
          <path d="M 94 114 Q 96 126 94 128 A 4 4 0 0 1 90 124 Z" fill="#A9C6D8" />
          <path d="M 116 122 Q 118 134 116 136 A 4 4 0 0 1 112 132 Z" fill="#A9C6D8" />
        </g>

        {/* Cloud */}
        <g className={animated ? "animate-float-slow" : ""}>
          <path
            d="M 40 102 L 122 102 A 18 18 0 0 0 122 66 A 26 26 0 0 0 76 52 A 22 22 0 0 0 40 72 A 18 18 0 0 0 40 102 Z"
            fill="url(#rainCloud)"
            stroke="#8FB0C4"
            strokeWidth="2"
          />

          {/* Gentle empathetic face */}
          <path d="M 68 82 Q 74 86 80 82" stroke="#493A59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 92 82 Q 98 86 104 82" stroke="#493A59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="86" cy="91" r="2.5" fill="#493A59" />

          {/* Soft lilac blush */}
          <ellipse cx="62" cy="87" rx="3.5" ry="2.2" fill="#F2D5DF" />
          <ellipse cx="110" cy="87" rx="3.5" ry="2.2" fill="#F2D5DF" />
        </g>
      </svg>
    </div>
  );
}

export function StormIllustration({ className = "w-32 h-32", animated = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="stormGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7E63A8" />
            <stop offset="100%" stopColor="#493A59" />
          </linearGradient>
          <filter id="lightningGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Lightning Bolt */}
        <polygon
          points="82,90 70,116 80,116 74,142 98,110 86,110"
          fill="#F5D982"
          filter="url(#lightningGlow)"
          className={animated ? "animate-pulse" : ""}
        />

        {/* Storm Cloud */}
        <g className={animated ? "animate-float-slow" : ""}>
          <path
            d="M 38 98 L 124 98 A 20 20 0 0 0 124 58 A 28 28 0 0 0 74 44 A 24 24 0 0 0 38 66 A 20 20 0 0 0 38 98 Z"
            fill="url(#stormGrad)"
            stroke="#3C2E4B"
            strokeWidth="2"
          />

          {/* Concerned, supportive expression */}
          <ellipse cx="68" cy="74" rx="4" ry="4" fill="#FFFDFB" />
          <ellipse cx="94" cy="74" rx="4" ry="4" fill="#FFFDFB" />
          <circle cx="70" cy="74" r="2.2" fill="#493A59" />
          <circle cx="96" cy="74" r="2.2" fill="#493A59" />

          {/* Small gentle mouth */}
          <ellipse cx="82" cy="85" rx="3.5" ry="4" fill="#FFFDFB" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

export function WindIllustration({ className = "w-32 h-32", animated = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="windCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDFB" />
            <stop offset="100%" stopColor="#F2D5DF" />
          </linearGradient>
        </defs>

        {/* Swirling Wind Lines */}
        <g className={animated ? "animate-pulse-gentle" : ""}>
          <path
            d="M 22 55 Q 85 55 105 45 A 12 12 0 1 0 96 32"
            fill="none"
            stroke="#C8B6E2"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 35 125 Q 95 125 118 112 A 14 14 0 1 0 106 96"
            fill="none"
            stroke="#A9C6D8"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 16 88 Q 60 88 80 82 A 9 9 0 1 0 74 72"
            fill="none"
            stroke="#F5D982"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Little flying leaf */}
        <g transform="translate(118, 62) rotate(25)">
          <path
            d="M 0 0 C 8 -10 18 -6 18 0 C 18 8 8 10 0 0 Z"
            fill="#C8B6E2"
            opacity="0.9"
          />
        </g>

        {/* Cute Wind Cloud Face */}
        <circle cx="68" cy="86" r="28" fill="url(#windCloudGrad)" stroke="#EAE2F4" strokeWidth="2" />
        <ellipse cx="62" cy="82" rx="3" ry="3.5" fill="#493A59" />
        <ellipse cx="78" cy="82" rx="3" ry="3.5" fill="#493A59" />
        {/* Blowing lips */}
        <circle cx="86" cy="90" r="4" fill="#BD6484" />
      </svg>
    </div>
  );
}

export function HeroIllustration({ className = "w-64 h-64 md:w-80 md:h-80" }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-clima-yellow/30 via-clima-lavender/30 to-clima-pink/30 blur-2xl transform scale-110" />

      <svg viewBox="0 0 280 260" className="w-full h-full relative z-10 drop-shadow-xl">
        <defs>
          <linearGradient id="heroSun" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7C2" />
            <stop offset="50%" stopColor="#F5D982" />
            <stop offset="100%" stopColor="#F0C755" />
          </linearGradient>
          <linearGradient id="heroCloud" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDFB" />
            <stop offset="60%" stopColor="#FAF6FF" />
            <stop offset="100%" stopColor="#EAE2F4" />
          </linearGradient>
          <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F2D5DF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F5D982" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C8B6E2" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Soft decorative arc / rainbow in the background */}
        <path
          d="M 50 170 A 95 95 0 0 1 230 170"
          fill="none"
          stroke="url(#rainbowGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="4 8"
          opacity="0.75"
        />

        {/* Floating Stars / Sparkles */}
        <g className="animate-pulse-gentle">
          {/* Star 1 */}
          <path
            d="M 45 60 Q 45 70 35 70 Q 45 70 45 80 Q 45 70 55 70 Q 45 70 45 60 Z"
            fill="#F5D982"
          />
          {/* Star 2 */}
          <path
            d="M 235 95 Q 235 102 228 102 Q 235 102 235 109 Q 235 102 242 102 Q 235 102 235 95 Z"
            fill="#C8B6E2"
          />
          {/* Little heart / raindrop */}
          <circle cx="215" cy="55" r="5" fill="#F2D5DF" />
        </g>

        {/* Glowing Sun */}
        <g className="animate-spin-slow origin-[185px_85px]">
          <circle cx="185" cy="85" r="44" fill="url(#heroSun)" opacity="0.95" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line
              key={i}
              x1="185"
              y1="34"
              x2="185"
              y2="24"
              stroke="#F5D982"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${angle} 185 85)`}
              opacity="0.8"
            />
          ))}
        </g>

        {/* Sun cute face */}
        <ellipse cx="174" cy="80" rx="3.5" ry="4" fill="#493A59" />
        <ellipse cx="196" cy="80" rx="3.5" ry="4" fill="#493A59" />
        <path d="M 180 88 Q 185 94 190 88" stroke="#493A59" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <ellipse cx="168" cy="84" rx="4" ry="2.5" fill="#F2D5DF" />
        <ellipse cx="202" cy="84" rx="4" ry="2.5" fill="#F2D5DF" />

        {/* Main Fluffy Cloud */}
        <g className="animate-float-slow">
          {/* Cloud soft shadow */}
          <path
            d="M 60 190 L 195 190 A 30 30 0 0 0 195 130 A 42 42 0 0 0 120 105 A 36 36 0 0 0 60 138 A 30 30 0 0 0 60 190 Z"
            fill="#C8B6E2"
            opacity="0.3"
            transform="translate(4, 6)"
          />
          {/* Cloud main */}
          <path
            d="M 60 190 L 195 190 A 30 30 0 0 0 195 130 A 42 42 0 0 0 120 105 A 36 36 0 0 0 60 138 A 30 30 0 0 0 60 190 Z"
            fill="url(#heroCloud)"
            stroke="#C8B6E2"
            strokeWidth="3"
          />

          {/* Cloud face */}
          <ellipse cx="112" cy="154" rx="4.5" ry="5.5" fill="#493A59" />
          <ellipse cx="148" cy="154" rx="4.5" ry="5.5" fill="#493A59" />
          <circle cx="114" cy="152" r="1.5" fill="#FFFDFB" />
          <circle cx="150" cy="152" r="1.5" fill="#FFFDFB" />
          <path d="M 124 165 Q 130 173 136 165" stroke="#493A59" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Blushing cheeks */}
          <ellipse cx="102" cy="160" rx="5" ry="3.5" fill="#F2D5DF" />
          <ellipse cx="158" cy="160" rx="5" ry="3.5" fill="#F2D5DF" />
        </g>
      </svg>
    </div>
  );
}

export function getWeatherIllustration(weatherId, props = {}) {
  switch (weatherId) {
    case 'ensolarado':
      return <SunIllustration {...props} />;
    case 'parcialmente-nublado':
      return <PartlyCloudyIllustration {...props} />;
    case 'nublado':
      return <CloudyIllustration {...props} />;
    case 'chuvoso':
      return <RainIllustration {...props} />;
    case 'tempestade':
      return <StormIllustration {...props} />;
    case 'ventania':
      return <WindIllustration {...props} />;
    default:
      return <SunIllustration {...props} />;
  }
}
