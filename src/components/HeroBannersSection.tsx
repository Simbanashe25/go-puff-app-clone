import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HERO_BANNERS_DATA } from '../data/banners';
import { GOPUFF_FONTS } from '../constants/theme';
import { LoadingSkeleton } from './LoadingSkeleton';

interface HeroBannersSectionProps {
  onBannerPress?: (bannerId: string) => void;
}

export const HeroBannersSection: React.FC<HeroBannersSectionProps> = ({
  onBannerPress,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Carousel state for the top-right banner
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto-scroll carousel every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) =>
        prev === HERO_BANNERS_DATA.carousel.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_BANNERS_DATA.carousel[activeSlideIndex];
  const [loadedBanners, setLoadedBanners] = useState<Record<string, boolean>>({});
  const markBannerLoaded = (id: string) =>
    setLoadedBanners((previous) => ({ ...previous, [id]: true }));

  return (
    <View style={styles.container}>
      <View style={[styles.gridContainer, isMobile && styles.gridContainerMobile]}>
        {/* Left Column: Tall Featured Banner */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.leftBannerCard, isMobile && styles.leftBannerCardMobile]}
          onPress={() => onBannerPress && onBannerPress(HERO_BANNERS_DATA.featured.id)}
        >
          <Image
            source={{ uri: HERO_BANNERS_DATA.featured.imageUrl }}
            style={styles.bannerImage}
            resizeMode="cover"
            onLoad={() => markBannerLoaded(HERO_BANNERS_DATA.featured.id)}
            onError={() => markBannerLoaded(HERO_BANNERS_DATA.featured.id)}
          />
          {!loadedBanners[HERO_BANNERS_DATA.featured.id] && (
            <LoadingSkeleton style={styles.bannerSkeleton} />
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.85)']}
            locations={[0.4, 0.7, 1]}
            style={styles.gradientOverlay}
          />
          <View style={styles.textContainer}>
            <Text style={styles.featuredTitle}>
              {HERO_BANNERS_DATA.featured.title}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Right Column: Carousel Banner + Pagination Dots + 2 Sub-Cards */}
        <View style={[styles.rightColumn, isMobile && styles.rightColumnMobile]}>
          {/* Top Carousel Banner */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.carouselCard}
            onPress={() => onBannerPress && onBannerPress(currentSlide.id)}
          >
            <Image
              key={currentSlide.id}
              source={{ uri: currentSlide.imageUrl }}
              style={styles.bannerImage}
              resizeMode="cover"
              onLoad={() => markBannerLoaded(currentSlide.id)}
              onError={() => markBannerLoaded(currentSlide.id)}
            />
            {!loadedBanners[currentSlide.id] && <LoadingSkeleton style={styles.bannerSkeleton} />}
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.85)']}
              locations={[0.3, 0.65, 1]}
              style={styles.gradientOverlay}
            />
            <View style={styles.textContainer}>
              <Text style={styles.carouselTitle}>{currentSlide.title}</Text>
            </View>
          </TouchableOpacity>

          {/* Carousel Pagination Dots */}
          <View style={styles.paginationDotsContainer}>
            {HERO_BANNERS_DATA.carousel.map((item, index) => {
              const isActive = index === activeSlideIndex;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setActiveSlideIndex(index)}
                  style={[styles.dot, isActive && styles.activeDot]}
                  accessibilityLabel={`Go to slide ${index + 1}`}
                />
              );
            })}
          </View>

          {/* Bottom Row: Two Sub-Cards */}
          <View style={styles.bottomCardsRow}>
            {HERO_BANNERS_DATA.bottomCards.map((card) => (
              <TouchableOpacity
                key={card.id}
                activeOpacity={0.85}
                style={styles.subCard}
                onPress={() => onBannerPress && onBannerPress(card.id)}
              >
                <Image
                  source={{ uri: card.imageUrl }}
                  style={styles.bannerImage}
                  resizeMode="cover"
                  onLoad={() => markBannerLoaded(card.id)}
                  onError={() => markBannerLoaded(card.id)}
                />
                {!loadedBanners[card.id] && <LoadingSkeleton style={styles.bannerSkeleton} />}
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.45)', 'rgba(0, 0, 0, 0.88)']}
                  locations={[0.2, 0.6, 1]}
                  style={styles.gradientOverlay}
                />
                <View style={styles.subCardTextContainer}>
                  <Text style={styles.subCardTitle}>{card.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
    maxWidth: 1240,
    alignSelf: 'center',
    width: '100%',
  },
  gridContainerMobile: {
    flexDirection: 'column',
  },
  leftBannerCard: {
    flex: 1,
    height: 350,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
        },
      } as any,
    }),
  },
  leftBannerCardMobile: {
    height: 220,
  },
  rightColumn: {
    flex: 1.1,
    flexDirection: 'column',
  },
  rightColumnMobile: {
    flex: 1,
  },
  carouselCard: {
    height: 195,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
      } as any,
    }),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerSkeleton: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    zIndex: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featuredTitle: {
    fontFamily: GOPUFF_FONTS.system,
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: -0.4,
    lineHeight: 26,
    ...Platform.select({
      web: {
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
      } as any,
    }),
  },
  carouselTitle: {
    fontFamily: GOPUFF_FONTS.system,
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: -0.4,
    lineHeight: 24,
    ...Platform.select({
      web: {
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
      } as any,
    }),
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      } as any,
    }),
  },
  activeDot: {
    backgroundColor: '#00A3FF',
    width: 8,
  },
  bottomCardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  subCard: {
    flex: 1,
    height: 125,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
      } as any,
    }),
  },
  subCardTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  subCardTitle: {
    fontFamily: GOPUFF_FONTS.system,
    fontSize: 12,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: -0.2,
    lineHeight: 15,
    ...Platform.select({
      web: {
        textShadow: '0 2px 6px rgba(0,0,0,0.7)',
      } as any,
    }),
  },
});
