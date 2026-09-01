import { useView } from '../contexts/ViewContext'
import './CurtainOverlay.css'

// A lime curtain sweeps down the screen carrying the destination section's name,
// then sweeps back up — reading as a page change rather than a content swap.
// Purely decorative: ViewContext already swaps the underlying view on its own timer.
export default function CurtainOverlay() {
  const { curtain } = useView()
  if (curtain === null) return null

  return (
    <div className="curtain">
      <span className="curtain-label">{curtain}</span>
    </div>
  )
}
