export type AspectRatio = '1:1' | '4:5' | '9:16' | '16:9';

export interface AspectRatioConfig {
  id: AspectRatio;
  label: string;
  width: number;
  height: number;
  description: string;
}

export interface WordOverride {
  index: number; // word index in the text (0-based)
  word: string; // original word
  color?: string; // custom text color
  backgroundColor?: string; // marker highlight color (e.g. #facc15 yellow)
  fontSize?: number; // optional custom size for this word
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isUppercase?: boolean;
}

export type ContainerStyle = 
  | 'none' // full bleed image with text overlay
  | 'bottom-dark-card' // semi-transparent dark frosted card at bottom
  | 'bottom-light-card' // floating white modern card at bottom
  | 'bottom-red-card' // solid red container like the fire news
  | 'side-split' // half photo on left, clean white editorial on right
  | 'frame-inset' // red/dark outer frame with image inset inside
  | 'center-box'; // frosted box in center

export type BadgeStyle = 
  | 'red-rectangle' // solid red box with bold text
  | 'red-angled' // angled / skewed red banner
  | 'yellow-marker' // bright yellow marker badge
  | 'dark-pill' // dark sleek badge
  | 'outline-minimal' // thin border outline
  | 'striped-red' // red with diagonal slashes
  | 'none';

export interface BadgeConfig {
  show: boolean;
  text: string;
  style: BadgeStyle;
  textColor: string;
  backgroundColor: string;
  showLiveDot: boolean;
  position: 'top-left' | 'top-right' | 'above-headline' | 'center-top';
}

export interface TextBorderConfig {
  show: boolean;
  color: string;
  width: number;
  style: 'solid' | 'dashed' | 'left-accent' | 'top-bottom' | 'none';
  radius: number;
  padding: number;
  backgroundColor?: string;
}

export interface TextBlockConfig {
  show: boolean;
  text: string;
  fontFamily: string;
  fontSize: number; // base size in px (scaled for canvas)
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number; // in px
  color: string;
  textAlign: 'left' | 'center' | 'right';
  textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  shadow: boolean;
  border?: TextBorderConfig;
  wordOverrides: Record<number, WordOverride>; // word index -> styling
}

export interface BrandConfig {
  show: boolean;
  logoType: 'image' | 'icon' | 'text-only' | 'none';
  customLogoUrl?: string; // uploaded image logo
  logoIcon?: string; // 'newspaper' | 'flame' | 'radio' | 'globe' | 'building' | 'trending'
  logoSize: number; // in pixels (e.g. 28)
  outletName: string;
  showOutletName: boolean;
  subName?: string;
  showSubName: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left';
  color: string;
  accentColor: string;
}

export interface FooterConfig {
  show: boolean;
  sourceText: string;
  showSource: boolean;
  ctaText: string; // e.g. "READ MORE ->" or "Learn more"
  showCta: boolean;
  ctaStyle: 'button' | 'link' | 'none';
  websiteUrl: string;
  showWebsite: boolean;
  dateText: string;
  showDate: boolean;
  color: string;
}

export interface BackgroundConfig {
  imageUrl: string;
  zoom: number; // 100 is default (100% to 200%)
  positionX: number; // 0 to 100%
  positionY: number; // 0 to 100%
  brightness: number; // 20 to 150
  contrast: number; // 50 to 150
  saturation: number; // 0 to 200
  grayscale: number; // 0 to 100
  blur: number; // 0 to 20px
  // Overlays
  overlayType: 'linear-bottom' | 'linear-top' | 'linear-full' | 'radial-vignette' | 'angled-split' | 'duotone' | 'none';
  overlayColor: string; // e.g. '#000000'
  overlayOpacity: number; // 0 to 100
  vignetteStrength: number; // 0 to 100
  duotonePrimary?: string;
  duotoneSecondary?: string;
}

export interface PostDesign {
  id: string;
  title: string;
  aspectRatio: AspectRatio;
  containerStyle: ContainerStyle;
  background: BackgroundConfig;
  brand: BrandConfig;
  badge: BadgeConfig;
  headline: TextBlockConfig;
  subheadline: TextBlockConfig;
  kicker: TextBlockConfig;
  footer: FooterConfig;
  accentColor: string;
  // Layout positioning
  contentAlignment: 'bottom' | 'center' | 'top' | 'split-right';
  padding: number; // canvas edge padding
}

export interface StockImage {
  id: string;
  label: string;
  category: 'Disaster & Fire' | 'Politics & Protest' | 'Economy & City' | 'Nature & Aurora' | 'Tech & Business' | 'Minimalist';
  url: string;
  thumbnail: string;
  alt: string;
}
