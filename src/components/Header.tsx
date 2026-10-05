import React from 'react';
import { AspectRatio } from '../types';
import {
  Square,
  Smartphone,
  Tv,
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';

interface HeaderProps {
  aspectRatio: AspectRatio;
  onSelectAspectRatio: (ratio: AspectRatio) => void;
  onOpenExport: () => void;
  onQuickCopy: () => void;
  onReset: () => void;
  isCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  aspectRatio,
  onSelectAspectRatio,
  onOpenExport,
  onQuickCopy,
  onReset,
  isCopied,
}) => {
  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-4 flex items-center justify-between z-30 sticky top-0">
      {/* Brand title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400 flex items-center justify-center shadow-md shadow-red-500/20">
          <span className="font-black text-black text-sm tracking-tighter">EP</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-sm text-white tracking-wide">
              EditorialPost Studio
            </h1>
            <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/40">
              News & Social
            </span>
          </div>
          <p className="text-[10px] text-neutral-400 hidden sm:block">
            Word-Level Highlights · Curated Editorial Presets · 4K Export
          </p>
        </div>
      </div>

      {/* Center: Aspect Ratio Switcher */}
      <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
        {[
          { id: '1:1', label: '1:1 Square', icon: Square },
          { id: '4:5', label: '4:5 Portrait', icon: Square },
          { id: '9:16', label: '9:16 Story', icon: Smartphone },
          { id: '16:9', label: '16:9 Banner', icon: Tv },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelectAspectRatio(id as AspectRatio)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition ${
              aspectRatio === id
                ? 'bg-neutral-800 text-cyan-300 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title={label}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{id}</span>
          </button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Reset */}
        <button
          onClick={onReset}
          title="Reset to template default"
          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Quick Copy Image */}
        <button
          onClick={onQuickCopy}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold transition"
          title="Copy image directly to clipboard"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-neutral-400" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* High Res Export Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold transition shadow-md shadow-cyan-500/20"
        >
          <Download className="w-3.5 h-3.5 text-neutral-950" />
          <span>Export High-Res</span>
        </button>
      </div>
    </header>
  );
};
