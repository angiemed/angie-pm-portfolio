import { useLanguage } from '../contexts/LanguageContext'
import { getCategories } from '../utils/categoryLookup'
import './CategoryFilter.css'

export default function CategoryFilter({ active, onChange, allLabel }) {
  const { language } = useLanguage()
  const categories = getCategories()

  return (
    <div className="category-filter" role="group" aria-label={allLabel}>
      <button
        type="button"
        className={`filter-chip${active === 'all' ? ' active' : ''}`}
        onClick={() => onChange('all')}
      >
        {allLabel}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`filter-chip${active === category.id ? ' active' : ''}`}
          style={{ '--chip-color': category.color }}
          onClick={() => onChange(category.id)}
        >
          <span className="filter-chip-dot" />
          {category.name[language] || category.name.en}
        </button>
      ))}
    </div>
  )
}
