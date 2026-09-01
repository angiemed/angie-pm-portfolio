import { useLanguage } from '../contexts/LanguageContext'
import './ProductLessons.css'

export default function ProductLessons() {
  const { t } = useLanguage()
  const items = t('lessons.items')
  const lessonItems = Array.isArray(items) ? items : []

  return (
    <section id="lessons" className="lessons">
      <div className="lessons-label">{t('lessons.title')}</div>
      <p className="lessons-subtitle">{t('lessons.subtitle')}</p>

      <div className="lessons-grid">
        {lessonItems.map((item, i) => (
          <div className="lesson-card" key={i}>
            <span className="lesson-index">{String(i + 1).padStart(2, '0')}</span>
            <div className="lesson-body">
              <span className="lesson-project">{item.project}</span>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
