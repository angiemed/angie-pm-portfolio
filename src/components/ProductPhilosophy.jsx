import { useLanguage } from '../contexts/LanguageContext'
import './ProductPhilosophy.css'

export default function ProductPhilosophy() {
  const { t } = useLanguage()
  const items = t('philosophy.items')
  const philosophyItems = Array.isArray(items) ? items : []

  return (
    <section id="philosophy" className="philosophy">
      <div className="philosophy-label">{t('philosophy.title')}</div>
      <p className="philosophy-subtitle">{t('philosophy.subtitle')}</p>

      <div className="philosophy-grid">
        {philosophyItems.map((item, i) => (
          <p className="philosophy-quote" key={i}>
            {item.text}
          </p>
        ))}
      </div>
    </section>
  )
}
