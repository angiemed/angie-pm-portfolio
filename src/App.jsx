import { useView } from './contexts/ViewContext'
import CursorHalo from './components/CursorHalo'
import Header from './components/Header'
import CurtainOverlay from './components/CurtainOverlay'
import WorkView from './components/WorkView'
import About from './components/About'
import ExpertiseView from './components/ExpertiseView'
import Contact from './components/Contact'
import CaseStudyPanel from './components/CaseStudyPanel'
import './App.css'

export default function App() {
  const { view } = useView()

  return (
    <div className="app">
      <CursorHalo />
      <Header />
      <CurtainOverlay />

      <main className="view-shell">
        <div className="view-enter" key={view}>
          {view === 'work' && <WorkView />}
          {view === 'about' && <About />}
          {view === 'expertise' && <ExpertiseView />}
          {view === 'contact' && <Contact />}
        </div>
      </main>

      <CaseStudyPanel />
    </div>
  )
}
