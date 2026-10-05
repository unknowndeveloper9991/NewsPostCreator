import React, { useState, useRef, useEffect } from 'react';
import { PostDesign, AspectRatio, ContainerStyle } from './types';
import { TEMPLATES } from './data/templates';
import { StudioHeader } from './components/StudioHeader';
import { StudioSidebarRail, SidebarTab } from './components/StudioSidebarRail';
import { CanvasPreview } from './components/CanvasPreview';
import { TextInspector } from './components/TextInspector';
import { BackgroundInspector } from './components/BackgroundInspector';
import { BrandingInspector } from './components/BrandingInspector';
import { CardLayoutInspector } from './components/CardLayoutInspector';
import { TemplatesPicker } from './components/TemplatesPicker';
import { ExportModal } from './components/ExportModal';
import { copyElementToClipboard } from './utils/exportImage';
import {
  getSavedTemplates,
  saveTemplateToStorage,
  deleteSavedTemplateFromStorage,
} from './utils/storage';
import {
  Sparkles,
  Type,
  Image as ImageIcon,
  Layout,
  Palette,
  Check,
  Building,
  ShieldAlert,
  X,
  Sliders,
} from 'lucide-react';

export default function App() {
  const [currentDesign, setCurrentDesign] = useState<PostDesign>(TEMPLATES[0]);
  const [savedTemplates, setSavedTemplates] = useState<PostDesign[]>(() => getSavedTemplates());
  const [activeTab, setActiveTab] = useState<SidebarTab>('text');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [activeElement, setActiveElement] = useState<string | null>('headline');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Save current design as template
  const handleSaveTemplate = async (templateName: string) => {
    const newTemplate: PostDesign = {
      ...currentDesign,
      id: `custom-${Date.now()}`,
      title: templateName,
    };
    const result = await saveTemplateToStorage(newTemplate);
    setSavedTemplates(result.templates);
  };

  // Delete saved template
  const handleDeleteSavedTemplate = (templateId: string) => {
    const updated = deleteSavedTemplateFromStorage(templateId);
    setSavedTemplates(updated);
  };

  // Template select
  const handleSelectTemplate = (template: PostDesign) => {
    setCurrentDesign({ ...template, aspectRatio: currentDesign.aspectRatio });
  };

  // Aspect ratio change
  const handleSelectAspectRatio = (ratio: AspectRatio) => {
    setCurrentDesign((prev) => ({ ...prev, aspectRatio: ratio }));
  };

  // Quick Copy
  const handleQuickCopy = async () => {
    if (!canvasRef.current) return;
    const success = await copyElementToClipboard(canvasRef.current, 2);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Reset to original template
  const handleReset = () => {
    const original = TEMPLATES.find((t) => t.id === currentDesign.id) || TEMPLATES[0];
    setCurrentDesign({ ...original, aspectRatio: currentDesign.aspectRatio });
  };

  // Canvas or Toolbar element click
  const handleSelectElement = (elementId: string) => {
    setActiveElement(elementId);
    setIsDrawerOpen(true);

    if (elementId === 'headline' || elementId === 'kicker' || elementId === 'subheadline') {
      setActiveTab('text');
    } else if (elementId === 'brand' || elementId === 'badge' || elementId === 'footer') {
      setActiveTab('branding');
    } else if (elementId === 'background') {
      setActiveTab('media');
    }
  };

  // Quick palette mood switchers
  const applyColorTheme = (accentColor: string, wordColor: string, badgeBg: string) => {
    setCurrentDesign((prev) => {
      const updatedWords = { ...prev.headline.wordOverrides };
      Object.keys(updatedWords).forEach((key) => {
        const idx = Number(key);
        if (updatedWords[idx]) {
          updatedWords[idx] = {
            ...updatedWords[idx],
            color: wordColor,
          };
        }
      });

      return {
        ...prev,
        accentColor,
        badge: {
          ...prev.badge,
          backgroundColor: badgeBg,
        },
        headline: {
          ...prev.headline,
          wordOverrides: updatedWords,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. TOP STUDIO HEADER */}
      <StudioHeader
        aspectRatio={currentDesign.aspectRatio}
        onSelectAspectRatio={handleSelectAspectRatio}
        onOpenExport={() => setIsExportOpen(true)}
        onQuickCopy={handleQuickCopy}
        onReset={handleReset}
        onSaveTemplateClick={() => {
          setActiveTab('templates');
          setIsDrawerOpen(true);
        }}
        isCopied={isCopied}
        postTitle={currentDesign.title}
      />

      {/* 2. MAIN CREATIVE WORKSPACE */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        {/* Left Vertical Icon Rail */}
        <StudioSidebarRail
          activeTab={activeTab}
          onChangeTab={(tab) => {
            setActiveTab(tab);
            setIsDrawerOpen(true);
          }}
          isOpen={isDrawerOpen}
          onToggleOpen={() => setIsDrawerOpen(!isDrawerOpen)}
        />

        {/* Slide-out Inspector Drawer Panel */}
        {isDrawerOpen && (
          <aside className="w-80 sm:w-96 md:w-[420px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shrink-0 shadow-2xl h-[calc(100vh-4rem)] animate-fadeIn">
            {/* Drawer Header */}
            <div className="h-12 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {activeTab === 'templates' && 'Templates Gallery'}
                  {activeTab === 'text' && 'Typography & Words'}
                  {activeTab === 'media' && 'Background & Lighting'}
                  {activeTab === 'branding' && 'Logo, Badge & Footer'}
                  {activeTab === 'layout' && 'Post Layout & Shapes'}
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Collapse drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body Scroll */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
              {activeTab === 'templates' && (
                <TemplatesPicker
                  currentDesign={currentDesign}
                  savedTemplates={savedTemplates}
                  onSelectTemplate={handleSelectTemplate}
                  onSaveTemplate={handleSaveTemplate}
                  onDeleteSavedTemplate={handleDeleteSavedTemplate}
                />
              )}

              {activeTab === 'text' && (
                <TextInspector
                  design={currentDesign}
                  onUpdateHeadline={(headline) =>
                    setCurrentDesign((prev) => ({ ...prev, headline }))
                  }
                  onUpdateSubhead={(subheadline) =>
                    setCurrentDesign((prev) => ({ ...prev, subheadline }))
                  }
                  onUpdateKicker={(kicker) =>
                    setCurrentDesign((prev) => ({ ...prev, kicker }))
                  }
                />
              )}

              {activeTab === 'media' && (
                <BackgroundInspector
                  background={currentDesign.background}
                  onChange={(background) =>
                    setCurrentDesign((prev) => ({ ...prev, background }))
                  }
                />
              )}

              {activeTab === 'branding' && (
                <BrandingInspector
                  design={currentDesign}
                  onUpdateBrand={(brand) =>
                    setCurrentDesign((prev) => ({ ...prev, brand }))
                  }
                  onUpdateBadge={(badge) =>
                    setCurrentDesign((prev) => ({ ...prev, badge }))
                  }
                  onUpdateFooter={(footer) =>
                    setCurrentDesign((prev) => ({ ...prev, footer }))
                  }
                />
              )}

              {activeTab === 'layout' && (
                <CardLayoutInspector
                  currentLayout={currentDesign.containerStyle}
                  onSelectLayout={(containerStyle) =>
                    setCurrentDesign((prev) => ({ ...prev, containerStyle }))
                  }
                />
              )}
            </div>
          </aside>
        )}

        {/* Center Canvas Stage Area */}
        <main className="flex-1 flex flex-col items-center justify-between p-4 sm:p-8 overflow-y-auto bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px]">
          {/* Top Quick Element Switcher Bar */}
          <div className="w-full max-w-[620px] mb-3 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between flex-wrap gap-1.5 shadow-lg">
            <div className="flex items-center gap-1 flex-wrap text-xs">
              <span className="text-[11px] font-semibold text-slate-400 px-2">
                Click to edit:
              </span>
              {[
                { id: 'headline', label: 'Headline', active: currentDesign.headline.show },
                { id: 'kicker', label: 'Topic Tag', active: currentDesign.kicker.show },
                { id: 'brand', label: 'Logo', active: currentDesign.brand.show },
                { id: 'badge', label: 'Badge', active: currentDesign.badge.show },
                { id: 'subheadline', label: 'Subtitle', active: currentDesign.subheadline.show },
                { id: 'footer', label: 'Footer', active: currentDesign.footer.show },
                { id: 'background', label: 'Photo', active: true },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectElement(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeElement === item.id
                      ? 'bg-slate-800 text-cyan-300 ring-1 ring-cyan-500 shadow-sm'
                      : item.active
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-500 line-through hover:text-slate-400'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.active ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveTab('templates');
                setIsDrawerOpen(true);
              }}
              className="text-xs px-2.5 py-1 rounded-lg text-amber-300 hover:bg-amber-950/40 border border-amber-900/40 flex items-center gap-1 font-bold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Presets</span>
            </button>
          </div>

          {/* Canvas Component with Interactive Click Handlers */}
          <div className="w-full flex-1 flex flex-col items-center justify-center py-2">
            <CanvasPreview
              design={currentDesign}
              canvasRef={canvasRef}
              activeElement={activeElement}
              onSelectElement={handleSelectElement}
            />
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <span>💡 Click any word or text block directly on the graphic above to customize</span>
            </p>
          </div>

          {/* Bottom Accent Mood Switcher */}
          <div className="w-full max-w-[620px] mt-3 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between text-xs shadow-lg">
            <div className="flex items-center gap-2 pl-2">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 font-semibold hidden sm:inline">
                Color Accent:
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { label: 'Cyan News', accent: '#06b6d4', word: '#06b6d4', badge: '#dc2626' },
                { label: 'Alert Red', accent: '#ef4444', word: '#f87171', badge: '#dc2626' },
                { label: 'Neon Yellow', accent: '#facc15', word: '#facc15', badge: '#facc15' },
                { label: 'Emerald', accent: '#10b981', word: '#34d399', badge: '#059669' },
                { label: 'Amber Gold', accent: '#f59e0b', word: '#fbbf24', badge: '#d97706' },
              ].map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => applyColorTheme(mood.accent, mood.word, mood.badge)}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 border border-slate-700/60 shadow-xs"
                >
                  <span
                    className="w-2 h-2 rounded-full shadow-xs"
                    style={{ backgroundColor: mood.accent }}
                  />
                  <span>{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* 3. HIGH-RESOLUTION EXPORT MODAL */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        aspectRatio={currentDesign.aspectRatio}
        canvasElement={canvasRef.current}
        defaultTitle={currentDesign.headline.text.slice(0, 25) || 'editorial-post'}
      />
    </div>
  );
}
