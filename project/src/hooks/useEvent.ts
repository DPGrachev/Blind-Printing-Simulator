import { useEffect } from "react"

export function useKeydownEvent(event: string, handler: (evt: KeyboardEvent) => void, passive = false) {
  useEffect(() => {
    window.addEventListener('keydown', handler, passive)
    return function cleanup() {
      window.removeEventListener('keydown', handler)
    }
  })
}