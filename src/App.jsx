import { useLanguage } from './contexts/LanguageContext'
import Header from './components/Header'
import Clients from './components/Clients'
import Timeline from './components/Timeline'
import About from './components/About'
import MyContribution from './components/MyContribution'
import PMToolkit from './components/PMToolkit'
import ProductPhilosophy from './components/ProductPhilosophy'
import ProductLessons from './components/ProductLessons'
import Contact from './components/Contact'
import './App.css'

function App() {
  const { t } = useLanguage()

  return (
    <div className="app">
      <Header />

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-avatar">
            <img src="/profile.jpg" alt={t('hero.name')} />
          </div>
          <h2>{t('hero.subtitle')}</h2>
          <p className="description">{t('hero.description')}</p>
          <a href="#proyectos" className="cta">{t('hero.cta')}</a>
        </div>
      </section>

      <Clients />
      <Timeline />
      <About />
      <MyContribution />
      <PMToolkit />
      <ProductPhilosophy />
      <ProductLessons />
      <Contact />
    </div>
  )
}

export default App
