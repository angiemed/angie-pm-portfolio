import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Drives the app-shell: which top-level view is showing (work / about / expertise /
// contact), the "curtain" page-transition overlay between views, and which project's
// case study is open in the side panel. Kept as one context so the header (which
// triggers navigation), the project grid (which opens cases), and the case panel
// (which reads/closes them) don't need prop-drilling through App.
const VIEWS = ['work', 'about', 'expertise', 'contact']
const HASH_TO_VIEW = { '': 'work', work: 'work', about: 'about', expertise: 'expertise', contact: 'contact' }

function viewFromHash() {
  if (typeof window === 'undefined') return 'work'
  const hash = window.location.hash.replace('#', '')
  return HASH_TO_VIEW[hash] || 'work'
}

export const ViewContext = createContext(null)

export function ViewProvider({ children }) {
  const [view, setView] = useState(viewFromHash)
  const [curtain, setCurtain] = useState(null)
  const [openProjectId, setOpenProjectId] = useState(null)
  const [activeTab, setActiveTab] = useState('problem')
  const timers = useRef({})

  useEffect(() => {
    const onPop = () => setView(viewFromHash())
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('hashchange', onPop)
    }
  }, [])

  useEffect(() => () => {
    clearTimeout(timers.current.c1)
    clearTimeout(timers.current.c2)
  }, [])

  const go = useCallback(
    (nextView, label) => {
      if (!VIEWS.includes(nextView)) return
      if (nextView === view) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      clearTimeout(timers.current.c1)
      clearTimeout(timers.current.c2)
      setCurtain(label || '')
      timers.current.c1 = setTimeout(() => {
        setView(nextView)
        window.scrollTo({ top: 0 })
        const url = nextView === 'work' ? '#' : `#${nextView}`
        window.history.pushState(null, '', url)
      }, 400)
      timers.current.c2 = setTimeout(() => setCurtain(null), 1000)
    },
    [view]
  )

  const openCase = useCallback((id) => {
    setOpenProjectId(id)
    setActiveTab('problem')
    document.body.style.overflow = 'hidden'
  }, [])

  const closeCase = useCallback(() => {
    setOpenProjectId(null)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && openProjectId) closeCase()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openProjectId, closeCase])

  const value = {
    view,
    go,
    curtain,
    openProjectId,
    openCase,
    closeCase,
    activeTab,
    setActiveTab,
  }

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

export function useView() {
  const ctx = useContext(ViewContext)
  if (!ctx) throw new Error('useView debe usarse dentro de ViewProvider')
  return ctx
}
