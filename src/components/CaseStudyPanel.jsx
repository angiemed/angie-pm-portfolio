import { useEffect, useMemo, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useView } from '../contexts/ViewContext'
import projectsEn from '../data/projects.json'
import projectsEs from '../data/projects.es.json'
import { getCategoryForProject } from '../utils/categoryLookup'
import Tilt from './Tilt'
import './CaseStudyPanel.css'

const PROJECTS_BY_LANGUAGE = {
  en: projectsEn,
  es: projectsEs,
}

const TABS = ['problem', 'solution', 'myRole', 'results', 'learnings']

export default function CaseStudyPanel() {
  const { t, language } = useLanguage()
  const { openProjectId, closeCase, activeTab, setActiveTab, openCase } = useView()
  const scrollRef = useRef(null)

  const projects = useMemo(() => {
    const data = PROJECTS_BY_LANGUAGE[language] || projectsEn
    return [...data.projects].sort((a, b) => a.order - b.order)
  }, [language])

  const index = projects.findIndex((p) => p.id === openProjectId)
  const project = index >= 0 ? projects[index] : null
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [openProjectId])

  if (!project) return null

  const category = getCategoryForProject(project.id)
  const accentColor = category?.color || 'var(--lilac)'
  const num = String(project.order).padStart(2, '0')

  return (
    <div className="case-overlay" onClick={closeCase}>
      <div
        className="case-panel"
        data-case-scroll=""
        ref={scrollRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="case-panel-header">
          <div className="case-panel-headerbar">
            <span className="case-panel-eyebrow">
              {t('panel.caseStudy')} · {num}
            </span>
            <button type="button" data-magnet="" className="case-panel-close" onClick={closeCase}>
              {t('panel.close')} ✕
            </button>
          </div>
          <div className="case-panel-tabs" role="tablist" aria-label={project.title}>
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`case-panel-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {t(`sections.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="case-panel-intro">
          <span className="case-panel-badge">
            <img src={project.logo} alt="" />
          </span>
          <span className="case-panel-intro-meta">
            <span className="case-panel-intro-line">
              {project.domain} · {project.duration}
            </span>
            <span className="case-panel-intro-sub">
              {project.metadata?.companyType} · {project.metadata?.teamSize} {t('labels.teamSize')}
            </span>
          </span>
        </div>
        <h2 className="case-panel-title">{project.title}</h2>
        <p className="case-panel-description">{project.shortDescription}</p>

        <div className="case-panel-body">
          {activeTab === 'problem' && <ProblemTab project={project} t={t} />}
          {activeTab === 'solution' && <SolutionTab project={project} t={t} />}
          {activeTab === 'myRole' && <RoleTab project={project} t={t} />}
          {activeTab === 'results' && <ResultsTab project={project} t={t} />}
          {activeTab === 'learnings' && <LearningsTab project={project} />}

          <Tilt
            as="button"
            type="button"
            depth={0.5}
            className="case-panel-next"
            onClick={() => next && openCase(next.id)}
            style={{ '--accent-color': accentColor }}
          >
            <span className="case-panel-next-label">{t('panel.next')}</span>
            <span className="case-panel-next-name">{next?.title.split(/[–-]/)[0].trim()} →</span>
          </Tilt>
        </div>
      </div>
    </div>
  )
}

function InfoBlock({ label, text }) {
  if (!text) return null
  return (
    <div className="case-info-block">
      <h5>{label}</h5>
      <p>{text}</p>
    </div>
  )
}

function ProblemTab({ project, t }) {
  const { problem } = project
  return (
    <div className="case-tab-panel">
      <p className="case-lead">{problem.situation}</p>
      <div className="case-grid-2">
        <div className="case-rule-block">
          <div className="case-rule-label">{t('labels.businessContext')}</div>
          <p>{problem.businessContext}</p>
        </div>
        <div className="case-rule-block">
          <div className="case-rule-label">{t('labels.userPain')}</div>
          <p>{problem.userPain}</p>
        </div>
      </div>
      {problem.metric && (
        <div className="case-target">
          {t('labels.targetMetric')}: {problem.metric}
        </div>
      )}
    </div>
  )
}

function SolutionTab({ project, t }) {
  const { solution } = project
  return (
    <div className="case-tab-panel">
      <p className="case-lead">{solution.approach}</p>
      {solution.keyFeatures?.length > 0 && (
        <div className="case-feature-list">
          {solution.keyFeatures.map((feature, i) => (
            <div className="case-feature-row" key={i}>
              <span className="case-feature-mark">—</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}
      {solution.technicalDecisions && (
        <div className="case-decision-card">
          <div className="case-rule-label">{t('labels.technicalDecision')}</div>
          <p className="case-decision-text">{solution.technicalDecisions.decision}</p>
          <div className="case-grid-2">
            <div>
              <div className="case-rule-label case-rule-label-lime">{t('labels.rationale')}</div>
              <p>{solution.technicalDecisions.rationale}</p>
            </div>
            <div>
              <div className="case-rule-label case-rule-label-rose">{t('labels.tradeoff')}</div>
              <p>{solution.technicalDecisions.tradeoff}</p>
            </div>
          </div>
        </div>
      )}
      {solution.mvpScope && (
        <p className="case-scope">
          <span className="case-rule-label case-rule-label-inline">{t('labels.mvpScope')}</span> — {solution.mvpScope}
        </p>
      )}
    </div>
  )
}

function RoleTab({ project, t }) {
  const { myRole } = project
  return (
    <div className="case-tab-panel">
      <div className="case-role-title">{myRole.title}</div>
      <div className="case-grid-2">
        {myRole.responsibilities?.length > 0 && (
          <div>
            <div className="case-rule-label">{t('labels.responsibilities')}</div>
            <div className="case-bullet-list">
              {myRole.responsibilities.map((item, i) => (
                <p key={i} className="case-bullet">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
        {myRole.keyDecisions?.length > 0 && (
          <div>
            <div className="case-rule-label">{t('labels.keyDecisions')}</div>
            <div className="case-bullet-list">
              {myRole.keyDecisions.map((item, i) => (
                <p key={i} className="case-bullet case-bullet-accent">
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ResultsTab({ project, t }) {
  const { results } = project
  const metricEntries = results.metrics ? Object.values(results.metrics) : []
  return (
    <div className="case-tab-panel">
      <div className="case-headline-result">{results.headline}</div>
      {metricEntries.length > 0 && (
        <div className="case-stat-grid">
          {metricEntries.map((metric, i) => (
            <div className="case-stat-card" key={i}>
              <div className="case-stat-index">{String(i + 1).padStart(2, '0')}</div>
              <div>{metric}</div>
            </div>
          ))}
        </div>
      )}
      <InfoBlock label={t('labels.businessOutcome')} text={results.businessOutcome} />
    </div>
  )
}

function LearningsTab({ project }) {
  const learnings = project.learnings || []
  return (
    <div className="case-tab-panel case-learnings">
      {learnings.map((item, i) => (
        <p key={i} className="case-learning">
          {item}
        </p>
      ))}
    </div>
  )
}
