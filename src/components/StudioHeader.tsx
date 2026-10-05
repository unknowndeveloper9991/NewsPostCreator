import React from 'react';
import { AspectRatio } from '../types';
import {
  Square,
  Smartphone,
  Tv,
  Download,
  Copy,
  RotateCcw,
  Check,
  Sparkles,
  Bookmark,
} from 'lucide-react';

interface StudioHeaderProps {
  aspectRatio: AspectRatio;
  onSelectAspectRatio: (ratio: AspectRatio) => void;
  onOpenExport: () => void;
  onQuickCopy: () => void;
  onReset: () => void;
  onSaveTemplateClick?: () => void;
  isCopied: boolean;
  postTitle?: string;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  aspectRatio,
  onSelectAspectRatio,
  onOpenExport,
  onQuickCopy,
  onReset,
  onSaveTemplateClick,
  isCopied,
  postTitle,
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Brand title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <span className="font-black text-slate-950 text-base tracking-tighter">EP</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
              EditorialPost Studio
            </h1>
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/40">
              PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
            {postTitle || 'Social & Breaking News Graphic Creator'}
          </p>
        </div>
      </div>

      {/* Center: Aspect Ratio Switcher */}
      <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-inner">
        {[
          { id: '1:1', label: '1:1 Square', sub: '1080p', icon: Square },
          { id: '4:5', label: '4:5 Portrait', sub: 'IG Feed', icon: Square },
          { id: '9:16', label: '9:16 Story', sub: 'Reels', icon: Smartphone },
          { id: '16:9', label: '16:9 Banner', sub: 'Landscape', icon: Tv },
        ].map(({ id, label, sub, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelectAspectRatio(id as AspectRatio)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              aspectRatio === id
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-slate-700/80 scale-102'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title={label}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{id}</span>
          </button>
        ))}
      </div>

      {/* Right Actions: Reset, Save, Copy, Export */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          title="Reset to template defaults"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {onSaveTemplateClick && (
          <button
            onClick={onSaveTemplateClick}
            title="Save customized design as template"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition shadow-sm"
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Save Template</span>
          </button>
        )}

        {/* Copy to Clipboard */}
        <button
          onClick={onQuickCopy}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition shadow-sm"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Image</span>
            </>
          )}
        </button>

        {/* High-Res Export */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold transition shadow-lg shadow-cyan-500/25 active:scale-98"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Export 4K</span>
        </button>
      </div>
    </header>
  );
};
