import { useLanguage } from '../contexts/LanguageContext'
import Tilt from './Tilt'
import './MyContribution.css'

export default function MyContribution() {
  const { t } = useLanguage()
  const items = t('contribution.items')
  const contributionItems = Array.isArray(items) ? items : []

  return (
    <section id="contribution" className="contribution">
      <h2>{t('contribution.title')}</h2>
      <p className="contribution-subtitle">{t('contribution.subtitle')}</p>

      <div className="contribution-grid">
        {contributionItems.map((item, i) => (
          <Tilt as="div" depth={1} key={i} className="contribution-card">
            <div className="contribution-top">
              <span className="contribution-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="contribution-icon" aria-hidden="true">
                {item.icon}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Tilt>
        ))}
      </div>
    </section>
  )
}
