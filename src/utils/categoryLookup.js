import categoriesData from '../data/categories.json'

const projectToCategory = new Map()
categoriesData.categories.forEach((category) => {
  category.projects.forEach((projectId) => {
    projectToCategory.set(projectId, category)
  })
})

export function getCategoryForProject(projectId) {
  return projectToCategory.get(projectId)
}

export function getCategories() {
  return categoriesData.categories
}
