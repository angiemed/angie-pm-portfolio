// Shared gates for the "dimensional" interaction layer (tilt, magnetic cursor):
// both are desktop/mouse-only flourishes, and both must fully stand down under
// prefers-reduced-motion. Read once per hook instance — these don't change mid-session
// often enough to warrant a matchMedia listener.
export function isFinePointer() {
  return typeof matchMedia === 'function' && matchMedia('(pointer: fine)').matches
}

export function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function interactionsEnabled() {
  return isFinePointer() && !prefersReducedMotion()
}
