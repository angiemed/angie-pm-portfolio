import { useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsEn from '../data/projects.json'
import projectsEs from '../data/projects.es.json'
import { getCategoryForProject } from '../utils/categoryLookup'
import Tilt from './Tilt'
import './Clients.css'

const PROJECTS_BY_LANGUAGE = {
  en: projectsEn,
  es: projectsEs,
}

// Clients with a logo for the marquee but no case study written up yet —
// appended after the project-derived list, in this order.
const EXTRA_CLIENTS = [
  { id: 'valentti', order: 100, logo: '/logos/valentti.png', title: 'Valentti' },
  { id: 'meridian', order: 101, logo: '/logos/meridian.png', title: 'Meridian Golf App' },
  { id: 'agritrack', order: 102, logo: '/logos/agritrack.png', title: 'Agritrak' },
]

// The marquee wants the full wordmark (so the name is legible while scrolling);
// the project card badge wants the tighter icon-only mark instead. These
// override project.logo for the carousel only.
const CAROUSEL_LOGO_OVERRIDES = {
  'national-media': '/logos/national-media-wordmark.png',
  pricepicks: '/logos/pricepicks-wordmark.png',
  nevermissed: '/logos/nevermissed-wordmark.png',
  raio: '/logos/raio-wordmark.png',
  awardees: '/logos/awardees-wordmark.png',
}

export default function Clients() {
  const { t, language } = useLanguage()
  const projectsData = PROJECTS_BY_LANGUAGE[language] || projectsEn

  const clients = useMemo(() => {
    return [...projectsData.projects]
      .filter((project) => project.logo)
      .concat(EXTRA_CLIENTS)
      .sort((a, b) => a.order - b.order)
  }, [projectsData])

  if (clients.length === 0) return null

  // Render the strip twice back-to-back so the marquee can loop seamlessly
  // at -50% with no visible seam; the second copy is hidden from assistive tech.
  const track = [...clients, ...clients]

  return (
    <section className="clients">
      <p className="clients-label">{t('clients.label')}</p>

      <div className="clients-marquee">
        <div className="clients-track" role="list" aria-label={t('clients.label')}>
          {track.map((project, i) => {
            const isDuplicate = i >= clients.length
            const accentColor = getCategoryForProject(project.id)?.color || 'var(--lilac)'
            const logoSrc = CAROUSEL_LOGO_OVERRIDES[project.id] || project.logo
            return (
              <Tilt
                as="div"
                depth={0.6}
                key={`${project.id}-${i}`}
                className="clients-tile"
                role="listitem"
                aria-hidden={isDuplicate || undefined}
                style={{ '--accent-color': accentColor }}
                title={project.title}
              >
                <img src={logoSrc} alt={isDuplicate ? '' : project.title} loading="lazy" />
              </Tilt>
            )
          })}
        </div>
      </div>
    </section>
  )
}
