import { useEffect, useRef } from 'react'
import { interactionsEnabled } from '../hooks/useMediaGates'
import './CursorHalo.css'

// A soft lime/lilac halo that lags gently behind the real cursor (lerp, not 1:1),
// with a small exact-position dot inside it. Expands over anything interactive
// ([data-tilt], [data-magnet]) and doubles up further over a project card
// ([data-magnet-label]) so the card itself reads as "about to open". Desktop
// fine-pointer only — under touch or prefers-reduced-motion this renders nothing
// and never hides the system cursor.
export default function CursorHalo() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const enabledRef = useRef(false)

  useEffect(() => {
    if (!interactionsEnabled()) return
    enabledRef.current = true
    document.body.style.cursor = 'none'

    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0
    let my = 0
    let rx = null
    let ry = null
    let raf = null

    const setSize = (size) => {
      if (!ring) return
      ring.style.width = `${size}px`
      ring.style.height = `${size}px`
    }

    const follow = () => {
      raf = null
      if (!ring) return
      rx = rx == null ? mx : rx + (mx - rx) * 0.1
      ry = ry == null ? my : ry + (my - ry) * 0.1
      const half = ring.offsetWidth / 2
      ring.style.opacity = '1'
      ring.style.transform = `translate(${rx - half}px,${ry - half}px)`
      if (Math.abs(mx - rx) > 0.4 || Math.abs(my - ry) > 0.4) raf = requestAnimationFrame(follow)
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot) {
        dot.style.opacity = '1'
        dot.style.transform = `translate(${e.clientX - 4.5}px,${e.clientY - 4.5}px)`
      }
      if (!raf) raf = requestAnimationFrame(follow)
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-magnet-label]') || e.target.closest('[data-tilt], [data-magnet]')
      if (!target) return
      setSize(e.target.closest('[data-magnet-label]') ? 108 : 84)
    }
    const onOut = (e) => {
      const target = e.target.closest('[data-magnet-label], [data-tilt], [data-magnet]')
      if (!target) return
      setSize(46)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (!interactionsEnabled()) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
