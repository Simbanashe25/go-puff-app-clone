import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GOPUFF_COLORS, GOPUFF_FONTS, GOPUFF_SIZES, GOPUFF_SPACING } from '../constants/theme';

const CUSTOM_ICONS = {
  search: require('../../assets/icons/search (4).svg'),
  bag: require('../../assets/icons/shopping-bag (3).svg'),
  account: require('../../assets/icons/circle-user (3).svg'),
};

interface Props {
  active: 'home' | 'categories' | 'search' | 'bag' | 'account';
  cartCount: number;
  onHome: () => void;
  onCategories: () => void;
  onSearch: () => void;
  onBag: () => void;
  onAccount: () => void;
}

const items = [
  { key: 'home' as const, label: 'HOME', icon: 'home' as const },
  { key: 'categories' as const, label: 'SHOP', icon: 'grid' as const },
  { key: 'search' as const, label: 'SEARCH' },
  { key: 'bag' as const, label: 'BAG' },
  { key: 'account' as const, label: 'ACCOUNT' },
];

export const MobileBottomNav: React.FC<Props> = ({
  active,
  cartCount,
  onHome,
  onCategories,
  onSearch,
  onBag,
  onAccount,
}) => {
  const { width } = useWindowDimensions();
  if (width >= GOPUFF_SIZES.desktopBreakpoint) return null;
  const handlers = { home: onHome, categories: onCategories, search: onSearch, bag: onBag, account: onAccount };

  return (
    <View style={styles.bar}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.item}
          onPress={handlers[item.key]}
          accessibilityLabel={item.label}
        >
          <View>
            {item.key === 'search' || item.key === 'bag' || item.key === 'account' ? (
              <Image
                source={CUSTOM_ICONS[item.key]}
                style={[
                  styles.customIcon,
                  { tintColor: active === item.key ? GOPUFF_COLORS.action : GOPUFF_COLORS.grayText },
                ]}
              />
            ) : (
              <Feather
                name={item.icon}
                size={21}
                color={active === item.key ? GOPUFF_COLORS.action : GOPUFF_COLORS.grayText}
              />
            )}
            {item.key === 'bag' && cartCount > 0 && (
              <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>
            )}
          </View>
          <Text style={[styles.label, active === item.key && styles.activeLabel]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 68,
    paddingHorizontal: GOPUFF_SPACING.sm,
    paddingBottom: GOPUFF_SPACING.xs,
    backgroundColor: GOPUFF_COLORS.white,
    borderTopWidth: 1,
    borderTopColor: GOPUFF_COLORS.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    ...({ position: 'fixed' } as any),
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  customIcon: { width: 21, height: 21 },
  label: { fontFamily: GOPUFF_FONTS.bold, fontSize: 9, color: GOPUFF_COLORS.grayText },
  activeLabel: { color: GOPUFF_COLORS.action, fontWeight: '900' },
  badge: { position: 'absolute', top: -8, right: -10, minWidth: 17, height: 17, borderRadius: 9, paddingHorizontal: 3, backgroundColor: GOPUFF_COLORS.action, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontFamily: GOPUFF_FONTS.black, fontSize: 10, color: GOPUFF_COLORS.white, textAlign: 'center' },
});
