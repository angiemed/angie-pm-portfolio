import { useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsEn from '../data/projects.json'
import projectsEs from '../data/projects.es.json'
import { TOOLS } from '../data/toolIcons'
import './PMToolkit.css'

const PROJECTS_BY_LANGUAGE = {
  en: projectsEn,
  es: projectsEs,
}

// Kept out of the Skills chips — still shown on the individual case studies,
// just not surfaced as a standalone pill here.
const HIDDEN_SKILLS = new Set([
  'algorithm-thinking',
  'safety-compliance',
  'multi-role-design',
  'saas-architecture',
  'system-design',
])

export default function PMToolkit() {
  const { t, language } = useLanguage()
  const projectsData = PROJECTS_BY_LANGUAGE[language] || projectsEn

  // Aggregate every unique skill across all shipped projects, alphabetized for a
  // clean, scannable row.
  const skills = useMemo(() => {
    const seen = new Set()
    projectsData.projects.forEach((project) => {
      ;(project.metadata?.skills || []).forEach((skill) => {
        if (!HIDDEN_SKILLS.has(skill)) seen.add(skill)
      })
    })
    return [...seen].sort((a, b) => a.localeCompare(b))
  }, [projectsData])

  const technical = t('toolkit.technical')
  const technicalItems = Array.isArray(technical) ? technical : []

  return (
    <section id="toolkit" className="toolkit">
      <div className="toolkit-label">{t('toolkit.title')}</div>
      <p className="toolkit-subtitle">{t('toolkit.subtitle')}</p>

      <div className="toolkit-block">
        <h3>{t('toolkit.skillsLabel')}</h3>
        <div className="toolkit-chips">
          {skills.map((skill) => (
            <span key={skill} className="toolkit-chip">
              {skill.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>

      <div className="toolkit-block">
        <h3>{t('toolkit.technicalLabel')}</h3>
        <div className="toolkit-chips">
          {technicalItems.map((item, i) => (
            <span key={i} className="toolkit-chip toolkit-chip-technical">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="toolkit-block">
        <h3>{t('toolkit.toolsLabel')}</h3>
        <div className="toolkit-chips">
          {TOOLS.map((tool) => (
            <span key={tool.name} className="toolkit-chip toolkit-chip-tool">
              <span className="toolkit-chip-icon" style={{ background: `#${tool.color}` }}>
                {tool.path ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={tool.path} fill="#fff" />
                  </svg>
                ) : (
                  tool.initials
                )}
              </span>
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
