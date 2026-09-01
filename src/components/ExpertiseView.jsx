import { useLanguage } from '../contexts/LanguageContext'
import MyContribution from './MyContribution'
import PMToolkit from './PMToolkit'
import ProductPhilosophy from './ProductPhilosophy'
import ProductLessons from './ProductLessons'
import './ExpertiseView.css'

// "Expertise" bundles four content blocks that used to be separate full-width
// scroll sections (contribution, toolkit, philosophy, lessons) into one view,
// stacked with a shared divider rhythm — matching how the nav already grouped
// them under a single "Expertise" item before this redesign.
export default function ExpertiseView() {
  const { t } = useLanguage()

  return (
    <div className="expertise-view">
      <h2 className="expertise-title">{t('nav.expertise')}</h2>
      <div className="expertise-block">
        <MyContribution />
      </div>
      <div className="expertise-block">
        <PMToolkit />
      </div>
      <div className="expertise-block">
        <ProductPhilosophy />
      </div>
      <div className="expertise-block">
        <ProductLessons />
      </div>
    </div>
  )
}
