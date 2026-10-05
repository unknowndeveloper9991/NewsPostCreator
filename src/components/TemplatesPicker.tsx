import React, { useState } from 'react';
import { PostDesign } from '../types';
import { TEMPLATES } from '../data/templates';
import {
  Sparkles,
  Check,
  Bookmark,
  BookmarkPlus,
  Trash2,
  FolderHeart,
  Layers,
} from 'lucide-react';

interface TemplatesPickerProps {
  currentDesign: PostDesign;
  savedTemplates: PostDesign[];
  onSelectTemplate: (template: PostDesign) => void;
  onSaveTemplate: (templateName: string) => void;
  onDeleteSavedTemplate: (templateId: string) => void;
}

export const TemplatesPicker: React.FC<TemplatesPickerProps> = ({
  currentDesign,
  savedTemplates,
  onSelectTemplate,
  onSaveTemplate,
  onDeleteSavedTemplate,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'saved' | 'presets'>('presets');
  const [templateName, setTemplateName] = useState<string>(
    currentDesign.title || currentDesign.headline.text.slice(0, 24) || 'My Custom Post'
  );
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim()) return;
    onSaveTemplate(templateName.trim());
    setSaveSuccessMsg(true);
    setActiveSubTab('saved');
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* 1. SAVE CURRENT TEMPLATE CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
          <BookmarkPlus className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-xs text-slate-100 uppercase tracking-wide">
            Save Current Post as Template
          </h3>
        </div>

        <form onSubmit={handleSave} className="space-y-2.5">
          <p className="text-[11px] text-slate-400">
            Save all current fonts, colors, custom word highlights, overlays and logo as your reusable template:
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g. My Brand Daily Breaking"
              className="flex-1 px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-hidden focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-md shadow-cyan-500/20"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Save</span>
            </button>
          </div>

          {saveSuccessMsg && (
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Template saved to your personal library!</span>
            </div>
          )}
        </form>
      </div>

      {/* 2. SUB-TABS: Saved vs Presets */}
      <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('presets')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'presets'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Preset Styles ({TEMPLATES.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('saved')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeSubTab === 'saved'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderHeart className="w-3.5 h-3.5 text-amber-400" />
          <span>My Saved ({savedTemplates.length})</span>
        </button>
      </div>

      {/* 3. CONTENT AREA */}
      {activeSubTab === 'saved' ? (
        <div className="space-y-3">
          {savedTemplates.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 space-y-2">
              <FolderHeart className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-xs font-bold text-slate-300">No Saved Templates Yet</div>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Customize any post with your preferred colors and logo, type a template name above, and click <strong>Save</strong> to store it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {savedTemplates.map((tmpl) => {
                const isSelected = tmpl.id === currentDesign.id;
                return (
                  <div
                    key={tmpl.id}
                    className={`group text-left p-2 rounded-xl border transition-all flex flex-col bg-slate-900 relative overflow-hidden ${
                      isSelected
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Thumbnail Preview */}
                    <div
                      onClick={() => onSelectTemplate(tmpl)}
                      className="w-full aspect-square rounded-lg overflow-hidden relative bg-black mb-2 cursor-pointer"
                    >
                      <img
                        src={tmpl.background.imageUrl}
                        alt={tmpl.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="absolute inset-x-2 bottom-2 space-y-1">
                        {tmpl.badge.show && tmpl.badge.text && (
                          <span
                            style={{ backgroundColor: tmpl.badge.backgroundColor }}
                            className="px-1.5 py-0.5 text-[8px] font-black uppercase text-white rounded-xs inline-block"
                          >
                            {tmpl.badge.text}
                          </span>
                        )}
                        <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                          {tmpl.headline.text}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Title & Delete Action */}
                    <div className="flex items-center justify-between w-full pt-1">
                      <span
                        onClick={() => onSelectTemplate(tmpl)}
                        className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 transition truncate cursor-pointer flex-1"
                        title={tmpl.title}
                      >
                        {tmpl.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSavedTemplate(tmpl.id);
                        }}
                        title="Delete saved template"
                        className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition shrink-0 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* PRESET TEMPLATES GALLERY */
        <div className="grid grid-cols-2 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
          {TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === currentDesign.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl)}
                className={`group text-left p-2 rounded-xl border transition-all flex flex-col bg-slate-900 relative overflow-hidden ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                {/* Preview Thumbnail */}
                <div className="w-full aspect-square rounded-lg overflow-hidden relative bg-black mb-2">
                  <img
                    src={tmpl.background.imageUrl}
                    alt={tmpl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <div className="absolute inset-x-2 bottom-2 space-y-1">
                    {tmpl.badge.show && (
                      <span
                        style={{ backgroundColor: tmpl.badge.backgroundColor }}
                        className="px-1.5 py-0.5 text-[8px] font-black uppercase text-white rounded-xs inline-block"
                      >
                        {tmpl.badge.text}
                      </span>
                    )}
                    <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight drop-shadow">
                      {tmpl.headline.text}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 transition truncate">
                    {tmpl.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
