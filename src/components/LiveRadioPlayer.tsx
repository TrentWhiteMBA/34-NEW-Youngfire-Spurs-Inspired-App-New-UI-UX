import React from 'react';
import { Radio, ArrowLeft, Play, Pause, Volume2, Sparkles, Flame, Wifi, Activity } from 'lucide-react';
import { GOSPEL_STATIONS, RadioStation } from '../data/radioStations';
import { AppTheme } from '../data/appThemes';

interface LiveRadioPlayerProps {
  onBack?: () => void;
  activeStationId?: string;
  isPlaying?: boolean;
  onSelectStation?: (s: RadioStation) => void;
  onTogglePlay?: () => void;
  volume?: number;
  onVolumeChange?: (vol: number) => void;
  activeTheme?: AppTheme;
  [key: string]: any;
}

export const LiveRadioPlayer: React.FC<LiveRadioPlayerProps> = ({
  onBack,
  activeStationId,
  isPlaying,
  onSelectStation,
  onTogglePlay,
  volume = 1,
  onVolumeChange,
  activeTheme
}) => {
  const accentColor = activeTheme?.accentHex || '#F59E0B';
  const currentStation = GOSPEL_STATIONS.find(s => s.id === activeStationId) || GOSPEL_STATIONS[0];

  const handleMasterPlayClick = () => {
    if (activeStationId !== currentStation.id && onSelectStation) {
      onSelectStation(currentStation);
    } else if (onTogglePlay) {
      onTogglePlay();
    }
  };

  const handleStationClick = (station: RadioStation) => {
    if (station.id === activeStationId) {
      if (onTogglePlay) onTogglePlay();
    } else if (onSelectStation) {
      onSelectStation(station);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 space-y-6 text-white select-none animate-fadeIn font-['Outfit']">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack} 
              className="p-2.5 rounded-xl bg-black/80 hover:bg-white/15 border border-white/15 text-slate-300 hover:text-white cursor-pointer transition-colors shadow-sm"
              title="Return to Sanctuary"
              aria-label="Return to Sanctuary"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-['Outfit'] font-black text-lg sm:text-xl tracking-wider uppercase text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400" />
                <span>24/7 GOSPEL RADIO ECOSYSTEM</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                6 STATIONS LIVE
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Curated Sacred Worship, African Praise, Country, Urban & Holy Hip Hop
            </p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-amber-500/30 text-xs font-mono shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-amber-300 font-bold uppercase tracking-wider text-[10px]">HOLY BROADCAST ACTIVE</span>
        </div>
      </div>

      {/* Featured Current Station Billboard (Pure Obsidian Black & Gold Holy Flame Palette - Zero Blue) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0c0c] via-black to-[#050505] border-2 border-amber-500/50 shadow-[0_16px_50px_rgba(0,0,0,0.95)] relative overflow-hidden group">
        {/* Radiant Holy Flame Glow Accent */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-white/10 relative z-10">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                NOW TUNED &bull; {currentStation.genre}
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {currentStation.badge}
              </span>
            </div>
            <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white tracking-wide truncate">
              {currentStation.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
              {currentStation.tagline || currentStation.description}
            </p>
          </div>

          {/* Master Play/Pause Button */}
          <button
            onClick={handleMasterPlayClick}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center font-black bg-amber-500 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
            title={isPlaying ? "Pause Stream" : "Play Stream"}
            aria-label={isPlaying ? "Pause Stream" : "Play Stream"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>
        </div>

        {/* Volume & Audio Quality Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 text-xs relative z-10">
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <Volume2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange && onVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-white/20"
              aria-label="Volume Slider"
            />
            <span className="font-mono text-amber-400 text-[11px] font-bold w-9 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>320kbps High-Fidelity Audio</span>
            </span>
            <span>&bull;</span>
            <span className="text-amber-300 font-semibold">{currentStation.location}</span>
          </div>
        </div>
      </div>

      {/* 6 Curated Radio Stations Grid (Pure Obsidian Black Cards - Zero Blue) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Gospel Lineup (6 Sacred Streams)</span>
          </span>
          <span className="text-[10px] font-mono text-amber-400 font-semibold">
            Tap card to tune instantly
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GOSPEL_STATIONS.map((station, idx) => {
            const isCurrent = station.id === (activeStationId || currentStation.id);
            return (
              <div
                key={station.id}
                onClick={() => handleStationClick(station)}
                className={`p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-black via-[#0f0c05] to-black border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
                    : 'bg-black/90 border border-white/15 hover:border-amber-400/50 active:border-amber-400 hover:bg-[#111111] shadow-lg'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Station Number Badge */}
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs flex-shrink-0 transition-transform ${
                      isCurrent ? 'bg-amber-500 text-slate-950 font-black scale-105 shadow-md shadow-amber-500/40' : 'bg-black/60 text-slate-400 border border-white/10'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded border ${
                        isCurrent 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}>
                        {station.badge}
                      </span>
                    </div>

                    <h4 className={`font-bold text-xs sm:text-sm truncate font-['Outfit'] mt-0.5 ${
                      isCurrent ? 'text-amber-300 font-black' : 'text-white'
                    }`}>
                      {station.name}
                    </h4>

                    <span className="text-[10px] font-mono text-slate-400 block truncate">
                      {station.genre}
                    </span>
                    <span className="text-[9px] font-serif text-slate-400 block line-clamp-1 italic mt-0.5">
                      {station.tagline}
                    </span>
                  </div>
                </div>

                {/* Status indicator / Live Equalizer Bars / Play state */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isCurrent && isPlaying ? (
                    <div className="flex items-end gap-1 h-5 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                      <span className="w-1 bg-amber-400 h-3 animate-pulse rounded-full" />
                      <span className="w-1 bg-amber-400 h-5 animate-bounce rounded-full" />
                      <span className="w-1 bg-amber-400 h-2 animate-pulse rounded-full" />
                      <span className="w-1 bg-amber-400 h-4 animate-bounce rounded-full" />
                    </div>
                  ) : isCurrent ? (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[9px] font-black uppercase border border-amber-500/40">
                      PAUSED
                    </span>
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-400 flex items-center justify-center transition-all border border-white/10">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default LiveRadioPlayer;
