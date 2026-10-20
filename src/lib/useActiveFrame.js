import { useEffect, useState } from 'react'

// Tracks which [data-frame] element inside `ref` is crossing the middle of the viewport.
export default function useActiveFrame(ref, initial) {
  const [active, setActive] = useState(initial)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.dataset.frame)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    root.querySelectorAll('[data-frame]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref])
  return active
}
