// Premium imagery – Unsplash (jewellery/gold/diamond/luxury). Replace with your own for production.
const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fit=crop`

// Fallback when Unsplash is blocked or fails (Picsum – no key required)
export const placeholderImage = (w = 400, h = 400, seed = 'garg') =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

// Hero banners – custom jewellery imagery (landing page)
export const customBanners = [
  '/banners/banner-traditional-gold.png',    // Traditional gold necklace – Swipe to unveil INSPIRATION
  '/banners/banner-jewelry-collection.png',  // Exquisite jewellery collection – Discover our collection
  '/banners/banner-diamond-pendants.png',    // Beautiful diamond pendants – View range
]

// Hero banners (large 1920px) – custom first, then Unsplash fallbacks
export const heroSlides = [
  ...customBanners,
  U('1605100804763-247f67b3557e', 1920), // diamond ring
  U('1515562144017-124a0d7b8e2a', 1920), // gold jewellery
  U('1599643478518-a784e5dc4c8f', 1920), // necklace
  U('1617038260897-8c0a013a7f8e', 1920), // gifting
  U('1573408301185-9146fe634ad0', 1920), // gold chains
  U('1602751584552-8ba73aad10e0', 1920), // festive
  U('1523275339704-fd48521f2d3a', 1920), // gold coins
  U('1535632066927-ab7c9ab6052d', 1920), // earrings
]

// Legacy section (store / heritage image)
export const legacyImage = U('1599643478518-a784e5dc4c8f', 900)

export const categoryTiles = [
  U('1602751584552-8ba73aad10e0', 400), // festive
  U('1535632066927-ab7c9ab6052d', 400), // jhumkas / earrings
  U('1573408301185-9146fe634ad0', 400), // gold chains
  U('1587049352847-de6713411321', 400), // silver/gold
  U('1617038260897-8c0a013a7f8e', 400), // gifting
  U('1599643478518-a784e5dc4c8f', 400), // necklace
  U('1523275339704-fd48521f2d3a', 400), // gold coins
  U('1605100804763-247f67b3557e', 400), // diamond ring
  U('1515562144017-124a0d7b8e2a', 400), // gold
]

export const collections = [
  U('1605100804763-247f67b3557e', 500),
  U('1535632066927-ab7c9ab6052d', 500),
  U('1573408301185-9146fe634ad0', 500),
  U('1515562144017-124a0d7b8e2a', 500),
  U('1599643478518-a784e5dc4c8f', 500),
  U('1602751584552-8ba73aad10e0', 500),
  U('1617038260897-8c0a013a7f8e', 500),
  U('1523275339704-fd48521f2d3a', 500),
]

export const trending = [
  U('1602751584552-8ba73aad10e0', 600),
  U('1617038260897-8c0a013a7f8e', 600),
  U('1605100804763-247f67b3557e', 600),
  U('1599643478518-a784e5dc4c8f', 600),
  U('1573408301185-9146fe634ad0', 600),
  U('1535632066927-ab7c9ab6052d', 600),
]

export const curated = [
  U('1599643478518-a784e5dc4c8f', 600), // women
  U('1573408301185-9146fe634ad0', 600), // men
  U('1535632066927-ab7c9ab6052d', 600), // kids
  U('1605100804763-247f67b3557e', 600), // bridal
  U('1617038260897-8c0a013a7f8e', 600), // gifting
  U('1515562144017-124a0d7b8e2a', 600), // gold
]

// Premium brand video – Pexels (free to use). Replace with your own for production.
export const brandVideoUrl =
  'https://videos.pexels.com/video-files/5327599/5327599-hd_1280_720_30fps.mp4'

export const brandVideoPoster = U('1605100804763-247f67b3557e', 1280)

// Video carousel (Tanishq-style): vertical videos with overlay title + product card
export const videoCarouselItems = [
  {
    videoUrl: brandVideoUrl,
    poster: U('1605100804763-247f67b3557e', 600),
    overlayTitle: 'Styling diamonds with The House of Garg',
    productName: 'Exquisite Vines Diamond Necklace Set',
    productImage: U('1599643478518-a784e5dc4c8f', 200),
    productHref: '#collections',
  },
  {
    videoUrl: brandVideoUrl,
    poster: U('1515562144017-124a0d7b8e2a', 600),
    overlayTitle: 'Every diamond tells a story',
    productName: 'Classic Solitaire Ring',
    productImage: U('1605100804763-247f67b3557e', 200),
    productHref: '#collections',
  },
  {
    videoUrl: brandVideoUrl,
    poster: U('1599643478518-a784e5dc4c8f', 600),
    overlayTitle: 'Gold & diamond everyday wear',
    productName: 'Heritage Gold Bangle',
    productImage: U('1573408301185-9146fe634ad0', 200),
    productHref: '#collections',
  },
]

// Jewellery-only images (no nature/random). 4×2 = 8 items.
export const bestsellerItems = [
  { label: 'Diamond Mangalsutra', image: U('1599643478518-a784e5dc4c8f', 400) },
  { label: 'Gold Bangles', image: U('1573408301185-9146fe634ad0', 400) },
  { label: 'Gold Earrings', image: U('1535632066927-ab7c9ab6052d', 400) },
  { label: 'Gold Chain', image: U('1573408301185-9146fe634ad0', 400) },
  { label: 'Gold Mangalsutra', image: U('1599643478518-a784e5dc4c8f', 400) },
  { label: 'Diamond Earrings', image: U('1535632066927-ab7c9ab6052d', 400) },
  { label: 'Solitaire Rings', image: U('1605100804763-247f67b3557e', 400) },
  { label: 'Festive Collection', image: U('1602751584552-8ba73aad10e0', 400) },
]

// Fallback when primary image fails – jewellery only
export const jewelleryPlaceholder = U('1605100804763-247f67b3557e', 400)

// Demo products for shop when API returns empty (show via frontend)
export const demoProducts = [
  { id: 'demo-1', name: 'Diamond Mangalsutra', price: 89500, image_url: U('1599643478518-a784e5dc4c8f', 500), slug: 'diamond-mangalsutra' },
  { id: 'demo-2', name: 'Heritage Gold Bangle Set', price: 125000, image_url: U('1573408301185-9146fe634ad0', 500), slug: 'heritage-gold-bangle-set' },
  { id: 'demo-3', name: 'Gold Earrings – Classic', price: 42900, image_url: U('1535632066927-ab7c9ab6052d', 500), slug: 'gold-earrings-classic' },
  { id: 'demo-4', name: 'Solitaire Diamond Ring', price: 189000, image_url: U('1605100804763-247f67b3557e', 500), slug: 'solitaire-diamond-ring' },
  { id: 'demo-5', name: 'Festive Gold Necklace', price: 156000, image_url: U('1602751584552-8ba73aad10e0', 500), slug: 'festive-gold-necklace' },
  { id: 'demo-6', name: 'Gold Chain – Daily Wear', price: 34900, image_url: U('1573408301185-9146fe634ad0', 500), slug: 'gold-chain-daily-wear' },
  { id: 'demo-7', name: 'Diamond Stud Earrings', price: 67500, image_url: U('1535632066927-ab7c9ab6052d', 500), slug: 'diamond-stud-earrings' },
  { id: 'demo-8', name: 'Bridal Gold Set', price: 245000, image_url: U('1599643478518-a784e5dc4c8f', 500), slug: 'bridal-gold-set' },
]
