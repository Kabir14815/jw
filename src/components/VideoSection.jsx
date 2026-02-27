import { useState, useRef } from 'react'
import { videoCarouselItems } from '../assets/images.js'

function IconMute() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}
function IconVolume() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}
function IconFullscreen() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  )
}
function IconMore() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
function IconReplay() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  )
}
function IconChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
function IconChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

export default function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)
  const item = videoCarouselItems[activeIndex]

  const goPrev = () => setActiveIndex((i) => (i === 0 ? videoCarouselItems.length - 1 : i - 1))
  const goNext = () => setActiveIndex((i) => (i === videoCarouselItems.length - 1 ? 0 : i + 1))

  return (
    <section className="video-section video-section--carousel">
      <div className="video-section-inner">
        <h2 className="video-section__heading">Styling 101 With Diamonds</h2>
        <p className="video-section__sub">Trendsetting diamond jewellery suited for every occasion</p>

        <div className="video-carousel">
          <button
            type="button"
            className="video-carousel__arrow video-carousel__arrow--prev"
            onClick={goPrev}
            aria-label="Previous video"
          >
            <IconChevronLeft />
          </button>

          <div className="video-carousel__track">
            {videoCarouselItems.map((slide, i) => {
              const isActive = i === activeIndex
              const offset = i - activeIndex
              return (
                <div
                  key={i}
                  className={`video-card ${isActive ? 'video-card--active' : ''}`}
                  data-offset={offset}
                  onClick={() => !isActive && setActiveIndex(i)}
                >
                  <div className="video-card__inner">
                    <video
                      ref={isActive ? videoRef : null}
                      className="video-card__video"
                      poster={slide.poster}
                      src={slide.videoUrl}
                      muted={muted}
                      loop
                      playsInline
                      {...(isActive ? { controls: true } : {})}
                    />
                    <div className="video-card__overlay-top">
                      <button type="button" className="video-card__icon-btn" aria-label="More options">
                        <IconMore />
                      </button>
                      <span className="video-card__title-trim">{slide.overlayTitle}</span>
                      <div className="video-card__top-right">
                        <button
                          type="button"
                          className="video-card__icon-btn"
                          onClick={(e) => { e.stopPropagation(); setMuted((m) => !m) }}
                          aria-label={muted ? 'Unmute' : 'Mute'}
                        >
                          {muted ? <IconMute /> : <IconVolume />}
                        </button>
                        <button
                          type="button"
                          className="video-card__icon-btn"
                          onClick={(e) => { e.stopPropagation(); videoRef.current?.play() }}
                          aria-label="Replay"
                        >
                          <IconReplay />
                        </button>
                        <button type="button" className="video-card__icon-btn" aria-label="Fullscreen">
                          <IconFullscreen />
                        </button>
                      </div>
                    </div>
                    <a href={slide.productHref} className="video-card__product" onClick={(e) => e.stopPropagation()}>
                      <img src={slide.productImage} alt="" className="video-card__product-img" />
                      <span className="video-card__product-name">{slide.productName}</span>
                      <span className="video-card__product-arrow" aria-hidden><IconChevronRight /></span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="video-carousel__arrow video-carousel__arrow--next"
            onClick={goNext}
            aria-label="Next video"
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
