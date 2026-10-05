import React, { useRef } from 'react';
import {
  PostDesign,
  ContainerStyle,
  BadgeStyle,
  BrandConfig,
  FooterConfig,
  BadgeConfig,
} from '../types';
import {
  Layout,
  Radio,
  Newspaper,
  Flame,
  Globe,
  Building,
  TrendingUp,
  ShieldAlert,
  Upload,
  Trash2,
  Image as ImageIcon,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';

interface LayoutAndBadgesInspectorProps {
  design: PostDesign;
  onUpdateContainer: (containerStyle: ContainerStyle) => void;
  onUpdateBadge: (badge: BadgeConfig) => void;
  onUpdateBrand: (brand: BrandConfig) => void;
  onUpdateFooter: (footer: FooterConfig) => void;
}

export const LayoutAndBadgesInspector: React.FC<LayoutAndBadgesInspectorProps> = ({
  design,
  onUpdateContainer,
  onUpdateBadge,
  onUpdateBrand,
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
    <div className="space-y-6">
      {/* SECTION 1: LOGO & BRAND (Can disable or replace with own image) */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-neutral-100">Logo & Brand Header</h3>
          </div>
          {/* Main Enable/Disable Toggle */}
          <button
            onClick={() => onUpdateBrand({ ...design.brand, show: !design.brand.show })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
              design.brand.show
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/60'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
            }`}
          >
            {design.brand.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.brand.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.brand.show ? (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Logo Mode Selection: Custom Image vs Icon vs Text Only */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Logo Graphic Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdateBrand({ ...design.brand, logoType: 'image' })}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition flex items-center justify-center gap-1.5 ${
                    design.brand.logoType === 'image'
                      ? 'bg-neutral-800 border-cyan-400 text-cyan-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Custom Image</span>
                </button>
                <button
                  onClick={() => onUpdateBrand({ ...design.brand, logoType: 'icon' })}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition ${
                    design.brand.logoType === 'icon'
                      ? 'bg-neutral-800 border-cyan-400 text-cyan-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Preset Icon
                </button>
                <button
                  onClick={() => onUpdateBrand({ ...design.brand, logoType: 'text-only' })}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition ${
                    design.brand.logoType === 'text-only'
                      ? 'bg-neutral-800 border-cyan-400 text-cyan-300'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Text Only
                </button>
              </div>
            </div>

            {/* Custom Logo Image Upload Area */}
            {design.brand.logoType === 'image' && (
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-300">Upload Your Own Logo (PNG / SVG)</span>
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
                    <div className="w-14 h-14 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                      <img
                        src={design.brand.customLogoUrl}
                        alt="Uploaded logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-neutral-900 border border-dashed border-neutral-700 flex items-center justify-center text-neutral-500 shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="w-full py-1.5 px-3 rounded-lg bg-neutral-850 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition"
                    >
                      <Upload className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{design.brand.customLogoUrl ? 'Replace Logo Image' : 'Select Image File'}</span>
                    </button>
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <p className="text-[10px] text-neutral-500">Transparent PNG or SVG recommended</p>
                  </div>
                </div>

                {/* Logo Size Slider */}
                <div className="pt-2 border-t border-neutral-850 space-y-1">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Logo Size</span>
                    <span className="text-neutral-200 font-mono">{design.brand.logoSize || 28}px</span>
                  </div>
                  <input
                    type="range"
                    min={16}
                    max={56}
                    value={design.brand.logoSize || 28}
                    onChange={(e) =>
                      onUpdateBrand({ ...design.brand, logoSize: Number(e.target.value) })
                    }
                    className="w-full accent-cyan-400 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Icon Picker (if icon mode) */}
            {design.brand.logoType === 'icon' && (
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400">Choose Icon</label>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'newspaper', label: 'News', icon: Newspaper },
                    { id: 'flame', label: 'Flame', icon: Flame },
                    { id: 'radio', label: 'Broadcast', icon: Radio },
                    { id: 'globe', label: 'Globe', icon: Globe },
                    { id: 'building', label: 'Company', icon: Building },
                    { id: 'trending', label: 'Trending', icon: TrendingUp },
                  ].map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => onUpdateBrand({ ...design.brand, logoIcon: id })}
                      className={`p-2 rounded-lg border transition ${
                        design.brand.logoIcon === id
                          ? 'bg-neutral-800 border-cyan-400 text-cyan-400'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Texts (Primary + Subtitle) with Individual On/Off Toggles */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Outlet Name</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400 flex items-center gap-1">
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
                  className="w-full px-2.5 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white font-bold disabled:opacity-40"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Category Tag</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400 flex items-center gap-1">
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
                  className="w-full px-2.5 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-neutral-300 disabled:opacity-40"
                />
              </div>
            </div>

            {/* Position */}
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
              <span>Header Position</span>
              <select
                value={design.brand.position}
                onChange={(e) =>
                  onUpdateBrand({
                    ...design.brand,
                    position: e.target.value as BrandConfig['position'],
                  })
                }
                className="px-2 py-1 text-xs bg-neutral-950 border border-neutral-800 rounded text-neutral-200"
              >
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 italic">Logo & brand header is currently hidden</p>
        )}
      </div>

      {/* SECTION 2: BREAKING BADGE (Can toggle on/off & edit) */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <h3 className="font-bold text-sm text-neutral-100">Breaking News Badge</h3>
          </div>
          <button
            onClick={() => onUpdateBadge({ ...design.badge, show: !design.badge.show })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
              design.badge.show
                ? 'bg-red-950 text-red-400 border border-red-800/60'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
            }`}
          >
            {design.badge.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.badge.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.badge.show ? (
          <div className="space-y-3 animate-fadeIn">
            {/* Badge Text */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-400">Badge Text</label>
              <input
                type="text"
                value={design.badge.text}
                onChange={(e) =>
                  onUpdateBadge({ ...design.badge, text: e.target.value })
                }
                placeholder="e.g. BREAKING NEWS"
                className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white uppercase font-bold focus:outline-hidden focus:border-red-500"
              />
            </div>

            {/* Badge Styles */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Badge Style</label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
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
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition ${
                      design.badge.style === style.id
                        ? 'bg-neutral-800 border-red-500 text-red-400'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Indicator Dot & Placement */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={design.badge.showLiveDot}
                  onChange={(e) =>
                    onUpdateBadge({
                      ...design.badge,
                      showLiveDot: e.target.checked,
                    })
                  }
                  className="rounded bg-neutral-800 border-neutral-700 text-red-600 focus:ring-0"
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
                className="px-2 py-1 text-xs bg-neutral-950 border border-neutral-800 rounded text-neutral-300"
              >
                <option value="above-headline">Above Headline</option>
                <option value="top-left">Top Left of Card</option>
                <option value="top-right">Top Right of Card</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 italic">Breaking news badge is currently hidden</p>
        )}
      </div>

      {/* SECTION 3: FOOTER & CTA (Can toggle on/off & edit individual components) */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-100">Footer & Website URL</h3>
          </div>
          <button
            onClick={() => onUpdateFooter({ ...design.footer, show: !design.footer.show })}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
              design.footer.show
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
            }`}
          >
            {design.footer.show ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{design.footer.show ? 'Enabled' : 'Disabled'}</span>
          </button>
        </div>

        {design.footer.show ? (
          <div className="space-y-3 animate-fadeIn text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Website URL</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400">
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
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-white disabled:opacity-40"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>CTA Action</span>
                  <label className="cursor-pointer text-[10px] text-cyan-400">
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
                  className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-white disabled:opacity-40"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-neutral-400">CTA Button Styling:</span>
              <select
                value={design.footer.ctaStyle}
                onChange={(e) =>
                  onUpdateFooter({
                    ...design.footer,
                    ctaStyle: e.target.value as FooterConfig['ctaStyle'],
                  })
                }
                className="px-2 py-1 text-xs bg-neutral-950 border border-neutral-800 rounded text-neutral-300"
              >
                <option value="none">Text Link</option>
                <option value="button">Solid Pill Button</option>
              </select>
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-500 italic">Footer bar is currently hidden</p>
        )}
      </div>

      {/* SECTION 4: CONTAINER LAYOUT */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-neutral-100">Card Layout Style</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { id: 'none', label: 'Full Bleed Overlay', desc: 'Direct image with fade' },
            { id: 'bottom-dark-card', label: 'Dark Frosted Card', desc: 'Glass panel at bottom' },
            { id: 'bottom-light-card', label: 'Floating White Card', desc: 'Crisp white container' },
            { id: 'bottom-red-card', label: 'Red News Block', desc: 'Solid red lower card' },
            { id: 'side-split', label: 'Editorial Split', desc: 'Side-by-side photo & text' },
            { id: 'frame-inset', label: 'Hero Frame Inset', desc: 'Outer frame with cutout' },
            { id: 'center-box', label: 'Center Frosted Box', desc: 'Floating center block' },
          ].map((layout) => (
            <button
              key={layout.id}
              onClick={() => onUpdateContainer(layout.id as ContainerStyle)}
              className={`p-2 rounded-lg border text-left transition ${
                design.containerStyle === layout.id
                  ? 'bg-neutral-850 border-cyan-400 text-white ring-1 ring-cyan-400'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <div className="font-semibold text-xs">{layout.label}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5 leading-tight">
                {layout.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
