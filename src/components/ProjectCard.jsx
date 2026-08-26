import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { getCategoryForProject } from '../utils/categoryLookup'
import { getInitials } from '../utils/initials'
import './ProjectCard.css'

const TABS = ['problem', 'solution', 'myRole', 'results', 'retrospective']

export default function ProjectCard({ project }) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('problem')
  const [logoFailed, setLogoFailed] = useState(false)
  const tabRefs = useRef([])

  const category = getCategoryForProject(project.id)
  const accentColor = category?.color || 'var(--lilac-dark)'
  const showLogo = Boolean(project.logo) && !logoFailed

  const handleToggle = () => {
    setExpanded((prev) => !prev)
    if (!expanded) setActiveTab('problem')
  }

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length
    if (nextIndex !== null) {
      event.preventDefault()
      setActiveTab(TABS[nextIndex])
      tabRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div className={`project-card${expanded ? ' is-expanded' : ''}`} style={{ '--accent-color': accentColor }}>
      <div className="project-header" onClick={handleToggle} role="presentation">
        <div className="project-visual">
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

        {project.results?.headline && (
          <div className="project-headline" title={t('sections.results')}>
            <span className="project-headline-dot" />
            {project.results.headline}
          </div>
        )}

        <button
          type="button"
          className="expand-btn"
          onClick={(event) => {
            event.stopPropagation()
            handleToggle()
          }}
          aria-expanded={expanded}
          aria-label={expanded ? t('labels.collapse') : t('portfolio.viewDetails')}
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      <p className="project-description">{project.shortDescription}</p>

      <div className="project-tags">
        <span className="tag">{project.domain}</span>
        <span className="tag tag-status">{project.status}</span>
        {project.metadata?.teamSize && (
          <span className="tag tag-outline">
            {project.metadata.teamSize} {t('labels.teamSize')}
          </span>
        )}
      </div>

      <div className={`project-expanded${expanded ? ' active' : ''}`}>
        <div className="project-tabbar" role="tablist" aria-label={project.title}>
          {TABS.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              type="button"
              role="tab"
              id={`tab-${project.id}-${tab}`}
              aria-selected={activeTab === tab}
              aria-controls={`panel-${project.id}-${tab}`}
              tabIndex={activeTab === tab ? 0 : -1}
              className={`tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {t(`sections.${tab}`)}
            </button>
          ))}
        </div>

        {expanded && (
          <div
            className="project-panel fade-in-up"
            role="tabpanel"
            id={`panel-${project.id}-${activeTab}`}
            aria-labelledby={`tab-${project.id}-${activeTab}`}
            key={activeTab}
          >
            {activeTab === 'problem' && <ProblemPanel project={project} t={t} />}
            {activeTab === 'solution' && <SolutionPanel project={project} t={t} />}
            {activeTab === 'myRole' && <RolePanel project={project} t={t} />}
            {activeTab === 'results' && <ResultsPanel project={project} t={t} />}
            {activeTab === 'retrospective' && <RetrospectivePanel project={project} t={t} />}
          </div>
        )}

        <div className="project-footer-meta">
          <span className="meta-chip">
            <strong>{t('labels.companyType')}:</strong> {project.metadata?.companyType}
          </span>
          <div className="skill-chips">
            {project.metadata?.skills?.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProblemPanel({ project, t }) {
  const { problem } = project
  return (
    <div className="panel-grid">
      <InfoBlock label={t('sections.problem')} text={problem.situation} />
      <InfoBlock label={t('labels.businessContext')} text={problem.businessContext} />
      <InfoBlock label={t('labels.userPain')} text={problem.userPain} />
      {problem.metric && (
        <div className="metric-badge">
          <span className="metric-badge-label">{t('labels.targetMetric')}</span>
          <span>{problem.metric}</span>
        </div>
      )}
    </div>
  )
}

function SolutionPanel({ project, t }) {
  const { solution } = project
  return (
    <div className="panel-grid">
      <InfoBlock label={t('sections.solution')} text={solution.approach} />

      {solution.keyFeatures?.length > 0 && (
        <div className="info-block">
          <h5>{t('labels.keyFeatures')}</h5>
          <ul className="feature-list">
            {solution.keyFeatures.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {solution.technicalDecisions && (
        <div className="decision-card">
          <h5>{t('labels.technicalDecision')}</h5>
          <p>{solution.technicalDecisions.decision}</p>
          <div className="decision-row">
            <span className="decision-tag">{t('labels.rationale')}</span>
            <p>{solution.technicalDecisions.rationale}</p>
          </div>
          <div className="decision-row">
            <span className="decision-tag decision-tag-alt">{t('labels.tradeoff')}</span>
            <p>{solution.technicalDecisions.tradeoff}</p>
          </div>
        </div>
      )}

      {solution.mvpScope && <InfoBlock label={t('labels.mvpScope')} text={solution.mvpScope} />}
    </div>
  )
}

function RolePanel({ project, t }) {
  const { myRole } = project
  return (
    <div className="panel-grid panel-grid-two">
      {myRole.responsibilities?.length > 0 && (
        <div className="info-block">
          <h5>{t('labels.responsibilities')}</h5>
          <ul className="bullet-list">
            {myRole.responsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {myRole.keyDecisions?.length > 0 && (
        <div className="info-block">
          <h5>{t('labels.keyDecisions')}</h5>
          <ul className="bullet-list bullet-list-accent">
            {myRole.keyDecisions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function ResultsPanel({ project, t }) {
  const { results } = project
  const metricEntries = results.metrics ? Object.values(results.metrics) : []
  return (
    <div className="panel-grid">
      {results.launched && (
        <div className="metric-badge">
          <span className="metric-badge-label">{t('labels.launched')}</span>
          <span>{results.launched}</span>
        </div>
      )}

      {metricEntries.length > 0 && (
        <div className="stat-grid">
          {metricEntries.map((metric, i) => (
            <div className="stat-card" key={i}>
              <span className="stat-card-index">{String(i + 1).padStart(2, '0')}</span>
              <p>{metric}</p>
            </div>
          ))}
        </div>
      )}

      <InfoBlock label={t('labels.businessOutcome')} text={results.businessOutcome} />
    </div>
  )
}

function RetrospectivePanel({ project, t }) {
  const { retrospective } = project
  return (
    <div className="retro-grid">
      <div className="retro-card retro-worked">
        <h5>{t('labels.whatWorked')}</h5>
        <p>{retrospective.whatWorked}</p>
      </div>
      <div className="retro-card retro-didnt">
        <h5>{t('labels.whatDidnt')}</h5>
        <p>{retrospective.whatDidnt}</p>
      </div>
      <div className="retro-card retro-next">
        <h5>{t('labels.nextTime')}</h5>
        <p>{retrospective.nextTime}</p>
      </div>
    </div>
  )
}

function InfoBlock({ label, text }) {
  if (!text) return null
  return (
    <div className="info-block">
      <h5>{label}</h5>
      <p>{text}</p>
    </div>
  )
}
