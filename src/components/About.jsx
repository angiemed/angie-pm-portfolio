import { useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsEn from '../data/projects.json'
import projectsEs from '../data/projects.es.json'
import { FULL_NAME } from '../constants'
import Tilt from './Tilt'
import './About.css'

const PROJECTS_BY_LANGUAGE = {
  en: projectsEn,
  es: projectsEs,
}

export default function About() {
  const { t, language } = useLanguage()
  const projectsData = PROJECTS_BY_LANGUAGE[language] || projectsEn

  const evolution = useMemo(
    () => [...projectsData.projects].sort((a, b) => a.order - b.order),
    [projectsData]
  )

  const intro = t('about.intro')
  const introParagraphs = Array.isArray(intro) ? intro : []

  const sections = t('about.sections')
  const aboutSections = Array.isArray(sections) ? sections : []

  return (
    <section id="about" className="about-view">
      <div className="about-columns">
        <div className="about-primary">
          <h2 className="about-title">{t('about.title')}</h2>

          <Tilt as="div" depth={0.8} className="about-photo">
            <div className="about-photo-ring" />
            <img src="/profile.jpg" alt={FULL_NAME} className="about-photo-img" />
          </Tilt>

          <div className="about-name">{FULL_NAME}</div>
          <p className="about-bio">{t('about.bio')}</p>

          {introParagraphs.map((paragraph, i) => (
            <p className="about-intro-p" key={i}>
              {paragraph}
            </p>
          ))}

          <blockquote className="about-quote">
            <p>{t('about.quote')}</p>
            {language === 'en' && <cite>{t('about.quoteNote')}</cite>}
          </blockquote>

          <p className="about-intro-p">{t('about.quoteFollow')}</p>
        </div>

        <div className="about-sections">
          {aboutSections.map((section, i) => (
            <div className="about-section-card" key={i}>
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="about-evolution">
        <div className="about-evolution-label">{t('about.evolutionTitle')}</div>
        <div className="about-evolution-list">
          {evolution.map((project) => (
            <div key={project.id} className="about-evolution-item">
              <span className="about-evolution-duration">{project.duration}</span>
              <span className="about-evolution-body">
                <span className="about-evolution-role">{project.myRole.title}</span>
                <span className="about-evolution-domain">{project.domain}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
