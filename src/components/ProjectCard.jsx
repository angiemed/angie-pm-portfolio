import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useView } from '../contexts/ViewContext'
import { getCategoryForProject } from '../utils/categoryLookup'
import { getInitials } from '../utils/initials'
import Tilt from './Tilt'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
  const { language } = useLanguage()
  const { openCase } = useView()
  const [logoFailed, setLogoFailed] = useState(false)

  const category = getCategoryForProject(project.id)
  const accentColor = category?.color || 'var(--lilac)'
  const showLogo = Boolean(project.logo) && !logoFailed
  const num = String(project.order).padStart(2, '0')

  return (
    <Tilt
      as="button"
      type="button"
      depth={1}
      magnetLabel
      onClick={() => openCase(project.id)}
      className="project-card"
      style={{ '--accent-color': accentColor }}
    >
      <span className="project-card-glow" aria-hidden="true" />

      <span className="project-card-top">
        <span className="project-card-badge">
          {showLogo ? (
            <img src={project.logo} alt="" onError={() => setLogoFailed(true)} />
          ) : (
            <span className="project-card-initials">{getInitials(project.title)}</span>
          )}
        </span>
        <span className="project-card-meta">
          <span className="project-card-num">
            {num} / {project.status.toUpperCase()}
          </span>
          <span className="project-card-category" style={{ borderColor: accentColor, color: accentColor }}>
            {(category?.name?.[language] || project.domain).toUpperCase()}
          </span>
        </span>
      </span>

      <span className="project-card-body">
        <span className="project-card-domain">
          <span className="project-card-rule" style={{ background: accentColor }} />
          {project.domain}
        </span>
        <span className="project-card-title">{project.title}</span>
        <span className="project-card-headline">{project.shortDescription}</span>
        <span className="project-card-footer">
          <span className="project-card-kpi">{project.results?.headline}</span>
          <span className="project-card-arrow">↗</span>
        </span>
      </span>
    </Tilt>
  )
}
