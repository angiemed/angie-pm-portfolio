import { useMemo, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsData from '../data/projects.json'
import ProjectCard from './ProjectCard'
import CategoryFilter from './CategoryFilter'
import { getCategoryForProject } from '../utils/categoryLookup'
import './Timeline.css'

export default function Timeline() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')

  const projects = useMemo(
    () => [...projectsData.projects].sort((a, b) => a.order - b.order),
    []
  )

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((project) => getCategoryForProject(project.id)?.id === activeCategory)
  }, [projects, activeCategory])

  return (
    <section id="proyectos" className="timeline">
      <div className="container">
        <div className="timeline-header">
          <h2>{t('portfolio.title')}</h2>
          <p className="timeline-subtitle">{t('portfolio.subtitle')}</p>
        </div>

        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          allLabel={t('filter.all')}
        />

        <div className="timeline-container">
          <div className="projects-list">
            {filteredProjects.map((project) => (
              <div key={project.id} className="timeline-item">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
