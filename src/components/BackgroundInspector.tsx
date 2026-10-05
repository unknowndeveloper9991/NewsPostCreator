import React, { useRef } from 'react';
import { BackgroundConfig, StockImage } from '../types';
import { STOCK_IMAGES } from '../data/stockImages';
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Sliders,
  Sun,
  Contrast,
  Droplet,
  Layers,
  Sparkles,
} from 'lucide-react';

interface BackgroundInspectorProps {
  background: BackgroundConfig;
  onChange: (updatedBg: BackgroundConfig) => void;
}

export const BackgroundInspector: React.FC<BackgroundInspectorProps> = ({
  background,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            ...background,
            imageUrl: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. IMAGE SOURCE & STOCK LIBRARY */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-slate-100">Background Photo</h3>
          </div>
          <span className="text-[11px] text-slate-400">Upload or Stock</span>
        </div>

        {/* Upload & URL Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-850 border border-slate-700 hover:border-cyan-500 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition group shadow-sm"
          >
            <Upload className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
            <span>Upload Photo</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <div className="relative">
            <input
              type="text"
              placeholder="Paste Image URL..."
              value={background.imageUrl.startsWith('data:') ? 'Custom Uploaded' : background.imageUrl}
              onChange={(e) => {
                if (!e.target.value.startsWith('Custom Uploaded')) {
                  onChange({ ...background, imageUrl: e.target.value });
                }
              }}
              className="w-full pl-8 pr-2.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-hidden focus:border-cyan-500 truncate"
            />
            <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
          </div>
        </div>

        {/* Stock Photos Grid */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Editorial Stock Photos</span>
          </label>
          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1.5 bg-slate-950 rounded-xl border border-slate-800/80">
            {STOCK_IMAGES.map((img) => (
              <button
                key={img.id}
                onClick={() => onChange({ ...background, imageUrl: img.url })}
                title={img.label}
                className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                  background.imageUrl === img.url
                    ? 'ring-2 ring-cyan-400 border-cyan-400 scale-95 shadow-md'
                    : 'border-slate-800 hover:border-slate-600 hover:opacity-90'
                }`}
              >
                <img
                  src={img.thumbnail}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. POSITION & ZOOM */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200">Scale & Framing</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Zoom</span>
              <span className="text-slate-200 font-mono">{background.zoom}%</span>
            </div>
            <input
              type="range"
              min={100}
              max={200}
              value={background.zoom}
              onChange={(e) => onChange({ ...background, zoom: Number(e.target.value) })}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Vertical Position</span>
              <span className="text-slate-200 font-mono">{background.positionY}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={background.positionY}
              onChange={(e) => onChange({ ...background, positionY: Number(e.target.value) })}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. DARK OVERLAYS & VIGNETTES */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-slate-200">Cinematic Dark Overlays</h4>
          </div>
          <span className="text-[10px] text-slate-400">Boosts headline contrast</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'linear-bottom', label: 'Bottom Gradient' },
            { id: 'radial-vignette', label: 'Vignette' },
            { id: 'linear-top', label: 'Top Gradient' },
            { id: 'linear-full', label: 'Solid Tint' },
            { id: 'angled-split', label: 'Angled' },
            { id: 'none', label: 'No Overlay' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() =>
                onChange({
                  ...background,
                  overlayType: type.id as BackgroundConfig['overlayType'],
                })
              }
              className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                background.overlayType === type.id
                  ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {background.overlayType !== 'none' && (
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Overlay Darkness</span>
                <span className="text-slate-200 font-mono">{background.overlayOpacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={95}
                value={background.overlayOpacity}
                onChange={(e) =>
                  onChange({ ...background, overlayOpacity: Number(e.target.value) })
                }
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Edge Vignette</span>
                <span className="text-slate-200 font-mono">{background.vignetteStrength}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={background.vignetteStrength}
                onChange={(e) =>
                  onChange({ ...background, vignetteStrength: Number(e.target.value) })
                }
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. LIGHTING & FILTERS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200">Image Filters & Lighting</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Brightness</span>
              <span className="text-slate-200 font-mono">{background.brightness}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={150}
              value={background.brightness}
              onChange={(e) =>
                onChange({ ...background, brightness: Number(e.target.value) })
              }
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Contrast</span>
              <span className="text-slate-200 font-mono">{background.contrast}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={150}
              value={background.contrast}
              onChange={(e) =>
                onChange({ ...background, contrast: Number(e.target.value) })
              }
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Saturation</span>
              <span className="text-slate-200 font-mono">{background.saturation}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={200}
              value={background.saturation}
              onChange={(e) =>
                onChange({ ...background, saturation: Number(e.target.value) })
              }
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Blur Effect</span>
              <span className="text-slate-200 font-mono">{background.blur}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={15}
              value={background.blur}
              onChange={(e) => onChange({ ...background, blur: Number(e.target.value) })}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
