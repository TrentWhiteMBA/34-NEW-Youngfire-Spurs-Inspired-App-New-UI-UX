import React, { useState } from 'react';
import { 
  Flame, 
  BookOpen, 
  Compass, 
  Tv, 
  Radio, 
  PenTool, 
  Heart, 
  Settings, 
  ShieldAlert, 
  Sparkles,
  Users,
  X,
  Trash2,
  LogOut,
  MessageSquare,
  Sun
} from 'lucide-react';
import { CurrentUser } from './SettingsHUDModal';
import { AppTheme } from '../data/appThemes';

interface SlidingNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, subView?: any) => void;
  onOpenSettingsModal: () => void;
  onOpenNotesModal: () => void;
  onOpenThemeModal: () => void;
  onOpenWelcomeModal: () => void;
  onDeleteProfile?: () => void;
  onToggleRadio?: () => void;
  isRadioPlaying?: boolean;
  currentStationName?: string;
  onNextStation?: () => void;
  onPrevStation?: () => void;
  onToggleMusicDock?: () => void;
  isMusicDockOpen?: boolean;
  onOpenZoomFlyer?: () => void;
  activeTheme?: AppTheme;
  currentUser?: CurrentUser | null;
}

export const SlidingNavDrawer: React.FC<SlidingNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSettingsModal,
  onOpenNotesModal,
  onOpenWelcomeModal,
  onDeleteProfile,
  activeTheme,
  currentUser
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen) return null;

  const accentColor = activeTheme?.accentHex || '#F59E0B';

  const isLeader = Boolean(
    currentUser?.isAdmin ||
    currentUser?.role?.toLowerCase().includes('facilitator') ||
    currentUser?.email?.toLowerCase().includes('trent') ||
    currentUser?.email?.toLowerCase().includes('whitney')
  );

  const executeProfileDeletion = () => {
    try {
      localStorage.removeItem('youngfire_device_session_v1');
      localStorage.removeItem('youngfire_user_session');
      localStorage.removeItem('youngfire_sword_streak_v1');
      localStorage.removeItem('youngfire_completed_bible_books');

      const rosterSaved = localStorage.getItem('youngfire_member_roster_v2');
      if (rosterSaved && currentUser?.id) {
        const roster = JSON.parse(rosterSaved);
        if (Array.isArray(roster)) {
          const filtered = roster.filter((m: any) => m.id !== currentUser.id && m.email !== currentUser.email);
          localStorage.setItem('youngfire_member_roster_v2', JSON.stringify(filtered));
        }
      }
      if (currentUser?.id) {
        fetch(`/api/roster/${currentUser.id}`, { method: 'DELETE' }).catch(() => {});
        window.dispatchEvent(new CustomEvent('yf_delete_member', { detail: { id: currentUser.id } }));
      }
    } catch {}

    setShowDeleteConfirm(false);
    onClose();

    if (onDeleteProfile) {
      onDeleteProfile();
    } else {
      window.dispatchEvent(new CustomEvent('yf_account_deleted'));
    }
  };

  // 10 Left-Aligned Menu Actions explicitly specified by user
  const menuActions = [
    {
      id: 'fellowship',
      label: 'Sanctuary Fellowship Hub',
      icon: Users,
      action: () => { onNavigate('fellowship'); onClose(); }
    },
    {
      id: 'men',
      label: 'Men On Fire Brotherhood Hub',
      icon: Flame,
      action: () => { onNavigate('men'); onClose(); }
    },
    {
      id: 'women',
      label: 'Women Ignited Sisterhood Hub',
      icon: Sparkles,
      action: () => { onNavigate('women'); onClose(); }
    },
    {
      id: 'discipleship',
      label: 'Discipleship & Reading Plans',
      icon: Compass,
      action: () => { onNavigate('discipleship'); onClose(); }
    },
    {
      id: 'dailybread',
      label: '365-Day Daily Bread Hub',
      icon: Sun,
      action: () => { onNavigate('dailybread'); onClose(); }
    },
    {
      id: 'mentor',
      label: 'AI Discipleship Mentor',
      icon: MessageSquare,
      action: () => { onNavigate('mentor'); onClose(); }
    },
    {
      id: 'word-bible',
      label: '66-Book Scripture Reader',
      icon: BookOpen,
      action: () => { onNavigate('word', 'bible'); onClose(); }
    },
    {
      id: 'word-atlas',
      label: 'Imperial Scripture Atlas',
      icon: Compass,
      action: () => { onNavigate('word', 'atlas'); onClose(); }
    },
    {
      id: 'tv',
      label: 'Worship Sanctuary TV & Vault',
      icon: Tv,
      action: () => { onNavigate('tv'); onClose(); }
    },
    {
      id: 'radio',
      label: '24/7 Gospel Radio Player',
      icon: Radio,
      action: () => { onNavigate('radio'); onClose(); }
    },
    {
      id: 'prayer',
      label: 'Prayer Dock & Intercession',
      icon: Heart,
      action: () => { onNavigate('prayer_dock'); onClose(); }
    },
    {
      id: 'notes',
      label: 'Study Notes HUD',
      icon: PenTool,
      action: () => { onOpenNotesModal(); onClose(); }
    },
    {
      id: 'welcome',
      label: 'Welcome Sanctuary Portal',
      icon: Sparkles,
      action: () => { onOpenWelcomeModal(); onClose(); }
    },
    {
      id: 'settings',
      label: 'Settings & Device Profile',
      icon: Settings,
      action: () => { onOpenSettingsModal(); onClose(); }
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-10 bg-[#000000] text-white flex select-none overflow-hidden font-['Outfit']"
    >
      {/* 4. Bottom-Right Artwork: Authentic Fellowship Prayer Circle Huddle Photo fading into pure black */}
      <div className="absolute -bottom-4 -right-4 w-96 sm:w-[500px] h-96 sm:h-[500px] pointer-events-none z-0 overflow-hidden opacity-30 select-none">
        <img
          src="/IMG_3519.jpg"
          alt="YoungFire Fellowship Prayer Circle"
          className="w-full h-full object-cover filter grayscale contrast-175 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#000000]/80 to-[#000000]" />
      </div>

      {/* Ambient Flame Glow behind drawer */}
      <div 
        className="absolute top-1/3 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none z-0 opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      {/* 1. Navigation links taking up 75-80% of the screen */}
      <div 
        className="w-[78%] sm:w-[76%] md:w-[75%] max-w-lg ml-auto h-full flex flex-col justify-between py-6 px-5 sm:px-8 relative z-10 overflow-y-auto no-scrollbar"
      >
        {/* Top Section: 2. Centered Brand Header */}
        <div className="flex flex-col items-center justify-center text-center pb-4 border-b border-white/10 relative z-20 space-y-2">
          
          {/* Close button on upper right of menu column */}
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
            title="Close Drawer"
            aria-label="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* YoungFire Holy Flame Icon */}
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border"
            style={{
              backgroundColor: accentColor,
              borderColor: `${accentColor}80`,
              boxShadow: `0 0 20px ${accentColor}50`
            }}
          >
            <Flame className="w-6 h-6 text-black fill-current animate-pulse" />
          </div>

          {/* YOUNGFIRE (condensed font) */}
          <h2 className="text-2xl sm:text-3xl font-['Barlow_Condensed'] font-black tracking-wider uppercase text-white leading-none">
            YOUNG<span style={{ color: accentColor }}>FIRE</span>
          </h2>

          {/* JOSHUA HOUSE OF WORSHIP • EST. 2015 */}
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-amber-400 font-bold">
            JOSHUA HOUSE OF WORSHIP &bull; EST. 2015
          </p>
        </div>

        {/* 3. Left-Aligned Menu Actions */}
        <nav className="space-y-1 my-3 py-1 relative z-20 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-2 pb-1.5">
            Sanctuary Navigation
          </div>

          {menuActions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center gap-3 text-left text-slate-200 hover:text-white group cursor-pointer transition-colors py-2 px-3 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10"
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold tracking-wide font-['Barlow_Condensed',sans-serif] uppercase truncate">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Executive Admin CMS (Trent & Whitney) */}
          {isLeader && (
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('yf_open_admin_cms'));
                onClose();
              }}
              className="w-full flex items-center gap-3 text-left text-amber-300 hover:text-amber-200 group cursor-pointer transition-colors py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 mt-1"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-500/20 text-amber-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider font-['Barlow_Condensed',sans-serif] uppercase truncate">
                Executive Admin CMS (Trent &amp; Whitney)
              </span>
            </button>
          )}
        </nav>

        {/* BOTTOM SECTION: Logout & Delete Profile & Close Link */}
        <div className="pt-3 border-t border-white/10 relative z-20 space-y-2">
          {/* Logout Action Button */}
          <button
            onClick={() => {
              try {
                localStorage.removeItem('youngfire_device_session_v1');
                localStorage.removeItem('youngfire_user_session');
                window.dispatchEvent(new CustomEvent('yf_logout'));
              } catch {}
              onClose();
            }}
            className="w-full py-2.5 px-3 rounded-xl border border-amber-500/40 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-white text-xs font-black font-['Outfit'] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
            title="Log Out of Sanctuary Session"
          >
            <LogOut className="w-4 h-4 stroke-[2.5] text-amber-400 group-hover:scale-110 transition-transform" />
            <span>LOG OUT OF SANCTUARY</span>
          </button>

          {/* Delete My Profile (danger action) */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-2.5 px-3 rounded-xl border border-red-500/40 hover:border-red-500 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 text-xs font-black font-['Outfit'] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
            title="Permanently Delete Consecrated Disciple Profile & Records"
          >
            <Trash2 className="w-4 h-4 stroke-[2.5] text-red-500 group-hover:scale-110 transition-transform" />
            <span>Delete My Profile</span>
          </button>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
            <span>YoungFire Sanctuary &bull; 2026</span>
            <button 
              onClick={onClose}
              className="text-amber-400 hover:underline uppercase tracking-wider cursor-pointer font-bold"
            >
              Return &larr;
            </button>
          </div>
        </div>

        {/* IN-APP DANGER CONFIRMATION MODAL */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-[#0D0406] border-2 border-red-500/60 p-5 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black uppercase text-white font-['Outfit']">Delete Profile?</h3>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  Are you sure you want to delete your profile? All consecrated streaks and device data will be permanently wiped.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeProfileDeletion}
                  className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-red-600/30"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SlidingNavDrawer;
