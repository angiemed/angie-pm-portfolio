const STOPWORDS = new Set(['by', 'of', 'and', 'the', 'in', 'for', 'a'])

/**
 * Derives a 2-letter fallback badge from a project title, e.g.
 * "JalTech – E-Commerce Advisory Platform" -> "JT"
 * "Gold by Gold – Gold Traceability..."   -> "GG"
 */
export function getInitials(title) {
  const name = title.split(/[–-]/)[0].trim()
  const words = name.split(/\s+/).filter(Boolean)

  if (words.length === 1) {
    const word = words[0]
    const innerCap = word.slice(1).match(/[A-Z]/)
    if (innerCap) {
      return (word[0] + innerCap[0]).toUpperCase()
    }
    return word.slice(0, 2).toUpperCase()
  }

  const meaningful = words.filter((w) => !STOPWORDS.has(w.toLowerCase()))
  const source = meaningful.length >= 2 ? meaningful : words
  return (source[0][0] + source[Math.min(1, source.length - 1)][0]).toUpperCase()
}
