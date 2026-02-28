import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { bannersApi } from '../api/client.js'
import { heroBanners } from '../data/landingBanners.js'
import { customBanners } from '../assets/images.js'

const AUTO_ADVANCE_MS = 5000

const BUNDLED_BANNERS = {
  '/banners/banner-traditional-gold.png': customBanners[0],
  '/banners/banner-traditional-gold.jpg': customBanners[0],
  '/banners/banner-jewelry-collection.png': customBanners[1],
  '/banners/banner-jewelry-collection.webp': customBanners[1],
  '/banners/banner-diamond-pendants.png': customBanners[2],
  '/banners/banner-diamond-pendants.webp': customBanners[2],
}

function resolveImageUrl(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  const key = url.startsWith('/') ? url : '/' + url
  const bundled = BUNDLED_BANNERS[key]
  if (bundled) return bundled
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  return base + (url.startsWith('/') ? url : '/' + url)
}

function mapBanner(b) {
  return {
    image: resolveImageUrl(b.image_url),
    brandLabel: b.brand_label ?? 'G',
    brandName: b.brand_name ?? '',
    presents: b.presents ?? '',
    collectionName: b.collection_name ?? '',
    cta: b.cta ?? 'SHOP NOW',
    ctaHref: b.cta_href ?? '/shop',
  }
}

const STATIC_SLIDES = Array.isArray(heroBanners) && heroBanners.length > 0 ? heroBanners : []

export default function Hero() {
  const [slides, setSlides] = useState(STATIC_SLIDES)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    bannersApi.list()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapBanner).filter((s) => s.image)
          if (mapped.length > 0) setSlides(mapped)
        }
      })
      .catch(() => {})
  }, [])

  const slideWidthVw = 85
  const offsetVw = (100 - slideWidthVw) / 2
  const totalSlides = slides.length
  const safeIndex = totalSlides > 0 ? Math.min(activeIndex, totalSlides - 1) : 0
  const slide = slides[safeIndex]

  const goTo = useCallback((index) => {
    if (totalSlides === 0) return
    setActiveIndex((i) => (index + totalSlides) % totalSlides)
  }, [totalSlides])

  const goPrev = useCallback(() => goTo(safeIndex - 1), [safeIndex, goTo])
  const goNext = useCallback(() => goTo(safeIndex + 1), [safeIndex, goTo])

  useEffect(() => {
    if (totalSlides === 0) return
    const t = setInterval(() => goNext(), AUTO_ADVANCE_MS)
    return () => clearInterval(t)
  }, [goNext, totalSlides])

  if (totalSlides === 0) {
    return (
      <section className="hero tanishq-style hero--empty">
        <div className="hero-bg" style={{ background: 'var(--color-cream)' }} />
      </section>
    )
  }

  return (
    <section className="hero tanishq-style" style={{ '--hero-index': String(safeIndex) }}>
      <div className="hero-track-wrap">
        <div
          className="hero-track"
          style={{
            transform: `translateX(calc(${offsetVw}vw - ${safeIndex * slideWidthVw}vw))`,
          }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className={`hero-slide ${i === safeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <div
                className="hero-bg"
                style={{
                  backgroundImage: s.image ? `url(${s.image})` : undefined,
                  backgroundSize: s.image ? 'cover' : undefined,
                  backgroundPosition: s.image ? 'center' : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="hero-arrow hero-arrow-prev"
        aria-label="Previous slide"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow-next"
        aria-label="Next slide"
        onClick={(e) => { e.stopPropagation(); goNext() }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      {slide && (
        <>
          <div className="hero-overlay-center">
            <span className="hero-brand-letter">{slide.brandLabel}</span>
            <span className="hero-brand-name">{slide.brandName}</span>
            <span className="hero-presents">{slide.presents}</span>
            <span className="hero-collection-name">{slide.collectionName}</span>
            {(slide.ctaHref?.startsWith('#')
              ? <a href={slide.ctaHref} className="hero-cta-shop">{slide.cta}</a>
              : <Link to={slide.ctaHref || '/shop'} className="hero-cta-shop">{slide.cta}</Link>
            )}
          </div>
          <div className="hero-dots-wrap">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero-dot ${i === safeIndex ? 'active' : ''}`}
                aria-label={`Slide ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex(i)
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
