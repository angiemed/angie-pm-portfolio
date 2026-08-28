import { useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsData from '../data/projects.json'
import './About.css'

export default function About() {
  const { t, language } = useLanguage()

  const evolution = useMemo(
    () => [...projectsData.projects].sort((a, b) => a.order - b.order),
    []
  )

  const intro = t('about.intro')
  const introParagraphs = Array.isArray(intro) ? intro : []

  const sections = t('about.sections')
  const aboutSections = Array.isArray(sections) ? sections : []

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-header">
          <h2>{t('about.title')}</h2>
          <p className="about-subtitle">{t('about.subtitle')}</p>
        </div>

        <p className="about-bio">{t('about.bio')}</p>

        <div className="about-narrative">
          {introParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <blockquote className="about-quote">
            <p>{t('about.quote')}</p>
            {language === 'en' && (
              <cite>{t('about.quoteNote')}</cite>
            )}
          </blockquote>

          <p>{t('about.quoteFollow')}</p>

          {aboutSections.map((section, i) => (
            <div className="about-section" key={i}>
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="about-evolution">
          <h3>{t('about.evolutionTitle')}</h3>
          <div className="evolution-list">
            {evolution.map((project) => (
              <div key={project.id} className="evolution-item">
                <span className="evolution-duration">{project.duration}</span>
                <div className="evolution-body">
                  <p className="evolution-role">{project.myRole.title}</p>
                  <p className="evolution-domain">{project.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
