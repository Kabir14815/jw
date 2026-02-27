import { useEffect, useRef } from 'react'

/**
 * Accessible modal dialog – use for confirmations, messages, etc.
 */
export default function Modal({ open, onClose, title, children, className = '' }) {
  const boxRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handleEscape = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open || !boxRef.current) return
    const focusables = boxRef.current.querySelectorAll('a[href], button:not([disabled])')
    const first = focusables[0]
    if (first) first.focus()
  }, [open])

  if (!open) return null

  return (
    <div
      className={`modal-overlay ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="modal-box" ref={boxRef} onClick={(e) => e.stopPropagation()}>
        {title && (
          <h2 id="modal-title" className="modal-title">{title}</h2>
        )}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
