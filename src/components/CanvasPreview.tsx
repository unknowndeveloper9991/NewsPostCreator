import React from 'react';
import { PostDesign, WordOverride, TextBorderConfig } from '../types';
import { tokenizeText } from '../utils/textUtils';
import {
  Flame,
  Globe,
  Radio,
  Building,
  Newspaper,
  TrendingUp,
} from 'lucide-react';

interface CanvasPreviewProps {
  design: PostDesign;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  activeElement?: string | null;
  onSelectElement?: (elementId: string) => void;
  showGuides?: boolean;
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  design,
  canvasRef,
  activeElement,
  onSelectElement,
  showGuides = false,
}) => {
  // Determine aspect ratio class or style
  const getAspectRatioPadding = () => {
    switch (design.aspectRatio) {
      case '1:1':
        return 'aspect-square';
      case '4:5':
        return 'aspect-[4/5]';
      case '9:16':
        return 'aspect-[9/16]';
      case '16:9':
        return 'aspect-[16/9]';
      default:
        return 'aspect-square';
    }
  };

  // Helper to render logo (custom image or icon)
  const renderBrandLogo = () => {
    if (design.brand.logoType === 'none' || design.brand.logoType === 'text-only') {
      return null;
    }

    if (design.brand.logoType === 'image' && design.brand.customLogoUrl) {
      return (
        <img
          src={design.brand.customLogoUrl}
          alt="Custom Logo"
          style={{
            height: `${design.brand.logoSize || 28}px`,
            maxWidth: '120px',
          }}
          className="object-contain rounded-xs"
        />
      );
    }

    // Default icon
    const size = `${design.brand.logoSize || 24}px`;
    switch (design.brand.logoIcon) {
      case 'flame':
        return <Flame style={{ width: size, height: size }} className="text-red-500 fill-current" />;
      case 'radio':
        return <Radio style={{ width: size, height: size }} className="text-red-500 animate-pulse" />;
      case 'globe':
        return <Globe style={{ width: size, height: size }} className="text-cyan-400" />;
      case 'building':
        return <Building style={{ width: size, height: size }} className="text-neutral-300" />;
      case 'trending':
        return <TrendingUp style={{ width: size, height: size }} className="text-emerald-400" />;
      case 'newspaper':
      default:
        return <Newspaper style={{ width: size, height: size }} className="text-white/90" />;
    }
  };

  // Render badge with specific aesthetic styles
  const renderBadge = () => {
    if (!design.badge.show || !design.badge.text) return null;

    const baseClasses = 'inline-flex items-center gap-1.5 font-bold tracking-wider uppercase text-xs px-2.5 py-1 select-none cursor-pointer';

    switch (design.badge.style) {
      case 'red-angled':
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.('badge');
            }}
            style={{
              backgroundColor: design.badge.backgroundColor || '#ef4444',
              color: design.badge.textColor || '#ffffff',
            }}
            className={`${baseClasses} transform -skew-x-12 shadow-lg rounded-sm ${
              showGuides && activeElement === 'badge' ? 'outline-2 outline-cyan-400 outline-dashed' : ''
            }`}
          >
            <div className="transform skew-x-12 flex items-center gap-1.5">
              {design.badge.showLiveDot && (
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              )}
              {design.badge.text}
            </div>
          </div>
        );

      case 'striped-red':
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.('badge');
            }}
            style={{
              backgroundColor: design.badge.backgroundColor || '#b91c1c',
              color: design.badge.textColor || '#ffffff',
            }}
            className={`${baseClasses} relative shadow-md rounded-sm overflow-hidden ${
              showGuides && activeElement === 'badge' ? 'outline-2 outline-cyan-400 outline-dashed' : ''
            }`}
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/20 skew-x-12" />
            <div className="flex items-center gap-1.5 z-10">
              {design.badge.showLiveDot && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
              {design.badge.text}
            </div>
          </div>
        );

      case 'yellow-marker':
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.('badge');
            }}
            style={{
              backgroundColor: design.badge.backgroundColor || '#facc15',
              color: design.badge.textColor || '#000000',
            }}
            className={`${baseClasses} font-black text-black shadow-md rounded-none ${
              showGuides && activeElement === 'badge' ? 'outline-2 outline-cyan-400 outline-dashed' : ''
            }`}
          >
            {design.badge.text}
          </div>
        );

      case 'outline-minimal':
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.('badge');
            }}
            style={{
              borderColor: design.badge.backgroundColor || '#ffffff',
              color: design.badge.textColor || '#ffffff',
            }}
            className={`${baseClasses} border font-semibold tracking-widest bg-black/40 backdrop-blur-xs rounded-sm ${
              showGuides && activeElement === 'badge' ? 'outline-2 outline-cyan-400 outline-dashed' : ''
            }`}
          >
            {design.badge.text}
          </div>
        );

      case 'dark-pill':
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.('badge');
            }}
            style={{
              backgroundColor: '#18181b',
              color: '#ffffff',
            }}
            className={`${baseClasses} rounded-md border border-neutral-700/80 shadow-md ${
              showGuides && activeElement === 'badge' ? 'outline-2 outline-cyan-400 outline-dashed' : ''
            }`}
          >
            {design.badge.text}
          </div>
        );

      case 'red-rectangle':
      default:
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectElement?.('badge');
            }}
            style={{
              backgroundColor: design.badge.backgroundColor || '#dc2626',
              color: design.badge.textColor || '#ffffff',
            }}
            className={`${baseClasses} shadow-md rounded-xs ${
              showGuides && activeElement === 'badge' ? 'outline-2 outline-cyan-400 outline-dashed' : ''
            }`}
          >
            {design.badge.showLiveDot && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
            {design.badge.text}
          </div>
        );
    }
  };

  // Helper to compute user's custom headline border style
  const getHeadlineCustomBorderStyle = (border?: TextBorderConfig): React.CSSProperties => {
    if (!border || !border.show || border.style === 'none') {
      return {};
    }

    const width = border.width || 2;
    const color = border.color || '#06b6d4';
    const radius = border.radius !== undefined ? border.radius : 4;
    const padding = border.padding !== undefined ? border.padding : 8;
    const bg = border.backgroundColor || 'transparent';

    switch (border.style) {
      case 'left-accent':
        return {
          borderLeft: `${Math.max(3, width * 2)}px solid ${color}`,
          paddingLeft: `${Math.max(8, padding)}px`,
          backgroundColor: bg,
        };
      case 'top-bottom':
        return {
          borderTop: `${width}px solid ${color}`,
          borderBottom: `${width}px solid ${color}`,
          paddingTop: `${padding}px`,
          paddingBottom: `${padding}px`,
          backgroundColor: bg,
        };
      case 'dashed':
        return {
          border: `${width}px dashed ${color}`,
          borderRadius: `${radius}px`,
          padding: `${padding}px`,
          backgroundColor: bg,
        };
      case 'solid':
      default:
        return {
          border: `${width}px solid ${color}`,
          borderRadius: `${radius}px`,
          padding: `${padding}px`,
          backgroundColor: bg,
        };
    }
  };

  // Helper to render headline words with word-level overrides
  const renderFormattedWords = (
    text: string,
    overrides: Record<number, WordOverride> = {},
    baseColor: string
  ) => {
    const tokens = tokenizeText(text, overrides);
    return tokens.map((token, i) => {
      const override = token.override;
      const wordColor = override?.color || baseColor;
      const hasBg = !!override?.backgroundColor;

      return (
        <span
          key={i}
          style={{
            color: hasBg ? (override?.color || '#000000') : wordColor,
            backgroundColor: override?.backgroundColor || undefined,
            fontWeight: override?.isBold ? 900 : undefined,
            fontStyle: override?.isItalic ? 'italic' : undefined,
            textDecoration: override?.isUnderline ? 'underline' : undefined,
          }}
          className={`inline-block transition-colors ${
            hasBg
              ? 'px-1.5 py-0.5 my-0.5 rounded-xs box-decoration-clone leading-tight font-black mx-0.5'
              : ''
          }`}
        >
          {token.word}&nbsp;
        </span>
      );
    });
  };

  // Determine overlay style
  const getOverlayStyle = () => {
    const opacity = design.background.overlayOpacity / 100;
    const color = design.background.overlayColor || '#000000';

    switch (design.background.overlayType) {
      case 'linear-bottom':
        return {
          background: `linear-gradient(to top, ${color} 0%, ${color}CC 45%, ${color}33 75%, transparent 100%)`,
          opacity,
        };
      case 'linear-top':
        return {
          background: `linear-gradient(to bottom, ${color} 0%, ${color}CC 45%, transparent 100%)`,
          opacity,
        };
      case 'linear-full':
        return {
          backgroundColor: color,
          opacity,
        };
      case 'radial-vignette':
        return {
          background: `radial-gradient(circle at center, transparent 30%, ${color} 100%)`,
          opacity: (design.background.vignetteStrength || 60) / 100,
        };
      case 'angled-split':
        return {
          background: `linear-gradient(135deg, ${color} 0%, transparent 60%)`,
          opacity,
        };
      case 'duotone':
        return {
          background: `linear-gradient(45deg, ${design.accentColor}66, #000000CC)`,
          opacity,
        };
      case 'none':
      default:
        return { display: 'none' };
    }
  };

  // Render Layout Containers
  const isSideSplit = design.containerStyle === 'side-split';
  const isFrameInset = design.containerStyle === 'frame-inset';
  const isBottomDarkCard = design.containerStyle === 'bottom-dark-card';
  const isBottomLightCard = design.containerStyle === 'bottom-light-card';
  const isBottomRedCard = design.containerStyle === 'bottom-red-card';
  const isCenterBox = design.containerStyle === 'center-box';

  const headlineBorderStyle = getHeadlineCustomBorderStyle(design.headline.border);

  return (
    <div className="w-full flex items-center justify-center p-2 select-none">
      {/* Target Canvas DOM Element */}
      <div
        ref={canvasRef}
        id="exportable-post-canvas"
        style={{
          backgroundColor: isFrameInset ? '#dc2626' : '#09090b',
        }}
        className={`relative w-full max-w-[620px] ${getAspectRatioPadding()} overflow-hidden shadow-2xl rounded-xl transition-all duration-300 flex flex-col`}
      >
        {/* SIDE SPLIT LAYOUT */}
        {isSideSplit ? (
          <div className="w-full h-full flex flex-row bg-white text-neutral-900">
            {/* Left Photo */}
            <div
              onClick={() => onSelectElement?.('background')}
              className="w-5/12 h-full relative overflow-hidden cursor-pointer group"
            >
              <img
                src={design.background.imageUrl}
                alt="Background"
                style={{
                  filter: `brightness(${design.background.brightness}%) contrast(${design.background.contrast}%) saturate(${design.background.saturation}%) grayscale(${design.background.grayscale}%) blur(${design.background.blur}px)`,
                  transform: `scale(${design.background.zoom / 100})`,
                  objectPosition: `${design.background.positionX}% ${design.background.positionY}%`,
                }}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>

            {/* Right Editorial Container */}
            <div className="w-7/12 h-full p-8 flex flex-col justify-between relative bg-white">
              {/* Brand Top */}
              {design.brand.show && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement?.('brand');
                  }}
                  className="flex items-center justify-between pb-3 border-b border-neutral-200 cursor-pointer rounded-xs p-1"
                >
                  <div className="flex flex-col">
                    {design.brand.showOutletName && (
                      <span
                        style={{ color: design.brand.color || '#18181b' }}
                        className="font-black text-sm tracking-wider uppercase font-sans"
                      >
                        {design.brand.outletName}
                      </span>
                    )}
                    {design.brand.showSubName && design.brand.subName && (
                      <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest">
                        {design.brand.subName}
                      </span>
                    )}
                  </div>
                  {renderBrandLogo()}
                </div>
              )}

              {/* Middle Headline Area */}
              <div className="my-auto space-y-3">
                {renderBadge()}

                {design.headline.show && (
                  <h1
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.('headline');
                    }}
                    style={{
                      fontFamily: design.headline.fontFamily,
                      fontSize: `${Math.max(18, Math.round(design.headline.fontSize * 0.60))}px`,
                      fontWeight: design.headline.fontWeight,
                      lineHeight: design.headline.lineHeight,
                      letterSpacing: `${design.headline.letterSpacing}px`,
                      textAlign: design.headline.textAlign,
                      textTransform: design.headline.textTransform,
                      ...headlineBorderStyle,
                    }}
                    className="transition-all cursor-pointer rounded-xs"
                  >
                    {renderFormattedWords(
                      design.headline.text,
                      design.headline.wordOverrides,
                      design.headline.color
                    )}
                  </h1>
                )}

                {design.subheadline.show && design.subheadline.text && (
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.('subheadline');
                    }}
                    style={{
                      fontFamily: design.subheadline.fontFamily,
                      fontSize: `${Math.max(12, Math.round(design.subheadline.fontSize * 0.62))}px`,
                      fontWeight: design.subheadline.fontWeight,
                      lineHeight: design.subheadline.lineHeight,
                      textAlign: design.subheadline.textAlign,
                      color: design.subheadline.color,
                    }}
                    className="leading-relaxed cursor-pointer rounded-xs"
                  >
                    {design.subheadline.text}
                  </p>
                )}
              </div>

              {/* Footer */}
              {design.footer.show && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement?.('footer');
                  }}
                  className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 cursor-pointer"
                >
                  <span>{design.footer.showSource ? design.footer.sourceText : design.footer.showWebsite ? design.footer.websiteUrl : ''}</span>
                  {design.footer.showCta && (
                    <div className="flex items-center gap-1 font-bold text-red-600">
                      <span>{design.footer.ctaText || '>>>'}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : isFrameInset ? (
          /* FRAME INSET LAYOUT (e.g. Burning building hero frame) */
          <div className="w-full h-full p-4 flex flex-col justify-between relative bg-red-600 text-white">
            {/* Top Brand & Outlet */}
            {design.brand.show && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement?.('brand');
                }}
                className="flex items-center justify-between px-2 pt-1 cursor-pointer rounded-xs"
              >
                <div className="flex items-center gap-2">
                  {renderBrandLogo()}
                  {design.brand.showOutletName && (
                    <span className="font-extrabold tracking-widest text-xs uppercase">
                      {design.brand.outletName}
                    </span>
                  )}
                </div>
                {design.brand.showSubName && design.brand.subName && (
                  <span className="text-[10px] text-white/90 font-medium tracking-wider uppercase">
                    {design.brand.subName}
                  </span>
                )}
              </div>
            )}

            {/* Inset Photo Box */}
            <div
              onClick={() => onSelectElement?.('background')}
              className="relative my-2 flex-1 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg bg-black cursor-pointer"
            >
              <img
                src={design.background.imageUrl}
                alt="Background"
                style={{
                  filter: `brightness(${design.background.brightness}%) contrast(${design.background.contrast}%) saturate(${design.background.saturation}%) grayscale(${design.background.grayscale}%) blur(${design.background.blur}px)`,
                  transform: `scale(${design.background.zoom / 100})`,
                  objectPosition: `${design.background.positionX}% ${design.background.positionY}%`,
                }}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div
                style={getOverlayStyle()}
                className="absolute inset-0 pointer-events-none"
              />
            </div>

            {/* Bottom Content Inset Card */}
            <div className="px-2 pb-1 space-y-2">
              {design.badge.show && (
                <div className="flex items-center gap-2">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.('badge');
                    }}
                    className="px-2 py-0.5 rounded-xs bg-white text-red-700 font-black text-xs uppercase cursor-pointer"
                  >
                    {design.badge.text || 'NEWS'}
                  </span>
                </div>
              )}

              {design.headline.show && (
                <h1
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement?.('headline');
                  }}
                  style={{
                    fontFamily: design.headline.fontFamily,
                    fontSize: `${Math.max(20, Math.round(design.headline.fontSize * 0.60))}px`,
                    fontWeight: design.headline.fontWeight,
                    lineHeight: design.headline.lineHeight,
                    letterSpacing: `${design.headline.letterSpacing}px`,
                    textAlign: design.headline.textAlign,
                    textTransform: design.headline.textTransform,
                    ...headlineBorderStyle,
                  }}
                  className="font-bold text-white drop-shadow-md cursor-pointer rounded-xs"
                >
                  {renderFormattedWords(
                    design.headline.text,
                    design.headline.wordOverrides,
                    design.headline.color
                  )}
                </h1>
              )}

              {design.footer.show && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement?.('footer');
                  }}
                  className="pt-1 flex items-center justify-between text-[11px] text-red-100 font-medium cursor-pointer"
                >
                  {design.footer.showWebsite && (
                    <span>{design.footer.websiteUrl || 'WWW.REALLYGREATSITE.COM'}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* STANDARD / DOCKED CARDS / FULL BLEED LAYOUTS */
          <>
            {/* Background Image Layer */}
            <div
              onClick={() => onSelectElement?.('background')}
              className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-900 cursor-pointer"
            >
              <img
                src={design.background.imageUrl}
                alt="Background"
                style={{
                  filter: `brightness(${design.background.brightness}%) contrast(${design.background.contrast}%) saturate(${design.background.saturation}%) grayscale(${design.background.grayscale}%) blur(${design.background.blur}px)`,
                  transform: `scale(${design.background.zoom / 100})`,
                  objectPosition: `${design.background.positionX}% ${design.background.positionY}%`,
                }}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />

              {/* Configurable Overlay (gradient / vignette) */}
              <div
                style={getOverlayStyle()}
                className="absolute inset-0 pointer-events-none transition-all duration-300"
              />

              {/* Radial Vignette (if enabled alongside linear) */}
              {design.background.vignetteStrength > 0 &&
                design.background.overlayType !== 'radial-vignette' && (
                  <div
                    style={{
                      background: `radial-gradient(circle at center, transparent 40%, rgba(0,0,0,${design.background.vignetteStrength / 100}) 100%)`,
                    }}
                    className="absolute inset-0 pointer-events-none"
                  />
                )}
            </div>

            {/* TOP BAR / BRAND HEADER */}
            <div className="relative z-20 w-full p-6 flex items-start justify-between">
              {/* Brand / Logo */}
              {design.brand.show && design.brand.position === 'top-left' && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement?.('brand');
                  }}
                  className="flex items-center gap-2 backdrop-blur-xs bg-black/35 px-2.5 py-1.5 rounded-sm border border-white/10 cursor-pointer transition hover:bg-black/50"
                >
                  {renderBrandLogo()}
                  {(design.brand.showOutletName || design.brand.showSubName) && (
                    <div className="flex flex-col leading-none">
                      {design.brand.showOutletName && (
                        <span
                          style={{ color: design.brand.color }}
                          className="font-extrabold text-xs tracking-wider uppercase"
                        >
                          {design.brand.outletName}
                        </span>
                      )}
                      {design.brand.showSubName && design.brand.subName && (
                        <span
                          style={{ color: design.brand.accentColor }}
                          className="text-[9px] font-bold tracking-widest uppercase mt-0.5"
                        >
                          {design.brand.subName}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Badge if placed top-left or top-right */}
              {design.badge.position === 'top-left' && renderBadge()}

              {design.brand.show && design.brand.position === 'top-right' && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement?.('brand');
                  }}
                  className="flex items-center gap-2 backdrop-blur-xs bg-black/35 px-2.5 py-1.5 rounded-sm border border-white/10 ml-auto cursor-pointer transition hover:bg-black/50"
                >
                  {(design.brand.showOutletName || design.brand.showSubName) && (
                    <div className="flex flex-col text-right leading-none">
                      {design.brand.showOutletName && (
                        <span
                          style={{ color: design.brand.color }}
                          className="font-extrabold text-xs tracking-wider uppercase"
                        >
                          {design.brand.outletName}
                        </span>
                      )}
                      {design.brand.showSubName && design.brand.subName && (
                        <span
                          style={{ color: design.brand.accentColor }}
                          className="text-[9px] font-bold tracking-widest uppercase mt-0.5"
                        >
                          {design.brand.subName}
                        </span>
                      )}
                    </div>
                  )}
                  {renderBrandLogo()}
                </div>
              )}
            </div>

            {/* CENTER BOX CONTAINER (Mask Pandemic geometric style) */}
            {isCenterBox && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectElement?.('headline');
                }}
                className="relative z-20 my-auto mx-8 p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-sm relative shadow-2xl cursor-pointer"
              >
                {/* Red decorative corner squares */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-600" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-600" />

                <div className="space-y-3 text-center">
                  {design.headline.show && (
                    <h1
                      style={{
                        fontFamily: design.headline.fontFamily,
                        fontSize: `${Math.max(20, Math.round(design.headline.fontSize * 0.60))}px`,
                        fontWeight: design.headline.fontWeight,
                        lineHeight: design.headline.lineHeight,
                        textAlign: 'center',
                        ...headlineBorderStyle,
                      }}
                      className="font-bold text-white"
                    >
                      {renderFormattedWords(
                        design.headline.text,
                        design.headline.wordOverrides,
                        design.headline.color
                      )}
                    </h1>
                  )}
                  {design.subheadline.show && design.subheadline.text && (
                    <p
                      style={{
                        fontSize: `${Math.max(12, Math.round(design.subheadline.fontSize * 0.62))}px`,
                      }}
                      className="text-neutral-300 font-light"
                    >
                      {design.subheadline.text}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* BOTTOM / DOCKED CONTENT AREA */}
            {!isCenterBox && (
              <div
                className={`relative z-20 mt-auto w-full transition-all ${
                  isBottomDarkCard
                    ? 'p-6 bg-neutral-950/85 backdrop-blur-xl border-t border-white/15 rounded-t-2xl shadow-2xl'
                    : isBottomLightCard
                    ? 'mx-auto mb-6 w-[90%] p-6 bg-white text-neutral-900 rounded-xl shadow-2xl'
                    : isBottomRedCard
                    ? 'p-6 bg-red-600 text-white rounded-t-xl shadow-2xl'
                    : 'p-8 flex flex-col justify-end'
                }`}
              >
                {/* Badge placed above headline */}
                {design.badge.position === 'above-headline' && (
                  <div className="mb-3">{renderBadge()}</div>
                )}

                {/* Kicker tag (e.g. ECONOMICS / Breaking News Today) */}
                {design.kicker.show && design.kicker.text && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.('kicker');
                    }}
                    style={{
                      fontFamily: design.kicker.fontFamily,
                      fontSize: `${Math.max(12, Math.round(design.kicker.fontSize * 0.65))}px`,
                      fontWeight: design.kicker.fontWeight,
                      letterSpacing: `${design.kicker.letterSpacing}px`,
                      color: isBottomLightCard ? '#dc2626' : design.kicker.color,
                      textAlign: design.kicker.textAlign,
                      textTransform: design.kicker.textTransform,
                    }}
                    className="mb-2 font-bold tracking-widest cursor-pointer rounded-xs inline-block"
                  >
                    {design.kicker.text}
                  </div>
                )}

                {/* Main Headline (NO INVASIVE CYAN RING, custom border applied if enabled) */}
                {design.headline.show && (
                  <h1
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.('headline');
                    }}
                    style={{
                      fontFamily: design.headline.fontFamily,
                      fontSize: `${Math.max(20, Math.round(design.headline.fontSize * 0.60))}px`,
                      fontWeight: design.headline.fontWeight,
                      lineHeight: design.headline.lineHeight,
                      letterSpacing: `${design.headline.letterSpacing}px`,
                      textAlign: design.headline.textAlign,
                      textTransform: design.headline.textTransform,
                      color: isBottomLightCard
                        ? '#09090b'
                        : isBottomRedCard
                        ? '#ffffff'
                        : design.headline.color,
                      ...headlineBorderStyle,
                    }}
                    className={`transition-all cursor-pointer rounded-xs ${
                      design.headline.shadow && !isBottomLightCard
                        ? 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]'
                        : ''
                    }`}
                  >
                    {renderFormattedWords(
                      design.headline.text,
                      design.headline.wordOverrides,
                      isBottomLightCard ? '#09090b' : design.headline.color
                    )}
                  </h1>
                )}

                {/* Subheadline / Deck */}
                {design.subheadline.show && design.subheadline.text && (
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.('subheadline');
                    }}
                    style={{
                      fontFamily: design.subheadline.fontFamily,
                      fontSize: `${Math.max(12, Math.round(design.subheadline.fontSize * 0.62))}px`,
                      fontWeight: design.subheadline.fontWeight,
                      lineHeight: design.subheadline.lineHeight,
                      textAlign: design.subheadline.textAlign,
                      color: isBottomLightCard
                        ? '#52525b'
                        : isBottomRedCard
                        ? '#fee2e2'
                        : design.subheadline.color,
                    }}
                    className="mt-2.5 text-neutral-300 leading-relaxed font-normal cursor-pointer rounded-xs"
                  >
                    {design.subheadline.text}
                  </p>
                )}

                {/* Footer / CTA */}
                {design.footer.show && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement?.('footer');
                    }}
                    className={`mt-4 pt-3 flex items-center justify-between text-xs border-t cursor-pointer rounded-xs ${
                      isBottomLightCard
                        ? 'border-neutral-200 text-neutral-600'
                        : isBottomRedCard
                        ? 'border-red-500/50 text-red-100'
                        : 'border-white/10 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {design.footer.showSource && design.footer.sourceText && (
                        <span>{design.footer.sourceText}</span>
                      )}
                      {design.footer.showWebsite && design.footer.websiteUrl && (
                        <span className="font-semibold text-white/90">
                          {design.footer.websiteUrl}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {design.footer.showCta && design.footer.ctaText && (
                        <span
                          className={`font-bold ${
                            design.footer.ctaStyle === 'button'
                              ? isBottomLightCard
                                ? 'px-3 py-1 bg-neutral-900 text-white rounded text-[11px]'
                                : 'px-3 py-1 bg-red-600 text-white rounded text-[11px] shadow'
                              : 'text-amber-400 flex items-center'
                          }`}
                        >
                          {design.footer.ctaText}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
