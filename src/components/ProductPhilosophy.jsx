import { useLanguage } from '../contexts/LanguageContext'
import './ProductPhilosophy.css'

export default function ProductPhilosophy() {
  const { t } = useLanguage()
  const items = t('philosophy.items')
  const philosophyItems = Array.isArray(items) ? items : []

  return (
    <section id="philosophy" className="philosophy">
      <div className="container">
        <div className="philosophy-header">
          <h2>{t('philosophy.title')}</h2>
          <p className="philosophy-subtitle">{t('philosophy.subtitle')}</p>
        </div>

        <div className="philosophy-grid">
          {philosophyItems.map((item, i) => (
            <blockquote className="philosophy-card" key={i}>
              <span className="philosophy-mark" aria-hidden="true">&ldquo;</span>
              <p>{item.text}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
