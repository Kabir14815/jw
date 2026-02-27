const FOOTER_LINKS = [
  { label: 'Visit Our Store', href: '#stores' },
  { label: 'Book an Appointment', href: '#appointment' },
  { label: 'Talk to an Expert', href: '#expert' },
  { label: 'Digi Gold', href: '#digigold' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Jewellery Guide', href: '#care' },
]

export default function MainFooter() {
  return (
    <footer className="main-footer">
      <div className="container">
        <h2 className="footer-heading">The House of Garg</h2>
        <p className="footer-sub">Royalty Claims Its Throne in Punjab — Find a Boutique or Book a Consultation</p>
        <div className="footer-contact">
          <a href="https://www.thehouseofgarg.com" target="_blank" rel="noopener noreferrer">WWW.THEHOUSEOFGARG.COM</a>
          <span className="footer-contact-sep">|</span>
          <a href="tel:+919876376859">+91 98763 76859</a>
        </div>
        <div className="footer-links">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="cookie-notice">
            We use cookies to optimise your visits. By continuing to browse our site you are accepting our cookie policy.
          </p>
          <p className="copyright">© The House of Garg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
