import { Platform } from 'react-native';

export const GOPUFF_COLORS = {
  primary: '#8000FF',
  primaryHover: '#6A00D9',
  action: '#8000FF',
  actionHover: '#5A00B8',
  success: '#00875A',
  discount: '#4BE39A',
  promoYellow: '#FFF0B3',
  infoBackground: '#8000FF',
  selectedBackground: '#8000FF',
  black: '#111111',
  dark: '#222222',
  grayText: '#666666',
  placeholder: '#757575',
  mutedText: '#777777',
  border: '#D1D5DB',
  borderLight: '#E5E7EB',
  borderDark: '#222222',
  background: '#FFFFFF',
  white: '#FFFFFF',
  surface: '#FFFFFF',
  pageBackground: '#FAFAFA',
  hoverGray: '#F9FAFB',
  overlay: 'rgba(0, 0, 0, 0.68)',
};

export const GOPUFF_SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  section: 48,
};

export const GOPUFF_RADII = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 9999,
};

export const GOPUFF_SIZES = {
  desktopBreakpoint: 768,
  mobileBreakpoint: 600,
  controlHeight: 52,
  compactControlHeight: 44,
  largeControlHeight: 56,
  productCardWidth: 160,
  productCardHeight: 270,
};

export const GOPUFF_SHADOWS = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 32,
    elevation: 12,
  },
};

const gintoFamily = Platform.select({
  web: 'ABCGinto, system-ui, -apple-system, sans-serif',
  ios: 'ABCGintoNormal-Regular',
  android: 'ABCGintoNormal-Regular',
  default: 'ABCGinto',
}) as string;

export const GOPUFF_FONTS = {
  // ABC Ginto font family across all platforms
  family: gintoFamily,
  system: gintoFamily,
  regular: Platform.select({
    web: 'ABCGinto',
    default: 'ABCGintoNormal-Regular',
  }) as string,
  medium: Platform.select({
    web: 'ABCGinto',
    default: 'ABCGintoNormal-Medium',
  }) as string,
  bold: Platform.select({
    web: 'ABCGinto',
    default: 'ABCGintoNormal-Bold',
  }) as string,
  black: Platform.select({
    web: 'ABCGinto',
    default: 'ABCGintoNormal-Black',
  }) as string,
};
