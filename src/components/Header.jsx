import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './Header.css'

const SECTION_IDS = ['home', 'proyectos', 'about', 'contacto']

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'proyectos', label: t('nav.portfolio') },
    { id: 'about', label: t('nav.about') },
    { id: 'contacto', label: t('nav.contact') },
  ]

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">{t('hero.name')}</h1>
            <p className="subtitle-header">{t('hero.title')}</p>
          </div>

          <button
            className={`menu-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <div id="main-nav" className={`header-right${menuOpen ? ' open' : ''}`}>
            <nav className="main-nav" aria-label="Main">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button onClick={toggleLanguage} className="lang-toggle">
              {language === 'en' ? '🇪🇸 Español' : '🇺🇸 English'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
