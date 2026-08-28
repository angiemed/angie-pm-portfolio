import { useLanguage } from '../contexts/LanguageContext'
import './MyContribution.css'

export default function MyContribution() {
  const { t } = useLanguage()
  const items = t('contribution.items')
  const contributionItems = Array.isArray(items) ? items : []

  return (
    <section id="contribution" className="contribution">
      <div className="container">
        <div className="contribution-header">
          <h2>{t('contribution.title')}</h2>
          <p className="contribution-subtitle">{t('contribution.subtitle')}</p>
        </div>

        <div className="contribution-grid">
          {contributionItems.map((item, i) => (
            <div className="contribution-card" key={i}>
              <span className="contribution-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
