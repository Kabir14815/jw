import { useEffect } from 'react'

const SITE_NAME = 'The House of Garg – Garg Jewellers'
const DEFAULT_DESCRIPTION = 'Luxury gold and diamond jewellery in Chandigarh. The House of Garg — fine jewellery and haute couture. Sector 22, Chandigarh.'
const getBaseUrl = () => (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '')

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  if (el.getAttribute('content') !== content) el.setAttribute('content', content)
}

/**
 * Set document title and meta tags for SEO (per-page).
 * @param {Object} options
 * @param {string} [options.title] - Page title (prepended with site name when not home)
 * @param {string} [options.description] - Meta description
 * @param {string} [options.path] - Canonical path (e.g. /shop) for og:url
 * @param {string} [options.image] - Absolute URL for og:image
 */
export function useDocumentHead({ title, description, path = '', image }) {
  useEffect(() => {
    const base = getBaseUrl()
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    const desc = description || DEFAULT_DESCRIPTION
    setMeta('description', desc)

    const pathname = path || (typeof window !== 'undefined' ? window.location.pathname : '')
    const url = pathname ? `${base}${pathname}` : base
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', desc, true)
    setMeta('og:url', url, true)
    setMeta('og:type', 'website', true)
    setMeta('og:site_name', SITE_NAME, true)
    if (image) setMeta('og:image', image, true)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)
    if (image) setMeta('twitter:image', image)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, path, image])
}
