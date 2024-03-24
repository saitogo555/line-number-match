"use client"

import { useEffect, useRef, useState } from "react"
import { CellState, RemoveEvent } from "@/types"
import { deg2rad } from "@/utils"
import { useField } from "@/hooks/useField"
import { useAudio } from "@/hooks/useAudio"
import StartScene from "@/components/scene/StartScene"
import PauseScene from "@/components/scene/PauseScene"
import HelpScene from "@/components/scene/HelpScene"
import GameoverScene from "@/components/scene/GameoverScene"
import GameScene from "@/components/scene/GameScene"

export default function Index() {
  const field = useField()
  const bgmAudio = useAudio("/assets/audio/bgm.mp3", { volume: 0.5, loop: true })
  const gameoverAudio = useAudio("/assets/audio/gameover.mp3")
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isOpenHelp, setIsOpenHelp] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [isGameover, setIsGameover] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [text, setText] = useState<string>("")
  const [countdown, setCountdown] = useState<number>(5)
  const textTimer = useRef<NodeJS.Timeout>()

  const isUnselectable = (): boolean => {
    for (let y = 0; y < field.FIELD_HEIGHT; y++) {
      for (let x = 0; x < field.FIELD_WIDTH; x++) {
        if (!field.isExists(x, y)) {
          continue
        }
        for (let i = 0; i < 8; i++) {
          const cells: CellState[] = []
          const dx: number = Math.round(Math.cos(deg2rad(45 * i)))
          const dy: number = Math.round(Math.sin(deg2rad(45 * i)))
          let mx: number = x + dx
          let my: number = y + dy
          cells.push(field.cells[y][x])
          while (field.isWithinField(mx, my) && !field.isEmpty(mx, my)) {
            if (field.isDisabled(mx, my)) {
              mx += dx
              my += dy
              continue
            }
            cells.push(field.cells[my][mx])
            const isAllSame = cells.every(cell => {
              return cell.num === field.cells[y][x].num
            })
            const isSumTen = cells.reduce((sum, cell) => { return sum + cell.num }, 0) === 10
            const isOverTen = cells.reduce((sum, cell) => { return sum + cell.num }, 0) > 10
            if (isOverTen) {
              break
            } else if (isAllSame || isSumTen) {
              return false
            }
            mx += dx
            my += dy
          }
        }
      }
    }
    return true
  }

  const handleClickStart = () => {
    setIsStarted(true)
    bgmAudio.stop()
    bgmAudio.play()
  }

  const handleClickReplay = () => {
    setIsStarted(true)
    setIsGameover(false)
    setScore(0)
    setText("")
    setCountdown(5)
    field.init()
    bgmAudio.stop()
    bgmAudio.play()
  }

  const handleClickQuit = () => {
    setIsStarted(false)
    setIsPaused(false)
    setIsGameover(false)
    setScore(0)
    setText("")
    setCountdown(5)
    field.init()
    bgmAudio.stop()
  }

  const handleClickHelp = () => {
    setIsOpenHelp(true)
    bgmAudio.pause()
  }

  const handleClickPause = () => {
    setIsPaused(true)
    bgmAudio.pause()
  }

  const handleClickReturn = () => {
    setIsOpenHelp(false)
    setIsPaused(false)
    bgmAudio.play()
  }

  const handleRemove = (e: RemoveEvent) => {
    let rate: number = 0
    switch (e.type) {
      case "SAME_AND_TEN":
        rate = 20
        break;
      case "SAME":
      case "TEN":
        rate = 10
        break;
    }
    setScore(prevScore => rate * e.count + prevScore)
    setText(e.type)
    setCountdown(prevCountdown => prevCountdown - 1)
  }

  useEffect(() => {
    if (!isStarted || isGameover) {
      return
    }
    if (countdown <= 0 || isUnselectable()) {
      if (field.cells[0].some(cell => cell.num > 0)) {
        setIsGameover(true)
        bgmAudio.stop()
        gameoverAudio.play()
        return
      }
      field.addLine()
    }
    if (countdown <= 0) {
      setCountdown(5)
    }
  }, [field.cells, countdown, ])

  useEffect(() => {
    if (text === "") {
      return
    }
    clearTimeout(textTimer.current)
    textTimer.current = setTimeout(() => {
      setText("")
    }, 750)

    return () => {
      clearTimeout(textTimer.current)
    }
  }, [field.cells])

  return (
    <div className="flex flex-col items-center gap-4">
      {isStarted && (
        <GameScene
          score={score}
          text={text}
          countdown={countdown}
          field={field}
          onClickHelp={handleClickHelp}
          onClickPause={handleClickPause}
          onRemove={handleRemove}
        >
        </GameScene>
      )}
      {!isStarted && <StartScene onClickStart={handleClickStart}></StartScene>}
      {isOpenHelp && <HelpScene onClickReturn={handleClickReturn}></HelpScene>}
      {isPaused && <PauseScene onClickReturn={handleClickReturn} onClickQuit={handleClickQuit}></PauseScene>}
      {isGameover && <GameoverScene score={score} onClickReplay={handleClickReplay} onClickQuit={handleClickQuit}></GameoverScene>}
    </div>
  )
}