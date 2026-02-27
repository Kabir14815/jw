import { useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="chat-widget-trigger"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      <div className="chat-widget-bubble">
        <div className="chat-widget-avatar" />
        <p className="chat-widget-text">How can I help you?</p>
      </div>
    </div>
  )
}
