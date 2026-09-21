import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GOPUFF_CATEGORIES, CategoryItem } from '../data/categories';
import { Product } from '../data/products';
import { GOPUFF_FONTS } from '../constants/theme';
import { CategoryCircle } from './CategoryCircle';
import { LinearGradient } from 'expo-linear-gradient';
import { HERO_BANNERS_DATA } from '../data/banners';

interface CategoriesSectionProps {
  onSelectCategory?: (category: CategoryItem) => void;
  selectedCategoryId?: string;
  locationName?: string;
  onLocationPress?: () => void;
  onStayTunedPress?: () => void;
  onBannerPress?: (bannerId: string) => void;
  onAddToCart?: (product: Product) => void;
  onProductPress?: (product: Product) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  selectedCategoryId = 'deals',
  locationName = 'SUSSEX',
  onLocationPress,
  onStayTunedPress,
  onBannerPress,
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'deals'>('categories');

  return (
    <View style={styles.container}>
      {/* 1. Sub-nav Header Row matching screenshot */}
      <View style={styles.subHeaderRow}>
        {/* Left Side: "Shop Categories ^" & "Deals v" */}
        <View style={styles.leftNavGroup}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.dropdownButton}
            onPress={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <Text
              style={[
                styles.navButtonText,
                activeTab === 'categories' && styles.navButtonTextActive,
              ]}
            >
              Shop Categories
            </Text>
            <Ionicons
              name={isCategoriesOpen ? 'chevron-up' : 'chevron-down'}
              size={15}
              color="#1E293B"
              style={styles.chevronIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.dropdownButton, styles.dealsButton]}
            onPress={() => setActiveTab(activeTab === 'deals' ? 'categories' : 'deals')}
          >
            <Text
              style={[
                styles.navButtonText,
                activeTab === 'deals' && styles.navButtonTextActive,
              ]}
            >
              Deals
            </Text>
            <Ionicons
              name="chevron-down"
              size={15}
              color="#1E293B"
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Right Side: "(clock) STAY TUNED" • "SUSSEX v" */}
        <View style={styles.rightNavGroup}>
          {/* STAY TUNED Pill Badge */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.stayTunedBadge}
            onPress={onStayTunedPress}
          >
            <Ionicons
              name="time-outline"
              size={17}
              color="#292524"
              style={styles.clockIcon}
            />
            <Text style={styles.stayTunedText}>STAY TUNED</Text>
          </TouchableOpacity>

          {/* Dot Separator */}
          <Text style={styles.dotSeparator}>•</Text>

          {/* Location Selector */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.locationButton}
            onPress={onLocationPress}
          >
            <Text style={styles.locationText}>{locationName}</Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color="#1E293B"
              style={styles.locationChevron}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Horizontal Category Icons Carousel / Strip */}
      {isCategoriesOpen && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
          >
            {GOPUFF_CATEGORIES.map((item, index) => {
              const isSelected = item.id === selectedCategoryId;
              const middleBanner =
                index === Math.floor(GOPUFF_CATEGORIES.length / 2)
                  ? HERO_BANNERS_DATA.carousel[0]
                  : null;
              const finalBanner =
                index === GOPUFF_CATEGORIES.length - 1
                  ? HERO_BANNERS_DATA.bottomCards[0]
                  : null;

              return (
                <React.Fragment key={item.id}>
                  {middleBanner && (
                    <PromoBanner
                      banner={middleBanner}
                      onPress={onBannerPress}
                    />
                  )}
                  {finalBanner && (
                    <PromoBanner
                      banner={finalBanner}
                      onPress={onBannerPress}
                    />
                  )}
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.categoryItem}
                    onPress={() => onSelectCategory && onSelectCategory(item)}
                  >
                    <View
                      style={[
                        styles.circleWrapper,
                        isSelected && styles.circleWrapperSelected,
                      ]}
                    >
                      <CategoryCircle item={item} size={76} />
                    </View>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.categoryLabel,
                        isSelected && styles.categoryLabelSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              );
            })}
          </ScrollView>

        </>
      )}
    </View>
  );
};

interface PromoBannerProps {
  banner: { id: string; title: string; imageUrl: string };
  onPress?: (bannerId: string) => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ banner, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    style={styles.promoBanner}
    onPress={() => onPress && onPress(banner.id)}
  >
    <Image
      source={{ uri: banner.imageUrl }}
      style={styles.promoBannerImage}
      resizeMode="cover"
    />
    <LinearGradient
      colors={['transparent', 'rgba(0, 0, 0, 0.75)']}
      style={styles.promoBannerOverlay}
    />
    <Text numberOfLines={3} style={styles.promoBannerTitle}>
      {banner.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    paddingTop: 12,
    paddingBottom: 16,
  },
  subHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  leftNavGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dealsButton: {
    marginLeft: 26,
  },
  navButtonText: {
    fontFamily: GOPUFF_FONTS.regular,
    fontSize: 15,
    color: '#1E293B',
    letterSpacing: -0.2,
  },
  navButtonTextActive: {
    color: '#0F172A',
  },
  chevronIcon: {
    marginLeft: 5,
  },
  rightNavGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stayTunedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0B3',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 9999,
  },
  clockIcon: {
    marginRight: 6,
  },
  stayTunedText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 12,
    fontWeight: '900', // Black
    fontStyle: 'italic',
    color: '#292524',
    letterSpacing: 0.6,
  },
  dotSeparator: {
    fontFamily: GOPUFF_FONTS.family,
    marginHorizontal: 10,
    fontSize: 14,
    color: '#6B7280',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 13,
    fontWeight: '900', // Black
    fontStyle: 'italic',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  locationChevron: {
    marginLeft: 4,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  categoryItem: {
    alignItems: 'center',
    width: 100,
    marginHorizontal: 6,
  },
  promoBanner: {
    width: 170,
    height: 104,
    marginHorizontal: 8,
    marginTop: 2,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
        ':hover': {
          transform: 'scale(1.02)',
        },
      } as any,
    }),
  },
  promoBannerImage: {
    width: '100%',
    height: '100%',
  },
  promoBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  promoBannerTitle: {
    position: 'absolute',
    left: 12,
    right: 10,
    bottom: 10,
    fontFamily: GOPUFF_FONTS.family,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },

  circleWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
        ':hover': {
          transform: 'scale(1.06)',
        },
      } as any,
    }),
  },
  circleWrapperSelected: {},
  categoryLabel: {
    fontFamily: GOPUFF_FONTS.regular,
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 16,
    ...Platform.select({
      web: {
        userSelect: 'none' as any,
      },
    }),
  },

  categoryLabelSelected: {
    fontFamily: GOPUFF_FONTS.family,
    color: '#111827',
    fontWeight: '700', // Bold
  },
});
