import { useState, useEffect } from 'react'

const INTRO_IMAGE = '/assets/intro-doors.png'
const DOORS_DURATION_MS = 3400
const FADE_OUT_MS = 1000
const TOTAL_MS = DOORS_DURATION_MS + FADE_OUT_MS

export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('doors') // 'doors' | 'fadeout' | 'done'
  const [skipRequested, setSkipRequested] = useState(false)

  useEffect(() => {
    if (skipRequested) {
      setPhase('fadeout')
      const t = setTimeout(() => {
        setPhase('done')
        onComplete?.()
      }, FADE_OUT_MS)
      return () => clearTimeout(t)
    }

    const doorsEnd = setTimeout(() => {
      setPhase('fadeout')
    }, DOORS_DURATION_MS)

    const allEnd = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, TOTAL_MS)

    return () => {
      clearTimeout(doorsEnd)
      clearTimeout(allEnd)
    }
  }, [onComplete, skipRequested])

  const handleSkip = () => setSkipRequested(true)

  if (phase === 'done') return null

  return (
    <div
      className="intro-screen"
      data-phase={phase}
      aria-hidden="false"
      role="presentation"
    >
      <div className="intro-screen__bg" />
      <div className="intro-screen__vignette" aria-hidden="true" />
      <div className="intro-screen__light-rays" aria-hidden="true" />
      <div className="intro-screen__particles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="intro-screen__particle" style={{ '--i': i }} />
        ))}
      </div>
      <div className="intro-screen__content">
        <p className="intro-screen__welcome" aria-hidden="true">
          Welcome to The Garg Jewellers
        </p>
        <div className="intro-screen__frame">
        <div className="intro-screen__frame-inner" />
        <div className="intro-screen__doors">
          <div
            className="intro-screen__door intro-screen__door--left"
            style={{ backgroundImage: `url(${INTRO_IMAGE})` }}
          />
          <div
            className="intro-screen__door intro-screen__door--right"
            style={{ backgroundImage: `url(${INTRO_IMAGE})` }}
          />
        </div>
        <div className="intro-screen__shimmer" aria-hidden="true" />
        </div>
      </div>
      <button
        type="button"
        className="intro-screen__skip"
        onClick={handleSkip}
        aria-label="Skip intro"
      >
        Skip
      </button>
    </div>
  )
}
