import { useMemo, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsEn from '../data/projects.json'
import projectsEs from '../data/projects.es.json'
import ProjectCard from './ProjectCard'
import CategoryFilter from './CategoryFilter'
import { getCategoryForProject } from '../utils/categoryLookup'
import './Timeline.css'

const PROJECTS_BY_LANGUAGE = {
  en: projectsEn,
  es: projectsEs,
}

export default function Timeline() {
  const { t, language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')

  const projectsData = PROJECTS_BY_LANGUAGE[language] || projectsEn

  const projects = useMemo(
    () => [...projectsData.projects].sort((a, b) => a.order - b.order),
    [projectsData]
  )

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((project) => getCategoryForProject(project.id)?.id === activeCategory)
  }, [projects, activeCategory])

  return (
    <section id="work-index" className="work-index">
      <div className="work-index-header">
        <h2>{t('portfolio.title')}</h2>
        <p className="work-index-subtitle">{t('portfolio.subtitle')}</p>
      </div>

      <CategoryFilter active={activeCategory} onChange={setActiveCategory} allLabel={t('filter.all')} />

      {filteredProjects.length > 0 ? (
        <div className="work-index-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="work-index-empty">{t('filter.empty')}</p>
      )}
    </section>
  )
}
