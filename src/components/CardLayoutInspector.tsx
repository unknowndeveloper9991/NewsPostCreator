import React from 'react';
import { PostDesign, ContainerStyle } from '../types';
import { Layout, Check, Sparkles } from 'lucide-react';

interface CardLayoutInspectorProps {
  currentLayout: ContainerStyle;
  onSelectLayout: (layout: ContainerStyle) => void;
}

export const CardLayoutInspector: React.FC<CardLayoutInspectorProps> = ({
  currentLayout,
  onSelectLayout,
}) => {
  const layouts: Array<{
    id: ContainerStyle;
    title: string;
    description: string;
    previewGradient: string;
  }> = [
    {
      id: 'none',
      title: 'Full Bleed Overlay',
      description: 'Cinematic full photo with smooth bottom gradient fade',
      previewGradient: 'from-black/90 to-transparent',
    },
    {
      id: 'bottom-dark-card',
      title: 'Dark Frosted Card',
      description: 'Modern translucent glass container docked at bottom',
      previewGradient: 'from-slate-950/90 to-slate-900/60',
    },
    {
      id: 'bottom-light-card',
      title: 'Floating White Card',
      description: 'Crisp editorial white container floating at bottom',
      previewGradient: 'from-white to-slate-100',
    },
    {
      id: 'bottom-red-card',
      title: 'Red News Block',
      description: 'Solid bold red breaking news panel at bottom',
      previewGradient: 'from-red-600 to-red-700',
    },
    {
      id: 'side-split',
      title: 'Editorial Side Split',
      description: 'High-contrast split: photo on left, clean white editorial column on right',
      previewGradient: 'from-slate-900 via-white to-white',
    },
    {
      id: 'frame-inset',
      title: 'Hero Frame Inset',
      description: 'Bold outer colored frame with photo cutout inside',
      previewGradient: 'from-red-600 to-red-600',
    },
    {
      id: 'center-box',
      title: 'Center Frosted Box',
      description: 'Centered text panel with decorative red corner accents',
      previewGradient: 'from-black/80 to-black/80',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-slate-100">Post Layout & Frame</h3>
        </div>
        <span className="text-[11px] text-slate-500">{layouts.length} Layout Styles</span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Choose how the text container is framed over the background image:
      </p>

      <div className="space-y-2.5">
        {layouts.map((l) => {
          const isSelected = currentLayout === l.id;
          return (
            <button
              key={l.id}
              onClick={() => onSelectLayout(l.id)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-850 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{l.title}</span>
                  {isSelected && (
                    <span className="px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-400 text-[10px] font-bold border border-cyan-800/40">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {l.description}
                </p>
              </div>

              <div
                className={`w-10 h-10 rounded-lg shrink-0 border border-slate-700 bg-gradient-to-t ${l.previewGradient} flex items-center justify-center`}
              >
                {isSelected && <Check className="w-4 h-4 text-cyan-400 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
