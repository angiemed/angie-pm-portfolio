import { useLanguage } from '../contexts/LanguageContext'
import './Contact.css'

const EMAIL = 'angelica.p205@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/maria-angelica-avila-pena/'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <>
      <section id="contacto" className="contact">
        <div className="container">
          <h2>{t('contact.title')}</h2>
          <p className="contact-subtitle">{t('contact.subtitle')}</p>

          <span className="contact-availability">
            <span className="contact-availability-dot" aria-hidden="true" />
            {t('contact.availability')}
          </span>

          <div className="contact-links">
            <a className="contact-link" href={`mailto:${EMAIL}`}>
              <span className="contact-link-icon" aria-hidden="true">✉️</span>
              <span className="contact-link-label">{t('contact.emailLabel')}</span>
              <span className="contact-link-value">{EMAIL}</span>
            </a>
            <a
              className="contact-link"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-link-icon" aria-hidden="true">🔗</span>
              <span className="contact-link-label">{t('contact.linkedinLabel')}</span>
              <span className="contact-link-value">linkedin.com/in/maria-angelica-avila-pena</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>{t('footer.builtWith')}</p>
      </footer>
    </>
  )
}
