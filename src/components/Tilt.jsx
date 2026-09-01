import { useEffect, useRef } from 'react'
import { interactionsEnabled } from '../hooks/useMediaGates'

/**
 * Wraps any element in a subtle mouse-follow 3D tilt — the "dimensional" depth cue
 * used across cards, tiles, and the profile photo. A no-op on touch devices and under
 * prefers-reduced-motion. `depth` scales the effect (1 = default, 0 = off).
 * Also stamps `data-tilt` so the custom cursor (CursorHalo) knows to expand over it.
 */
export default function Tilt({ as: As = 'div', depth = 1, magnetLabel = false, className, style, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || depth <= 0 || !interactionsEnabled()) return

    const baseTransition = el.style.transition
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      el.style.transition = 'transform 90ms linear'
      el.style.transform = `rotateY(${px * 7 * depth}deg) rotateX(${-py * 7 * depth}deg) translateZ(${16 * depth}px)`
    }
    const onLeave = () => {
      el.style.transition = 'transform 520ms cubic-bezier(.16,1,.3,1)'
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      el.style.transition = baseTransition
      el.style.transform = ''
    }
  }, [depth])

  return (
    <As
      ref={ref}
      data-tilt=""
      data-magnet-label={magnetLabel ? '' : undefined}
      className={className}
      style={{ transformStyle: 'preserve-3d', ...style }}
      {...rest}
    >
      {children}
    </As>
  )
}
