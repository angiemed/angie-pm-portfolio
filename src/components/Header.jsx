import { useLanguage } from '../contexts/LanguageContext'
import { useView } from '../contexts/ViewContext'
import { BRAND_NAME } from '../constants'
import './Header.css'

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage()
  const { view, go } = useView()

  const navItems = [
    { id: 'work', num: '01', label: t('nav.portfolio') },
    { id: 'about', num: '02', label: t('nav.about') },
    { id: 'expertise', num: '03', label: t('nav.expertise') },
    { id: 'contact', num: '04', label: t('nav.contact') },
  ]

  return (
    <header className="nav-header">
      <button type="button" className="nav-logo" data-magnet="" onClick={() => go('work', t('nav.portfolio'))}>
        <span className="nav-logo-text">{BRAND_NAME}</span>
        <span className="nav-logo-dot" />
      </button>

      <nav className="nav-links" aria-label="Main">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            data-magnet=""
            className={`nav-link${view === item.id ? ' active' : ''}`}
            onClick={() => go(item.id, item.label)}
          >
            <span className="nav-link-num">{item.num}</span>
            <span className="nav-link-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <button type="button" data-magnet="" className="lang-toggle" onClick={toggleLanguage}>
        {language === 'en' ? 'ES' : 'EN'}
      </button>
    </header>
  )
}
