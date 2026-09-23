import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Defs,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import { CategoryItem } from '../data/categories';

interface CategoryCircleProps {
  item: CategoryItem;
  size?: number;
}

export const CategoryCircle: React.FC<CategoryCircleProps> = ({
  item,
  size = 76,
}) => {
  const renderInnerGraphic = () => {
    switch (item.type) {
      case 'deals':
        // 3D dollar sign on vibrant red background
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Defs>
              <RadialGradient id="dealsBg" cx="45%" cy="40%" r="60%">
                <Stop offset="0%" stopColor="#FF334B" />
                <Stop offset="70%" stopColor="#E51937" />
                <Stop offset="100%" stopColor="#BA0C25" />
              </RadialGradient>
              <RadialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
                <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </RadialGradient>
            </Defs>
            <Circle cx="30" cy="30" r="30" fill="url(#dealsBg)" />
            {/* Floor shadow */}
            <Ellipse cx="30" cy="49" rx="15" ry="4" fill="url(#floorShadow)" />
            {/* 3D Pound sign extrusion / back layer */}
            <SvgText
              x="30"
              y="45"
              fontSize="34"
              fontWeight="900"
              fill="#D1D5DB"
              textAnchor="middle"
              fontFamily="system-ui, Arial, sans-serif"
            >
              $
            </SvgText>
            {/* Front bright white face */}
            <SvgText
              x="28.5"
              y="43.5"
              fontSize="34"
              fontWeight="900"
              fill="#FFFFFF"
              textAnchor="middle"
              fontFamily="system-ui, Arial, sans-serif"
            >
              $
            </SvgText>
          </Svg>
        );

      case 'apm':
        // Aldi Price Match: 3D "APM" letters on dark navy
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Defs>
              <RadialGradient id="apmBg" cx="50%" cy="45%" r="60%">
                <Stop offset="0%" stopColor="#1E3272" />
                <Stop offset="70%" stopColor="#0B1B4F" />
                <Stop offset="100%" stopColor="#050E2D" />
              </RadialGradient>
              <RadialGradient id="floorShadow2" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
                <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </RadialGradient>
            </Defs>
            <Circle cx="30" cy="30" r="30" fill="url(#apmBg)" />
            <Ellipse cx="30" cy="50" rx="20" ry="4" fill="url(#floorShadow2)" />
            {/* 3D Extrusion Shadow */}
            <SvgText
              x="31"
              y="40"
              fontSize="17"
              fontWeight="900"
              fill="#8FA4D4"
              textAnchor="middle"
              letterSpacing="0.5"
              fontFamily="system-ui, Arial, sans-serif"
            >
              APM
            </SvgText>
            {/* Front White Letters */}
            <SvgText
              x="29.5"
              y="38.5"
              fontSize="17"
              fontWeight="900"
              fill="#FFFFFF"
              textAnchor="middle"
              letterSpacing="0.5"
              fontFamily="system-ui, Arial, sans-serif"
            >
              APM
            </SvgText>
          </Svg>
        );

      case 'asian_mart':
        // Pagoda Temple illustration on peach background
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#FDF1E7" />
            <Ellipse cx="30" cy="51" rx="14" ry="3" fill="rgba(0,0,0,0.08)" />
            {/* Pagoda Base */}
            <Rect x="22" y="38" width="16" height="11" rx="1" fill="#E06D53" />
            <Rect x="26" y="41" width="8" height="8" rx="1" fill="#4A1E15" />
            {/* Pagoda First Tier Roof */}
            <Path
              d="M17 38 C 22 36, 26 35, 30 35 C 34 35, 38 36, 43 38 L 39 33 L 21 33 Z"
              fill="#C0392B"
            />
            {/* Mid Floor */}
            <Rect x="24" y="27" width="12" height="7" rx="1" fill="#E06D53" />
            <Rect x="27" y="29" width="6" height="5" rx="0.5" fill="#4A1E15" />
            {/* Top Roof with Curved Eaves */}
            <Path
              d="M15 28 C 22 25, 27 24, 30 24 C 33 24, 38 25, 45 28 L 37 19 L 23 19 Z"
              fill="#C0392B"
            />
            {/* Spire / Finial */}
            <Rect x="29" y="14" width="2" height="6" fill="#F39C12" />
            <Circle cx="30" cy="13" r="2" fill="#F39C12" />
          </Svg>
        );

      case 'fruit_veg':
        // Fresh yellow bananas on soft mint green
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#B7E4C7" />
            <Ellipse cx="32" cy="49" rx="15" ry="3.5" fill="rgba(0,0,0,0.12)" />
            {/* Stem base */}
            <Path d="M36 18 L33 19 L32 23 L35 23 Z" fill="#4D7C0F" />
            {/* Banana 1 (back) */}
            <Path
              d="M34 20 C 37 28, 38 38, 22 47 C 32 46, 42 37, 34 20 Z"
              fill="#EAB308"
            />
            {/* Banana 2 (main front) */}
            <Path
              d="M33 21 C 36 29, 36 39, 20 46 C 17 47, 18 45, 20 44 C 31 39, 32 30, 31 22 Z"
              fill="#FDE047"
            />
            {/* Banana 3 (left accent) */}
            <Path
              d="M32 23 C 33 30, 31 40, 16 44 C 26 41, 31 32, 29 24 Z"
              fill="#FACC15"
            />
            {/* Brown tip */}
            <Circle cx="17" cy="45.5" r="1.5" fill="#713F12" />
          </Svg>
        );

      case 'eggs_dairy':
        // British fresh milk plastic bottle on bright blue
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#8000FF" />
            <Ellipse cx="30" cy="51" rx="11" ry="3.5" fill="rgba(0,0,0,0.18)" />
            {/* Blue Cap */}
            <Rect x="27" y="13" width="6" height="3" rx="1" fill="#1D4ED8" />
            {/* Neck */}
            <Rect x="27.5" y="16" width="5" height="3" fill="#F8FAFC" />
            {/* Bottle Body */}
            <Rect x="22" y="19" width="16" height="31" rx="4" fill="#FFFFFF" />
            {/* Handle on side */}
            <Path
              d="M38 23 C 41 23, 41 33, 38 34"
              stroke="#E2E8F0"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Milk Label */}
            <Rect x="24" y="30" width="12" height="12" rx="2" fill="#3B82F6" />
            {/* Mountains/Pasture silhouette on label */}
            <Path d="M25 38 L28 34 L31 38 L34 33 L35 38 Z" fill="#93C5FD" />
            <Circle cx="29" cy="33" r="1" fill="#FEF08A" />
          </Svg>
        );

      case 'bakery':
        // Orange wrapped sliced bread loaf on golden yellow
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#F6D04B" />
            <Ellipse cx="30" cy="51" rx="14" ry="3.5" fill="rgba(0,0,0,0.12)" />
            {/* Loaf outline */}
            <Rect x="21" y="18" width="18" height="31" rx="3" fill="#EA580C" />
            {/* Orange bread wrapper details */}
            <Rect x="23" y="22" width="14" height="23" fill="#F97316" />
            {/* White label patch */}
            <Rect x="24" y="27" width="12" height="11" rx="1" fill="#FFFFFF" />
            <Rect x="26" y="30" width="8" height="2" fill="#EA580C" />
            <Rect x="26" y="33" width="8" height="1.5" fill="#64748B" />
            {/* Top twist tie */}
            <Polygon points="26,18 34,18 32,15 28,15" fill="#E2E8F0" />
          </Svg>
        );

      case 'meat_fish':
        // Fresh red marbled steak on mint green
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#A7F3D0" />
            <Ellipse cx="32" cy="50" rx="14" ry="4" fill="rgba(0,0,0,0.15)" />
            {/* Steak meat contour */}
            <Path
              d="M22 20 C 35 17, 43 23, 41 36 C 40 45, 33 49, 23 48 C 17 47, 16 38, 17 31 C 18 24, 18 21, 22 20 Z"
              fill="#BE123C"
            />
            {/* Fat marbling rim */}
            <Path
              d="M22 20 C 35 17, 43 23, 41 36"
              stroke="#FFF1F2"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Marbling streaks */}
            <Path
              d="M26 26 C 29 27, 32 30, 31 34"
              stroke="#FFE4E6"
              strokeWidth="1.5"
              fill="none"
            />
            <Path
              d="M22 34 C 25 36, 27 40, 26 43"
              stroke="#FFE4E6"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Bone circle */}
            <Circle cx="24" cy="27" r="2.5" fill="#FFFFFF" />
          </Svg>
        );

      case 'alcohol':
        // Cold beer can on pink
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#FECDD3" />
            <Ellipse cx="30" cy="51" rx="10" ry="3" fill="rgba(0,0,0,0.14)" />
            {/* Can body */}
            <Rect x="23" y="16" width="14" height="33" rx="2" fill="#E2E8F0" />
            {/* Red banner / Stella style emblem */}
            <Rect x="23" y="24" width="14" height="15" fill="#DC2626" />
            <Circle cx="30" cy="31.5" r="4.5" fill="#FFFFFF" />
            <Circle cx="30" cy="31.5" r="3.2" fill="#EAB308" />
            {/* Can rim top & bottom */}
            <Ellipse cx="30" cy="16" rx="6.5" ry="1.5" fill="#94A3B8" />
            <Ellipse cx="30" cy="49" rx="6.5" ry="1" fill="#94A3B8" />
          </Svg>
        );

      case 'drinks':
        // Classic red Coca-Cola can on electric blue
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#8000FF" />
            <Ellipse cx="30" cy="51" rx="10" ry="3" fill="rgba(0,0,0,0.18)" />
            {/* Red can cylinder */}
            <Rect x="23" y="16" width="14" height="33" rx="2" fill="#EF4444" />
            {/* Silver can top */}
            <Ellipse cx="30" cy="16" rx="6.5" ry="1.5" fill="#CBD5E1" />
            {/* Iconic white wave ribbon */}
            <Path
              d="M23 27 C 27 24, 33 34, 37 31"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Silver bottom */}
            <Ellipse cx="30" cy="49" rx="6.5" ry="1" fill="#94A3B8" />
          </Svg>
        );

      case 'snacks':
        // Red Pringles can on pale yellow
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#FEF08A" />
            <Ellipse cx="30" cy="51" rx="9" ry="3" fill="rgba(0,0,0,0.12)" />
            {/* Red tall cylinder tube */}
            <Rect x="24" y="14" width="12" height="35" rx="2" fill="#E11D48" />
            {/* White translucent cap */}
            <Ellipse cx="30" cy="14" rx="6" ry="1.5" fill="#F8FAFC" />
            {/* Pringles face / mustache emblem */}
            <Circle cx="30" cy="24" r="3.5" fill="#FEF08A" />
            {/* Black mustache */}
            <Path
              d="M27 25 C 29 27, 31 27, 33 25 C 31 24.5, 29 24.5, 27 25 Z"
              fill="#0F172A"
            />
            {/* Yellow chip banner below */}
            <Rect x="25" y="32" width="10" height="7" fill="#FACC15" />
          </Svg>
        );

      case 'confectionery':
        // Cadbury purple chocolate bar on mint green
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#A7F3D0" />
            <Ellipse cx="30" cy="51" rx="10" ry="3.5" fill="rgba(0,0,0,0.14)" />
            {/* Purple bar wrapper */}
            <Rect x="23" y="16" width="14" height="33" rx="2" fill="#581C87" />
            {/* Gold foil top peeking */}
            <Rect x="24" y="16" width="12" height="4" fill="#F59E0B" />
            {/* White Dairy Milk script block */}
            <Rect x="25" y="27" width="10" height="9" rx="1" fill="#7E22CE" />
            <Path
              d="M26 31 L34 31 M26 34 L32 34"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Glass & half milk drops */}
            <Circle cx="28" cy="23" r="1.5" fill="#FFFFFF" />
            <Circle cx="31" cy="24" r="1.2" fill="#FFFFFF" />
          </Svg>
        );

      case 'ice_cream':
        // Ben & Jerry's pint on ocean blue
        return (
          <Svg width={size} height={size} viewBox="0 0 60 60">
            <Circle cx="30" cy="30" r="30" fill="#0284C7" />
            <Ellipse cx="30" cy="51" rx="12" ry="3.5" fill="rgba(0,0,0,0.2)" />
            {/* Tub body */}
            <Polygon
              points="22,23 38,23 36,49 24,49"
              fill="#0369A1"
            />
            {/* Tub Lid (black/blue) */}
            <Rect x="21" y="20" width="18" height="4" rx="2" fill="#0C4A6E" />
            {/* Cloud & green pasture on tub */}
            <Path d="M23 42 C 26 40, 34 40, 37 42 L 36 49 L 24 49 Z" fill="#22C55E" />
            {/* White brand cloud */}
            <Ellipse cx="30" cy="31" rx="5" ry="3" fill="#FFFFFF" />
            <Circle cx="30" cy="36" r="2" fill="#78350F" />
          </Svg>
        );

      default:
        return <Circle cx="30" cy="30" r="30" fill={item.bgColor} />;
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {renderInnerGraphic()}
    </View>
  );
};

// Helper polygon component for clean SVG rendering
const Polygon: React.FC<{ points: string; fill: string }> = ({
  points,
  fill,
}) => {
  const d = `M ${points.split(' ').join(' L ')} Z`;
  return <Path d={d} fill={fill} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
      } as any,
    }),
  },
});
