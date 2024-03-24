import { useEffect, useState } from "react"

export type AudioOptions = {
  volume?: number,
  loop?: boolean,
}

export const useAudio = (src: string, options?: AudioOptions) => {
  const [audio, setAudio] = useState<HTMLAudioElement>()

  const play = () => {
    if (!audio) {
      return
    }
    audio.play()
  }

  const stop = () => {
    if (!audio) {
      return
    }
    audio.pause()
    audio.currentTime = 0
  }

  const pause = () => {
    if (!audio) {
      return
    }
    audio.pause()
  }

  useEffect(() => {
    const newAudio = new Audio(src)
    newAudio.volume = options?.volume || 1
    newAudio.loop = options?.loop || false
    setAudio(newAudio)
  }, [])

  return {
    play,
    stop,
    pause,
  }
}