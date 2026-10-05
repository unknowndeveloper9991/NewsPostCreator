import React, { useState } from 'react';
import { WordOverride, TextBlockConfig } from '../types';
import { HIGHLIGHT_COLORS, MARKER_BG_COLORS, tokenizeText } from '../utils/textUtils';
import {
  Paintbrush,
  Highlighter,
  Bold,
  Italic,
  Underline,
  RotateCcw,
  Sparkles,
  Check,
  MousePointerClick,
} from 'lucide-react';

interface WordStylerProps {
  textBlock: TextBlockConfig;
  onChange: (updatedBlock: TextBlockConfig) => void;
  label?: string;
}

export const WordStyler: React.FC<WordStylerProps> = ({
  textBlock,
  onChange,
  label = 'Word Color & Highlighter Styler',
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [customTextColor, setCustomTextColor] = useState('#06b6d4');
  const [customBgColor, setCustomBgColor] = useState('#facc15');

  const tokens = tokenizeText(textBlock.text, textBlock.wordOverrides);

  // Toggle single word or multi-select with shift/ctrl
  const toggleWordSelection = (index: number, e: React.MouseEvent) => {
    if (e.shiftKey && selectedIndices.length > 0) {
      const lastSelected = selectedIndices[selectedIndices.length - 1];
      const start = Math.min(lastSelected, index);
      const end = Math.max(lastSelected, index);
      const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      setSelectedIndices(Array.from(new Set([...selectedIndices, ...range])));
    } else if (e.ctrlKey || e.metaKey) {
      setSelectedIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      if (selectedIndices.length === 1 && selectedIndices[0] === index) {
        setSelectedIndices([]);
      } else {
        setSelectedIndices([index]);
      }
    }
  };

  const selectAll = () => setSelectedIndices(tokens.map((t) => t.index));
  const selectNone = () => setSelectedIndices([]);

  const applyTextColor = (color: string) => {
    if (selectedIndices.length === 0) return;
    const newOverrides = { ...textBlock.wordOverrides };
    selectedIndices.forEach((idx) => {
      const existing = newOverrides[idx] || { index: idx, word: tokens[idx]?.word || '' };
      newOverrides[idx] = { ...existing, color };
    });
    onChange({ ...textBlock, wordOverrides: newOverrides });
  };

  const applyBgHighlight = (bgColor: string, autoTextColor?: string) => {
    if (selectedIndices.length === 0) return;
    const newOverrides = { ...textBlock.wordOverrides };
    selectedIndices.forEach((idx) => {
      const existing = newOverrides[idx] || { index: idx, word: tokens[idx]?.word || '' };
      newOverrides[idx] = {
        ...existing,
        backgroundColor: bgColor,
        color: autoTextColor !== undefined ? autoTextColor : (existing.color || '#000000'),
      };
    });
    onChange({ ...textBlock, wordOverrides: newOverrides });
  };

  const removeBgHighlight = () => {
    if (selectedIndices.length === 0) return;
    const newOverrides = { ...textBlock.wordOverrides };
    selectedIndices.forEach((idx) => {
      if (newOverrides[idx]) {
        const { backgroundColor, ...rest } = newOverrides[idx];
        if (Object.keys(rest).length <= 2 && !rest.color && !rest.isBold && !rest.isItalic && !rest.isUnderline) {
          delete newOverrides[idx];
        } else {
          newOverrides[idx] = rest as WordOverride;
        }
      }
    });
    onChange({ ...textBlock, wordOverrides: newOverrides });
  };

  const toggleStyle = (styleKey: 'isBold' | 'isItalic' | 'isUnderline') => {
    if (selectedIndices.length === 0) return;
    const newOverrides = { ...textBlock.wordOverrides };
    const anyActive = selectedIndices.some((idx) => newOverrides[idx]?.[styleKey]);
    selectedIndices.forEach((idx) => {
      const existing = newOverrides[idx] || { index: idx, word: tokens[idx]?.word || '' };
      newOverrides[idx] = {
        ...existing,
        [styleKey]: !anyActive,
      };
    });
    onChange({ ...textBlock, wordOverrides: newOverrides });
  };

  const clearSelectedOverrides = () => {
    if (selectedIndices.length === 0) return;
    const newOverrides = { ...textBlock.wordOverrides };
    selectedIndices.forEach((idx) => {
      delete newOverrides[idx];
    });
    onChange({ ...textBlock, wordOverrides: newOverrides });
  };

  const clearAllOverrides = () => {
    onChange({ ...textBlock, wordOverrides: {} });
    setSelectedIndices([]);
  };

  const selectedWordsText = selectedIndices
    .map((i) => tokens[i]?.word)
    .filter(Boolean)
    .join(' ');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-md">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-100 tracking-wide">
              {label}
            </h4>
            <p className="text-[11px] text-slate-400">
              Change color of individual words or add marker highlight box
            </p>
          </div>
        </div>

        {/* Quick select helpers */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            onClick={selectAll}
            className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            All
          </button>
          <button
            onClick={selectNone}
            className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Clear
          </button>
          {Object.keys(textBlock.wordOverrides).length > 0 && (
            <button
              onClick={clearAllOverrides}
              className="px-2 py-1 rounded-md bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Interactive Word Chips Area */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
            <span>Click any word below to select & style:</span>
          </span>
          {selectedIndices.length > 0 && (
            <span className="text-cyan-400 font-semibold font-mono">
              {selectedIndices.length} selected
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
          {tokens.length === 0 ? (
            <span className="text-slate-500 italic text-xs">Headline is empty</span>
          ) : (
            tokens.map((token) => {
              const isSelected = selectedIndices.includes(token.index);
              const override = token.override;
              const hasColor = !!override?.color;
              const hasMarker = !!override?.backgroundColor;

              return (
                <button
                  key={token.index}
                  onClick={(e) => toggleWordSelection(token.index, e)}
                  style={{
                    color: override?.color || (hasMarker ? '#000000' : undefined),
                    backgroundColor: override?.backgroundColor || undefined,
                    fontWeight: override?.isBold ? '800' : undefined,
                    fontStyle: override?.isItalic ? 'italic' : undefined,
                    textDecoration: override?.isUnderline ? 'underline' : undefined,
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all select-none border ${
                    isSelected
                      ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 border-cyan-400 font-bold scale-105 shadow-md z-10'
                      : hasMarker
                      ? 'border-transparent font-black shadow-sm'
                      : hasColor
                      ? 'border-slate-700 bg-slate-800 font-bold'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  {token.word}
                  {token.hasOverride && !isSelected && (
                    <span className="inline-block ml-1 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Styling Controls for Selected Word(s) */}
      {selectedIndices.length > 0 ? (
        <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800 space-y-3 animate-fadeIn">
          {/* Active selection badge */}
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-300 truncate max-w-[240px]">
              <span className="text-slate-500 text-[11px]">Selected:</span>
              <span className="font-bold text-cyan-300 font-mono truncate">
                "{selectedWordsText}"
              </span>
            </div>
            <button
              onClick={clearSelectedOverrides}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" /> Clear this word
            </button>
          </div>

          {/* 1. Text Color Swatches */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Paintbrush className="w-3.5 h-3.5 text-cyan-400" />
              <span>Text Color</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => applyTextColor(c.hex)}
                  title={c.label}
                  style={{ backgroundColor: c.hex }}
                  className="w-6 h-6 rounded-full border border-white/20 hover:scale-115 active:scale-95 transition shadow-sm"
                />
              ))}
              {/* Custom Picker */}
              <label
                title="Custom Color"
                className="w-6 h-6 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center cursor-pointer hover:border-white transition relative overflow-hidden"
              >
                <input
                  type="color"
                  value={customTextColor}
                  onChange={(e) => {
                    setCustomTextColor(e.target.value);
                    applyTextColor(e.target.value);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <span className="text-[11px] font-bold text-slate-300">+</span>
              </label>
            </div>
          </div>

          {/* 2. Marker Box Background (Highlighter Box) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5">
                <Highlighter className="w-3.5 h-3.5 text-amber-400" />
                <span>Highlighter Box (Marker Style)</span>
              </div>
              <button
                onClick={removeBgHighlight}
                className="text-[10px] text-slate-400 hover:text-slate-200 transition"
              >
                Remove Box
              </button>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {MARKER_BG_COLORS.map((m) => (
                <button
                  key={m.hex}
                  onClick={() => applyBgHighlight(m.hex, m.textHex)}
                  style={{ backgroundColor: m.hex, color: m.textHex }}
                  className="px-2.5 py-1 rounded-md text-xs font-black border border-black/20 hover:scale-105 active:scale-95 transition shadow-sm"
                >
                  {m.label.split(' ')[0]}
                </button>
              ))}
              {/* Custom Marker Box */}
              <label
                title="Custom Background"
                className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700 bg-slate-800 text-slate-300 flex items-center gap-1 cursor-pointer hover:border-slate-500 transition relative overflow-hidden"
              >
                <input
                  type="color"
                  value={customBgColor}
                  onChange={(e) => {
                    setCustomBgColor(e.target.value);
                    applyBgHighlight(e.target.value);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <span>Custom</span>
              </label>
            </div>
          </div>

          {/* 3. Text Formatting (Bold, Italic, Underline) */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium">Style:</span>
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => toggleStyle('isBold')}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Toggle Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => toggleStyle('isItalic')}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Toggle Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => toggleStyle('isUnderline')}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Toggle Underline"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 text-[11px] text-slate-400 border-t border-slate-800/80">
          💡 Select any word above to pick its color or marker highlight box
        </div>
      )}
    </div>
  );
};
