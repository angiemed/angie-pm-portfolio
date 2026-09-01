import { useLanguage } from '../contexts/LanguageContext'
import { LOCATION, CV_URL, CV_FILENAME, NICKNAME } from '../constants'
import Tilt from './Tilt'
import './Hero.css'

function scrollToWorkIndex() {
  const el = document.getElementById('work-index')
  if (!el) return
  const top = el.getBoundingClientRect().top + (window.scrollY || 0) - 70
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Hero() {
  const { t } = useLanguage()
  const bannerLines = t('hero.bannerLines')
  const lines = Array.isArray(bannerLines) ? bannerLines : []

  return (
    <section id="hero" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true">
        <div className="hero-grid-plane" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-rule" />
            <span>{t('hero.title')}</span>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>
              ·
            </span>
            <span>{LOCATION}</span>
          </p>

          <h1 className="hero-title">
            {lines.map((line, i) => (
              <span className="hero-line-mask" key={i}>
                <span
                  className={`hero-line${i === 1 ? ' hero-line-accent' : ''}`}
                  style={{ animationDelay: `${i * 110}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub">{t('hero.description')}</p>

          <div className="hero-actions">
            <button type="button" data-magnet="" className="btn btn-primary" onClick={scrollToWorkIndex}>
              {t('hero.cta')} ↓
            </button>
            <a
              href={CV_URL}
              download={CV_FILENAME}
              data-magnet=""
              className="btn btn-secondary"
            >
              {t('hero.cvDownload')} ↓
            </a>
          </div>
        </div>

        <Tilt as="div" depth={1} className="hero-portrait">
          <div className="hero-portrait-ring hero-portrait-ring-spin" />
          <div className="hero-portrait-ring hero-portrait-ring-static" />
          <img src="/profile.jpg" alt={t('hero.name')} className="hero-portrait-img" />
          <div className="hero-nickname">"{NICKNAME}"</div>
          <div className="hero-availability">
            <span className="hero-availability-dot" />
            {t('contact.availability')}
          </div>
        </Tilt>
      </div>
    </section>
  )
}
