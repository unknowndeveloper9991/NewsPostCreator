import React from 'react';
import { PostDesign, TextBlockConfig, TextBorderConfig } from '../types';
import { FONTS } from '../data/fonts';
import { WordStyler } from './WordStyler';
import {
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CaseSensitive,
  Sparkles,
  Sliders,
  Eye,
  EyeOff,
  Square,
} from 'lucide-react';

interface TextInspectorProps {
  design: PostDesign;
  onUpdateHeadline: (headline: TextBlockConfig) => void;
  onUpdateSubhead: (subhead: TextBlockConfig) => void;
  onUpdateKicker: (kicker: TextBlockConfig) => void;
}

export const TextInspector: React.FC<TextInspectorProps> = ({
  design,
  onUpdateHeadline,
  onUpdateSubhead,
  onUpdateKicker,
}) => {
  return (
    <div className="space-y-5">
      {/* SECTION 1: HEADLINE (With Enable/Disable Toggle) */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-neutral-100">Main Headline</h3>
          </div>
          {/* Main Enable/Disable Toggle */}
          <button
            onClick={() =>
              onUpdateHeadline({ ...design.headline, show: !design.headline.show })
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
              design.headline.show
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
            }`}
          >
            {design.headline.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.headline.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.headline.show ? (
          <div className="space-y-4 animate-fadeIn">
            {/* Text Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Headline Text</label>
              <textarea
                rows={3}
                value={design.headline.text}
                onChange={(e) =>
                  onUpdateHeadline({
                    ...design.headline,
                    text: e.target.value,
                  })
                }
                placeholder="Type your viral headline or breaking news statement..."
                className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-100 placeholder:text-neutral-600 focus:outline-hidden focus:border-cyan-500 font-sans resize-none transition"
              />
            </div>

            {/* Dedicated Interactive Word-Level Highlighter Tool */}
            <WordStyler
              textBlock={design.headline}
              onChange={onUpdateHeadline}
              label="Highlight Words & Custom Colors"
            />

            {/* Typography Controls */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Font Family */}
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-medium text-neutral-400">Font Family</label>
                <select
                  value={design.headline.fontFamily}
                  onChange={(e) =>
                    onUpdateHeadline({
                      ...design.headline,
                      fontFamily: e.target.value,
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-neutral-200 focus:outline-hidden focus:border-cyan-500"
                >
                  {FONTS.map((font) => (
                    <option key={font.name} value={font.family}>
                      {font.name} ({font.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Headline Font Size with Range + Direct Number Input + Step Buttons */}
              <div className="space-y-1.5 col-span-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-semibold text-slate-300">Headline Font Size</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateHeadline({
                          ...design.headline,
                          fontSize: Math.max(16, design.headline.fontSize - 4),
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition"
                      title="Decrease font size"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={16}
                      max={260}
                      value={design.headline.fontSize}
                      onChange={(e) =>
                        onUpdateHeadline({
                          ...design.headline,
                          fontSize: Math.max(12, Number(e.target.value) || 20),
                        })
                      }
                      className="w-16 px-1.5 py-0.5 text-center font-mono font-bold text-xs bg-slate-950 border border-slate-700 rounded text-cyan-400 focus:outline-hidden"
                    />
                    <span className="text-slate-500 font-mono text-[10px]">px</span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateHeadline({
                          ...design.headline,
                          fontSize: Math.min(260, design.headline.fontSize + 4),
                        })
                      }
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition"
                      title="Increase font size"
                    >
                      +
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min={20}
                  max={220}
                  value={design.headline.fontSize}
                  onChange={(e) =>
                    onUpdateHeadline({
                      ...design.headline,
                      fontSize: Number(e.target.value),
                    })
                  }
                  className="w-full accent-cyan-400 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />

                {/* Quick Presets */}
                <div className="flex items-center gap-1 pt-0.5 flex-wrap">
                  {[
                    { label: '44px', size: 44 },
                    { label: '64px', size: 64 },
                    { label: '84px', size: 84 },
                    { label: '110px', size: 110 },
                    { label: '140px', size: 140 },
                    { label: '180px', size: 180 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() =>
                        onUpdateHeadline({
                          ...design.headline,
                          fontSize: p.size,
                        })
                      }
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                        design.headline.fontSize === p.size
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Line Spacing</span>
                  <span className="text-neutral-200 font-mono">{design.headline.lineHeight}</span>
                </div>
                <input
                  type="range"
                  min={0.9}
                  max={1.6}
                  step={0.05}
                  value={design.headline.lineHeight}
                  onChange={(e) =>
                    onUpdateHeadline({
                      ...design.headline,
                      lineHeight: Number(e.target.value),
                    })
                  }
                  className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Letter Spacing */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Letter Spacing</span>
                  <span className="text-neutral-200 font-mono">{design.headline.letterSpacing}px</span>
                </div>
                <input
                  type="range"
                  min={-2}
                  max={8}
                  step={0.5}
                  value={design.headline.letterSpacing}
                  onChange={(e) =>
                    onUpdateHeadline({
                      ...design.headline,
                      letterSpacing: Number(e.target.value),
                    })
                  }
                  className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Base Text Color */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-400">Base Text Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.headline.color}
                    onChange={(e) =>
                      onUpdateHeadline({
                        ...design.headline,
                        color: e.target.value,
                      })
                    }
                    className="w-7 h-7 rounded border border-neutral-700 bg-neutral-900 cursor-pointer p-0.5"
                  />
                  <span className="text-xs font-mono text-neutral-300">
                    {design.headline.color}
                  </span>
                </div>
              </div>
            </div>

            {/* Alignment & Transform */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-md border border-neutral-800">
                <button
                  onClick={() => onUpdateHeadline({ ...design.headline, textAlign: 'left' })}
                  className={`p-1.5 rounded ${
                    design.headline.textAlign === 'left'
                      ? 'bg-neutral-800 text-cyan-400'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Align Left"
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onUpdateHeadline({ ...design.headline, textAlign: 'center' })}
                  className={`p-1.5 rounded ${
                    design.headline.textAlign === 'center'
                      ? 'bg-neutral-800 text-cyan-400'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Align Center"
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onUpdateHeadline({ ...design.headline, textAlign: 'right' })}
                  className={`p-1.5 rounded ${
                    design.headline.textAlign === 'right'
                      ? 'bg-neutral-800 text-cyan-400'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Align Right"
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-md border border-neutral-800 text-xs">
                <button
                  onClick={() =>
                    onUpdateHeadline({
                      ...design.headline,
                      textTransform:
                        design.headline.textTransform === 'uppercase' ? 'none' : 'uppercase',
                    })
                  }
                  className={`px-2 py-1 rounded flex items-center gap-1 font-semibold ${
                    design.headline.textTransform === 'uppercase'
                      ? 'bg-neutral-800 text-cyan-400'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <CaseSensitive className="w-3.5 h-3.5" />
                  UPPERCASE
                </button>
              </div>
            </div>

            {/* Headline Border / Box Outline (User can Enable, Remove, or Change Color) */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Square className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">Headline Border & Box</span>
                </div>
                <button
                  onClick={() => {
                    const currentBorder = design.headline.border || {
                      show: false,
                      color: '#06b6d4',
                      width: 2,
                      style: 'solid',
                      radius: 4,
                      padding: 8,
                    };
                    onUpdateHeadline({
                      ...design.headline,
                      border: {
                        ...currentBorder,
                        show: !currentBorder.show,
                      },
                    });
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                    design.headline.border?.show
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {design.headline.border?.show ? 'Border Active' : 'No Border'}
                </button>
              </div>

              {design.headline.border?.show && (
                <div className="space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800 animate-fadeIn text-xs">
                  {/* Color Picker + Quick Swatches */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Border Color</span>
                      <span className="font-mono text-cyan-400 font-bold">{design.headline.border.color || '#06b6d4'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={design.headline.border.color || '#06b6d4'}
                        onChange={(e) =>
                          onUpdateHeadline({
                            ...design.headline,
                            border: {
                              ...design.headline.border!,
                              color: e.target.value,
                            },
                          })
                        }
                        className="w-7 h-7 rounded border border-slate-700 bg-slate-900 cursor-pointer p-0.5"
                      />
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {['#06b6d4', '#ef4444', '#facc15', '#ffffff', '#10b981', '#f59e0b', '#000000'].map((color) => (
                          <button
                            key={color}
                            onClick={() =>
                              onUpdateHeadline({
                                ...design.headline,
                                border: {
                                  ...design.headline.border!,
                                  color,
                                },
                              })
                            }
                            style={{ backgroundColor: color }}
                            className="w-5 h-5 rounded-full border border-white/20 hover:scale-115 transition shadow-xs"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Border Style */}
                  <div className="space-y-1">
                    <label className="text-slate-400 font-medium">Border Style</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'solid', label: 'Solid Box' },
                        { id: 'left-accent', label: 'Left Bar' },
                        { id: 'top-bottom', label: 'Top/Bottom' },
                        { id: 'dashed', label: 'Dashed' },
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() =>
                            onUpdateHeadline({
                              ...design.headline,
                              border: {
                                ...design.headline.border!,
                                style: st.id as any,
                              },
                            })
                          }
                          className={`py-1.5 px-1 rounded-lg border text-center font-medium transition ${
                            design.headline.border?.style === st.id
                              ? 'bg-slate-800 border-cyan-400 text-cyan-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Width & Radius */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Thickness</span>
                        <span className="text-slate-200 font-mono">{design.headline.border.width || 2}px</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={8}
                        value={design.headline.border.width || 2}
                        onChange={(e) =>
                          onUpdateHeadline({
                            ...design.headline,
                            border: {
                              ...design.headline.border!,
                              width: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Corners</span>
                        <span className="text-slate-200 font-mono">{design.headline.border.radius || 4}px</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={24}
                        value={design.headline.border.radius || 4}
                        onChange={(e) =>
                          onUpdateHeadline({
                            ...design.headline,
                            border: {
                              ...design.headline.border!,
                              radius: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      onUpdateHeadline({
                        ...design.headline,
                        border: {
                          ...design.headline.border!,
                          show: false,
                        },
                      })
                    }
                    className="w-full py-1 px-2 rounded-lg bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 text-xs transition"
                  >
                    Remove Border
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 italic">Headline is currently hidden</p>
        )}
      </div>

      {/* SECTION 2: KICKER / CATEGORY TAG (With Enable/Disable Toggle) */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="font-bold text-sm text-neutral-100">Kicker / Topic Tag</h3>
          </div>
          <button
            onClick={() =>
              onUpdateKicker({ ...design.kicker, show: !design.kicker.show })
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
              design.kicker.show
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
            }`}
          >
            {design.kicker.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.kicker.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.kicker.show ? (
          <div className="space-y-3 animate-fadeIn">
            <input
              type="text"
              value={design.kicker.text}
              onChange={(e) =>
                onUpdateKicker({
                  ...design.kicker,
                  text: e.target.value,
                })
              }
              placeholder="e.g. ECONOMICS or BREAKING NEWS TODAY"
              className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-neutral-100 uppercase tracking-widest focus:outline-hidden focus:border-cyan-500"
            />
            {/* Kicker Color, Size & Letter Spacing */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-slate-300">Topic Font Size</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateKicker({
                        ...design.kicker,
                        fontSize: Math.max(12, design.kicker.fontSize - 2),
                      })
                    }
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={12}
                    max={64}
                    value={design.kicker.fontSize}
                    onChange={(e) =>
                      onUpdateKicker({
                        ...design.kicker,
                        fontSize: Math.max(10, Number(e.target.value) || 12),
                      })
                    }
                    className="w-12 px-1 py-0.5 text-center font-mono font-bold text-xs bg-slate-950 border border-slate-700 rounded text-cyan-400"
                  />
                  <span className="text-slate-500 font-mono text-[10px]">px</span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateKicker({
                        ...design.kicker,
                        fontSize: Math.min(64, design.kicker.fontSize + 2),
                      })
                    }
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <input
                type="range"
                min={12}
                max={64}
                value={design.kicker.fontSize}
                onChange={(e) =>
                  onUpdateKicker({
                    ...design.kicker,
                    fontSize: Number(e.target.value),
                  })
                }
                className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Color:</span>
                  <input
                    type="color"
                    value={design.kicker.color}
                    onChange={(e) =>
                      onUpdateKicker({
                        ...design.kicker,
                        color: e.target.value,
                      })
                    }
                    className="w-6 h-6 rounded border border-neutral-700 bg-neutral-900 cursor-pointer p-0.5"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Letter Spacing:</span>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={design.kicker.letterSpacing}
                    onChange={(e) =>
                      onUpdateKicker({
                        ...design.kicker,
                        letterSpacing: Number(e.target.value),
                      })
                    }
                    className="w-24 accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 italic">Topic tag is currently hidden</p>
        )}
      </div>

      {/* SECTION 3: SUBTITLE / DECK (With Enable/Disable Toggle) */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="font-bold text-sm text-neutral-100">Subtitle / Description</h3>
          </div>
          <button
            onClick={() =>
              onUpdateSubhead({ ...design.subheadline, show: !design.subheadline.show })
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
              design.subheadline.show
                ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
            }`}
          >
            {design.subheadline.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.subheadline.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.subheadline.show ? (
          <div className="space-y-3 animate-fadeIn">
            <textarea
              rows={2}
              value={design.subheadline.text}
              onChange={(e) =>
                onUpdateSubhead({
                  ...design.subheadline,
                  text: e.target.value,
                })
              }
              placeholder="Supporting explainer paragraph, excerpt or tags..."
              className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-neutral-200 placeholder:text-neutral-600 focus:outline-hidden focus:border-cyan-500"
            />

            <div className="flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span>Color:</span>
                <input
                  type="color"
                  value={design.subheadline.color}
                  onChange={(e) =>
                    onUpdateSubhead({
                      ...design.subheadline,
                      color: e.target.value,
                    })
                  }
                  className="w-6 h-6 rounded border border-neutral-700 bg-neutral-900 cursor-pointer p-0.5"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-300">Size:</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSubhead({
                      ...design.subheadline,
                      fontSize: Math.max(12, design.subheadline.fontSize - 2),
                    })
                  }
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center transition"
                >
                  -
                </button>
                <input
                  type="number"
                  min={12}
                  max={80}
                  value={design.subheadline.fontSize}
                  onChange={(e) =>
                    onUpdateSubhead({
                      ...design.subheadline,
                      fontSize: Math.max(10, Number(e.target.value) || 14),
                    })
                  }
                  className="w-12 px-1 py-0.5 text-center font-mono font-bold text-xs bg-slate-950 border border-slate-700 rounded text-cyan-400"
                />
                <span className="text-slate-500 font-mono text-[10px]">px</span>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSubhead({
                      ...design.subheadline,
                      fontSize: Math.min(80, design.subheadline.fontSize + 2),
                    })
                  }
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center transition"
                >
                  +
                </button>
                <input
                  type="range"
                  min={12}
                  max={80}
                  value={design.subheadline.fontSize}
                  onChange={(e) =>
                    onUpdateSubhead({
                      ...design.subheadline,
                      fontSize: Number(e.target.value),
                    })
                  }
                  className="w-24 accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer ml-1"
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 italic">Subtitle is currently hidden</p>
        )}
      </div>
    </div>
  );
};
