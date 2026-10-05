import React from 'react';
import {
  Sparkles,
  Type,
  Image as ImageIcon,
  ShieldAlert,
  Layout,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from 'lucide-react';

export type SidebarTab = 'templates' | 'text' | 'media' | 'branding' | 'layout';

interface StudioSidebarRailProps {
  activeTab: SidebarTab;
  onChangeTab: (tab: SidebarTab) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const StudioSidebarRail: React.FC<StudioSidebarRailProps> = ({
  activeTab,
  onChangeTab,
  isOpen,
  onToggleOpen,
}) => {
  const tabs = [
    { id: 'templates', label: 'Templates', icon: Sparkles, badge: '9 Styles' },
    { id: 'text', label: 'Text & Words', icon: Type, badge: 'Coloring' },
    { id: 'media', label: 'Image & Filter', icon: ImageIcon, badge: 'Photos' },
    { id: 'branding', label: 'Logo & Badge', icon: ShieldAlert, badge: 'Custom' },
    { id: 'layout', label: 'Card Layout', icon: Layout, badge: 'Shapes' },
  ];

  return (
    <div className="w-20 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 justify-between z-20 shrink-0 select-none">
      {/* Top Tabs */}
      <div className="flex flex-col items-center gap-2 w-full px-2">
        {tabs.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                onChangeTab(id as SidebarTab);
                if (!isOpen) onToggleOpen();
              }}
              className={`w-full py-3 px-1 rounded-xl flex flex-col items-center gap-1 transition-all group relative ${
                isActive
                  ? 'bg-slate-800 text-cyan-300 shadow-md border border-slate-700/60'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
              title={label}
            >
              {/* Active vertical pill indicator */}
              {isActive && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-400 rounded-r" />
              )}
              <Icon
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-cyan-400' : 'text-slate-400'
                }`}
              />
              <span className="text-[10px] font-bold text-center leading-tight">
                {label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom toggle arrow */}
      <button
        onClick={onToggleOpen}
        title={isOpen ? 'Collapse panel' : 'Expand panel'}
        className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
};
