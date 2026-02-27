import { Link } from 'react-router-dom'
import { promoBanners } from '../data/landingBanners.js'

/**
 * Promo banner strips – content from src/data/landingBanners.js (promoBanners).
 * Edit that file to add/remove/change banners manually.
 */
export default function LandingBanners() {
  if (!promoBanners?.length) return null

  return (
    <section className="landing-banners" aria-label="Promotional banners">
      <div className="landing-banners__grid">
        {promoBanners.map((banner) => {
          const Wrapper = banner.href?.startsWith('#') ? 'a' : Link
          const linkProps = banner.href?.startsWith('#')
            ? { href: banner.href }
            : { to: banner.href || '/shop' }
          return (
            <Wrapper
              key={banner.id}
              className="landing-banners__item"
              {...linkProps}
            >
              <div
                className="landing-banners__bg"
                style={{ backgroundImage: banner.image ? `url(${banner.image})` : undefined }}
              />
              <div className="landing-banners__overlay" />
              <div className="landing-banners__content">
                {banner.title && <span className="landing-banners__title">{banner.title}</span>}
                {banner.subtitle && <span className="landing-banners__subtitle">{banner.subtitle}</span>}
              </div>
            </Wrapper>
          )
        })}
      </div>
    </section>
  )
}
