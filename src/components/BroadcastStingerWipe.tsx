import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Flame, Sparkles } from 'lucide-react';
import { AppTheme } from '../data/appThemes';

interface BroadcastStingerWipeProps {
  show: boolean;
  onComplete: () => void;
  onMidpoint?: () => void;
  durationMs?: number;
  activeTheme?: AppTheme;
  destinationLabel?: string;
}

export const BroadcastStingerWipe: React.FC<BroadcastStingerWipeProps> = ({
  show,
  onComplete,
  onMidpoint,
  durationMs = 4200, // Rock-solid consistent 4.2 seconds
  activeTheme,
  destinationLabel = 'SANCTUARY'
}) => {
  const [phase, setPhase] = useState<'hidden' | 'solid' | 'exit'>('hidden');
  
  // Keep stable callback refs to prevent effect restarting when parent re-renders
  const onCompleteRef = useRef(onComplete);
  const onMidpointRef = useRef(onMidpoint);
  onCompleteRef.current = onComplete;
  onMidpointRef.current = onMidpoint;

  const accentColor = activeTheme?.accentHex || '#F59E0B';
  const secondaryColor = activeTheme?.secondaryHex || '#EF4444';
  const tertiaryColor = activeTheme?.tertiaryHex || '#FF8200';

  useEffect(() => {
    if (!show) {
      setPhase('hidden');
      return;
    }

    // Immediately become solid
    setPhase('solid');

    // 1. Midpoint callback at 2000ms: switches active view underneath without interrupting stinger
    const midTimer = setTimeout(() => {
      if (onMidpointRef.current) {
        onMidpointRef.current();
      }
    }, 2000);

    // 2. Smoothly fade out in the final 350ms of the 4.2s duration
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, durationMs - 350);

    // 3. Complete transition and unmount at exact 4200ms
    const completeTimer = setTimeout(() => {
      setPhase('hidden');
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, durationMs);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [show, durationMs]);

  if (!show && phase === 'hidden') return null;

  const content = (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden transition-opacity duration-300 ease-in-out ${
        phase === 'exit' 
          ? 'opacity-0 pointer-events-none' 
          : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        background: 'radial-gradient(circle at 50% 50%, #0d0a06 0%, #000000 85%)'
      }}
    >
      {/* Dynamic Animated Radiant Theme Glows */}
      <div 
        className="absolute w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none animate-pulse"
        style={{ backgroundColor: `${accentColor}35` }}
      />
      <div 
        className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: `${secondaryColor}30` }}
      />
      <div 
        className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: `${tertiaryColor}30` }}
      />

      {/* Central Emblem & Brand Animation */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        
        {/* Consecrated Flame Medallion */}
        <div 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-black/90 border-2 flex items-center justify-center shadow-2xl relative group transform animate-[bounce_2s_infinite]"
          style={{
            borderColor: accentColor,
            boxShadow: `0 0 50px ${accentColor}60`
          }}
        >
          <div 
            className="absolute inset-0 rounded-3xl opacity-20 animate-ping"
            style={{ backgroundColor: accentColor }}
          />
          <Flame 
            className="w-14 h-14 sm:w-16 sm:h-16 fill-current filter drop-shadow-lg" 
            style={{ color: accentColor }}
          />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black uppercase tracking-[0.28em] text-white font-['Anton',sans-serif] drop-shadow-md">
            YOUNG<span style={{ color: accentColor }}>FIRE</span>
          </span>
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-slate-300 uppercase">
            <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span>TRANSITIONING TO {destinationLabel}</span>
            <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
          </div>
        </div>

        {/* Dynamic 3-Stripe Fiesta / Theme Accent Bar */}
        <div className="w-48 sm:w-64 flex flex-col gap-1 my-2">
          <div className="w-full h-1 rounded-full shadow-sm" style={{ backgroundColor: accentColor }} />
          <div className="w-full h-1 rounded-full shadow-sm" style={{ backgroundColor: secondaryColor }} />
          <div className="w-full h-1 rounded-full shadow-sm" style={{ backgroundColor: tertiaryColor }} />
        </div>

        {/* Subtitle */}
        <p className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">
          Joshua House of Worship &bull; San Antonio, TX
        </p>

        {/* Loading Progress Bar (Consistent 4.2 seconds smooth load without glitches) */}
        <div className="w-44 sm:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden mt-3 p-[1px] border border-white/10">
          <div 
            className="h-full rounded-full"
            style={{
              backgroundColor: accentColor,
              width: '100%',
              animation: `stingerProgress ${durationMs}ms cubic-bezier(0.1, 0.6, 0.2, 1) forwards`
            }}
          />
        </div>

      </div>

      {/* Embedded keyframe for progress bar animation */}
      <style>{`
        @keyframes stingerProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );

  // Render via body portal to ensure 100% isolation from parent CSS transforms
  if (typeof document !== 'undefined' && document.body) {
    return createPortal(content, document.body);
  }

  return content;
};

export default BroadcastStingerWipe;
