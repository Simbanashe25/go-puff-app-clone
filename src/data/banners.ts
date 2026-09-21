export interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText?: string;
}

export const HERO_BANNERS_DATA = {
  // Left large featured banner
  featured: {
    id: 'feat-1',
    title: "JUST IN: WE'VE GOT EVERYONE'S FAVS",
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80',
  },

  // Right top carousel slides
  carousel: [
    {
      id: 'slide-1',
      title: 'GROCERIES, SNACKS AND MORE\nDELIVERED IN AS LITTLE AS 15 MINUTES.',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80',
    },
    {
      id: 'slide-2',
      title: 'THOUSANDS OF ESSENTIALS.\nDELIVERED STRAIGHT TO YOUR DOOR.',
      imageUrl: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=900&q=80',
    },
    {
      id: 'slide-3',
      title: "LATE NIGHT CRAVINGS?\nWE'RE OPEN AND DELIVERING FAST.",
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80',
    },
  ],

  // Right bottom two sub-banners
  bottomCards: [
    {
      id: 'card-1',
      title: 'ORDER BEFORE YOU RUN\nOUT OF ESSENTIALS.',
      imageUrl: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=900&q=80',
    },
    {
      id: 'card-2',
      title: 'LIVE DELIVERY TRACKING\nRIGHT TO YOUR DOOR.',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    },
  ],
};
