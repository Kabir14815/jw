/**
 * Landing page banners – edit manually.
 * Hero slides: main carousel at top. Promo banners: optional strips below hero.
 */

import { customBanners } from '../assets/images.js'

// —— Hero carousel slides (top of landing page) – jewellery banners only ——
export const heroBanners = [
  {
    image: customBanners[0],
    brandLabel: 'G',
    brandName: 'TRADITIONAL GOLD',
    presents: 'THE HOUSE OF GARG',
    collectionName: 'Swipe to unveil incredible inspiration',
    cta: 'SHOP NOW',
    ctaHref: '/shop',
  },
  {
    image: customBanners[1],
    brandLabel: 'G',
    brandName: 'EXQUISITE & ELEGANT',
    presents: 'THE HOUSE OF GARG',
    collectionName: 'Discover our jewellery collection',
    cta: 'SHOP NOW',
    ctaHref: '/shop',
  },
  {
    image: customBanners[2],
    brandLabel: 'G',
    brandName: 'DIAMOND PENDANTS',
    presents: 'THE HOUSE OF GARG',
    collectionName: 'Beautiful timeless pieces',
    cta: 'SHOP NOW',
    ctaHref: '/shop',
  },
]

// —— Promo banners (strip below hero) – custom jewellery imagery ——
export const promoBanners = [
  {
    id: 'promo-1',
    image: customBanners[0],
    title: 'Traditional Gold',
    subtitle: 'Swipe to unveil incredible inspiration',
    href: '/shop',
  },
  {
    id: 'promo-2',
    image: customBanners[1],
    title: 'Exquisite & Elegant',
    subtitle: 'Discover our jewellery collection',
    href: '/shop',
  },
  {
    id: 'promo-3',
    image: customBanners[2],
    title: 'Diamond Pendants',
    subtitle: 'Beautiful timeless pieces',
    href: '/shop',
  },
]
