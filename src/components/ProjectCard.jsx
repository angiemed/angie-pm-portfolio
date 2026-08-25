import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { getCategoryForProject } from '../utils/categoryLookup'
import { getInitials } from '../utils/initials'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)

  const category = getCategoryForProject(project.id)
  const accentColor = category?.color || 'var(--lilac-dark)'
  const showLogo = Boolean(project.logo) && !logoFailed

  return (
    <div className="project-card">
      <div className="project-header">
        <div className="project-visual" style={{ '--accent-color': accentColor }}>
          {showLogo ? (
            <img
              src={project.logo}
              alt={`${project.title} logo`}
              className="project-logo"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="project-logo-fallback">{getInitials(project.title)}</span>
          )}
        </div>

        <div className="project-meta">
          <span className="project-year">{project.duration}</span>
          <h3 className="project-title">{project.title}</h3>
        </div>

        <button
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={expanded ? t('portfolio.readMore') : t('portfolio.viewDetails')}
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      <p className="project-description">{project.shortDescription}</p>

      <div className="project-tags">
        <span className="tag">{project.domain}</span>
        <span className="tag">{project.status}</span>
      </div>

      <div className={`project-expanded${expanded ? ' active' : ''}`}>
        <div className="project-section">
          <h4>{t('sections.problem')}</h4>
          <p>{project.problem.situation}</p>
        </div>
        <div className="project-section">
          <h4>{t('sections.solution')}</h4>
          <p>{project.solution.approach}</p>
        </div>
        <div className="project-section">
          <h4>{t('sections.results')}</h4>
          <p>{project.results.businessOutcome}</p>
        </div>
      </div>
    </div>
  )
}
