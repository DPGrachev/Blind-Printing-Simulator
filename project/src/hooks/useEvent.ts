import { useEffect } from "react"

export default function useKeydownEvent(event: string, handler: (evt: KeyboardEvent) => void, passive = false) {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener('keydown', handler, passive)

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener('keydown', handler)
    }
  })
}