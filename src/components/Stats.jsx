import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { prefersReducedMotion } from '../hooks/useMediaGates'
import Tilt from './Tilt'
import './Stats.css'

function CountUp({ target }) {
  const ref = useRef(null)
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return
        done.current = true
        const start = performance.now()
        const duration = 1100
        const step = (now) => {
          const k = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - k, 3)
          setValue(Math.round(target * eased))
          if (k < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="stat-value">
      {value}
      <span className="stat-plus">+</span>
    </div>
  )
}

export default function Stats() {
  const { t } = useLanguage()
  const items = t('stats.items')
  const stats = Array.isArray(items) ? items : []

  if (stats.length === 0) return null

  return (
    <section className="stats">
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <Tilt as="div" key={i} depth={1} className="stat-card">
            <CountUp target={stat.value} />
            <div className="stat-label">{stat.label}</div>
          </Tilt>
        ))}
      </div>
    </section>
  )
}
