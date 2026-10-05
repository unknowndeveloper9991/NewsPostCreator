import React, { useRef } from 'react';
import {
  PostDesign,
  BadgeStyle,
  BrandConfig,
  FooterConfig,
  BadgeConfig,
} from '../types';
import {
  Building,
  ShieldAlert,
  Radio,
  Newspaper,
  Flame,
  Globe,
  TrendingUp,
  Upload,
  Trash2,
  Image as ImageIcon,
  Check,
  Eye,
  EyeOff,
  Link as LinkIcon,
} from 'lucide-react';

interface BrandingInspectorProps {
  design: PostDesign;
  onUpdateBrand: (brand: BrandConfig) => void;
  onUpdateBadge: (badge: BadgeConfig) => void;
  onUpdateFooter: (footer: FooterConfig) => void;
}

export const BrandingInspector: React.FC<BrandingInspectorProps> = ({
  design,
  onUpdateBrand,
  onUpdateBadge,
  onUpdateFooter,
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateBrand({
            ...design.brand,
            show: true,
            logoType: 'image',
            customLogoUrl: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. BRAND & LOGO (Custom image upload, presets, or disable) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-slate-100">Logo & Brand Header</h3>
          </div>
          {/* Main Enable/Disable Toggle */}
          <button
            onClick={() => onUpdateBrand({ ...design.brand, show: !design.brand.show })}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              design.brand.show
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {design.brand.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.brand.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.brand.show ? (
          <div className="space-y-4 animate-fadeIn">
            {/* Logo Graphic Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Logo Style</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdateBrand({ ...design.brand, logoType: 'image' })}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition flex items-center justify-center gap-1.5 ${
                    design.brand.logoType === 'image'
                      ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Custom Image</span>
                </button>
                <button
                  onClick={() => onUpdateBrand({ ...design.brand, logoType: 'icon' })}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition ${
                    design.brand.logoType === 'icon'
                      ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Preset Icon
                </button>
                <button
                  onClick={() => onUpdateBrand({ ...design.brand, logoType: 'text-only' })}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition ${
                    design.brand.logoType === 'text-only'
                      ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Text Only
                </button>
              </div>
            </div>

            {/* Custom Logo Image Upload Area */}
            {design.brand.logoType === 'image' && (
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">
                    Upload Your Logo (PNG, SVG, or JPG)
                  </span>
                  {design.brand.customLogoUrl && (
                    <button
                      onClick={() =>
                        onUpdateBrand({
                          ...design.brand,
                          customLogoUrl: undefined,
                          logoType: 'icon',
                        })
                      }
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {design.brand.customLogoUrl ? (
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center p-1.5 overflow-hidden shrink-0 shadow-inner">
                      <img
                        src={design.brand.customLogoUrl}
                        alt="Uploaded logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center text-slate-500 shrink-0">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1.5">
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="w-full py-2 px-3 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{design.brand.customLogoUrl ? 'Replace Logo' : 'Upload Logo File'}</span>
                    </button>
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Use transparent PNG or SVG for best look
                    </p>
                  </div>
                </div>

                {/* Logo Size */}
                <div className="pt-2 border-t border-slate-850 space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Logo Scale</span>
                    <span className="text-slate-200 font-mono">{design.brand.logoSize || 28}px</span>
                  </div>
                  <input
                    type="range"
                    min={16}
                    max={56}
                    value={design.brand.logoSize || 28}
                    onChange={(e) =>
                      onUpdateBrand({ ...design.brand, logoSize: Number(e.target.value) })
                    }
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Icon Picker (if icon mode) */}
            {design.brand.logoType === 'icon' && (
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400">Choose Icon</label>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'newspaper', label: 'News', icon: Newspaper },
                    { id: 'flame', label: 'Flame', icon: Flame },
                    { id: 'radio', label: 'Broadcast', icon: Radio },
                    { id: 'globe', label: 'Globe', icon: Globe },
                    { id: 'building', label: 'Building', icon: Building },
                    { id: 'trending', label: 'Trending', icon: TrendingUp },
                  ].map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => onUpdateBrand({ ...design.brand, logoIcon: id })}
                      className={`p-2.5 rounded-xl border transition ${
                        design.brand.logoIcon === id
                          ? 'bg-slate-800 border-cyan-400 text-cyan-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Texts with Individual On/Off Switches */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Outlet Name</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400 font-semibold">
                    <input
                      type="checkbox"
                      checked={design.brand.showOutletName}
                      onChange={(e) =>
                        onUpdateBrand({ ...design.brand, showOutletName: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <span>{design.brand.showOutletName ? 'Show' : 'Hide'}</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={design.brand.outletName}
                  disabled={!design.brand.showOutletName}
                  onChange={(e) =>
                    onUpdateBrand({ ...design.brand, outletName: e.target.value })
                  }
                  placeholder="e.g. WARDIERE"
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-bold disabled:opacity-30"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Category Tag</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400 font-semibold">
                    <input
                      type="checkbox"
                      checked={design.brand.showSubName}
                      onChange={(e) =>
                        onUpdateBrand({ ...design.brand, showSubName: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <span>{design.brand.showSubName ? 'Show' : 'Hide'}</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={design.brand.subName || ''}
                  disabled={!design.brand.showSubName}
                  onChange={(e) =>
                    onUpdateBrand({ ...design.brand, subName: e.target.value })
                  }
                  placeholder="e.g. NEWS"
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 disabled:opacity-30"
                />
              </div>
            </div>

            {/* Position */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Header Position</span>
              <select
                value={design.brand.position}
                onChange={(e) =>
                  onUpdateBrand({
                    ...design.brand,
                    position: e.target.value as BrandConfig['position'],
                  })
                }
                className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
              >
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">Logo & brand header is currently hidden</p>
        )}
      </div>

      {/* 2. BREAKING NEWS BADGE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <h3 className="font-bold text-sm text-slate-100">Breaking News Badge</h3>
          </div>
          <button
            onClick={() => onUpdateBadge({ ...design.badge, show: !design.badge.show })}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              design.badge.show
                ? 'bg-red-950 text-red-400 border border-red-800/60'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {design.badge.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.badge.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.badge.show ? (
          <div className="space-y-3.5 animate-fadeIn">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400">Badge Text</label>
              <input
                type="text"
                value={design.badge.text}
                onChange={(e) =>
                  onUpdateBadge({ ...design.badge, text: e.target.value })
                }
                placeholder="e.g. BREAKING NEWS"
                className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white uppercase font-bold focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Badge Design</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'red-rectangle', label: 'Red Box' },
                  { id: 'red-angled', label: 'Angled Ribbon' },
                  { id: 'yellow-marker', label: 'Yellow Marker' },
                  { id: 'striped-red', label: 'Striped Red' },
                  { id: 'outline-minimal', label: 'Outline' },
                  { id: 'dark-pill', label: 'Dark Sleek' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() =>
                      onUpdateBadge({
                        ...design.badge,
                        style: style.id as BadgeStyle,
                      })
                    }
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition ${
                      design.badge.style === style.id
                        ? 'bg-slate-800 border-red-500 text-red-400 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={design.badge.showLiveDot}
                  onChange={(e) =>
                    onUpdateBadge({
                      ...design.badge,
                      showLiveDot: e.target.checked,
                    })
                  }
                  className="rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-0"
                />
                <span>Pulsing Live Dot</span>
              </label>

              <select
                value={design.badge.position}
                onChange={(e) =>
                  onUpdateBadge({
                    ...design.badge,
                    position: e.target.value as BadgeConfig['position'],
                  })
                }
                className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300"
              >
                <option value="above-headline">Above Headline</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">Breaking news badge is currently hidden</p>
        )}
      </div>

      {/* 3. FOOTER & URL */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-100">Footer Bar & URL</h3>
          </div>
          <button
            onClick={() => onUpdateFooter({ ...design.footer, show: !design.footer.show })}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition ${
              design.footer.show
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {design.footer.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.footer.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.footer.show ? (
          <div className="space-y-3 animate-fadeIn text-xs">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Website URL</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400 font-semibold">
                    <input
                      type="checkbox"
                      checked={design.footer.showWebsite}
                      onChange={(e) =>
                        onUpdateFooter({ ...design.footer, showWebsite: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <span>{design.footer.showWebsite ? 'Show' : 'Hide'}</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={design.footer.websiteUrl}
                  disabled={!design.footer.showWebsite}
                  onChange={(e) =>
                    onUpdateFooter({ ...design.footer, websiteUrl: e.target.value })
                  }
                  placeholder="reallygreatsite.com"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white disabled:opacity-30"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>CTA Action</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400 font-semibold">
                    <input
                      type="checkbox"
                      checked={design.footer.showCta}
                      onChange={(e) =>
                        onUpdateFooter({ ...design.footer, showCta: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <span>{design.footer.showCta ? 'Show' : 'Hide'}</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={design.footer.ctaText}
                  disabled={!design.footer.showCta}
                  onChange={(e) =>
                    onUpdateFooter({ ...design.footer, ctaText: e.target.value })
                  }
                  placeholder="e.g. READ MORE →"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white disabled:opacity-30"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400">CTA Style:</span>
              <select
                value={design.footer.ctaStyle}
                onChange={(e) =>
                  onUpdateFooter({
                    ...design.footer,
                    ctaStyle: e.target.value as FooterConfig['ctaStyle'],
                  })
                }
                className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300"
              >
                <option value="none">Text Link</option>
                <option value="button">Solid Pill Button</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">Footer bar is currently hidden</p>
        )}
      </div>
    </div>
  );
};
