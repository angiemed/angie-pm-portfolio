import { useLanguage } from '../contexts/LanguageContext'
import { EMAIL, LINKEDIN_URL, LINKEDIN_HANDLE, LOCATION, CV_URL, CV_FILENAME } from '../constants'
import Tilt from './Tilt'
import './Contact.css'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <>
      <section id="contacto" className="contact-view">
        <div className="contact-availability">
          <span className="contact-availability-dot" />
          {t('contact.availability')}
        </div>

        <h2 className="contact-title">{t('contact.title')}</h2>
        <p className="contact-subtitle">{t('contact.subtitle')}</p>

        <div className="contact-grid">
          <Tilt as="a" depth={0.8} href={`mailto:${EMAIL}`} className="contact-card">
            <span className="contact-card-label">{t('contact.emailLabel')}</span>
            <span className="contact-card-value">{EMAIL}</span>
          </Tilt>
          <Tilt
            as="a"
            depth={0.8}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <span className="contact-card-label">{t('contact.linkedinLabel')}</span>
            <span className="contact-card-value">{LINKEDIN_HANDLE} ↗</span>
          </Tilt>
          <Tilt as="a" depth={0.8} href={CV_URL} download={CV_FILENAME} className="contact-card">
            <span className="contact-card-label">CV</span>
            <span className="contact-card-value">{t('hero.cvDownload')} ↓</span>
          </Tilt>
        </div>

        <div className="contact-footer-line">
          {LOCATION} · UTC−5
        </div>
      </section>

      <footer className="site-footer">
        <p>{t('footer.builtWith')}</p>
      </footer>
    </>
  )
}
