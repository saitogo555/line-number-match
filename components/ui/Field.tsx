import { type FieldHook } from "@/hooks/useField";
import Cell from "./Cell"
import SelectableCell from "./SelectableCell";
import SelectedCell from "./SelectedCell";
import { RemoveEvent, type Coordinate } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { deg2rad } from "@/utils";
import { useAudio } from "@/hooks/useAudio";
import HintCell from "./HintCell";

export default function Field({
  field,
  onRemove = () => {},
}: {
  field: FieldHook,
  onRemove?: (e: RemoveEvent) => void
}) {
  const selectAudio = useAudio("/assets/audio/select.mp3")
  const removeAudio = useAudio("/assets/audio/remove.mp3")
  const [selectedCoords, setSelectedCoords] = useState<Coordinate[]>([])
  const [selectableCoords, setSelectableCoords] = useState<Coordinate[]>([])
  const [hintCoords, setHintCoords] = useState<Coordinate[]>([])
  const hintTimer = useRef<NodeJS.Timeout>()

  // 座標が隣接してるのか判定
  const isAdjacent = (coord1: Coordinate, coord2: Coordinate): boolean => {
    const coords: Coordinate[] = []
    const dx: number = Math.sign(coord2.x - coord1.x)
    const dy: number = Math.sign(coord2.y - coord1.y)
    let x: number = coord1.x
    let y: number = coord1.y

    // 2セルを含めたセルの並びを取得
    while (field.isWithinField(x, y) && !field.isEmpty(x, y) && !(coord2.x === x && coord2.y === y)) {
      coords.push({ x, y })
      x += dx
      y += dy
    }
    coords.push({...coord2})

    // 無効化されたセルを除いて残ったセルが2つなら隣り合ってると判定
    return coords.filter(coord => !field.cells[coord.y][coord.x].disabled).length === 2
  }

  // 座標が選択されたのか判定
  const isSelected = (x: number, y: number): boolean => {
    return selectedCoords.some(item => item.x === x && item.y === y)
  }

  // 座標が選択可能なのか判定
  const isSelectable = (x: number, y: number): boolean => {
    return selectableCoords.some(item => item.x === x && item.y === y)
  }

  // ヒントになっているか判定
  const isHint = (x: number, y: number): boolean => {
    return hintCoords.some(item => item.x === x && item.y === y)
  }

  // 選択可能なセルを検索
  const searchSelectableCoords = useCallback(() => {
    const newSelectableCoords: Coordinate[] = []
    if (selectedCoords.length === 1) {
      const coord: Coordinate = selectedCoords[0]
      for (let i = 0; i < 8; i++) {
        const dx: number = Math.round(Math.cos(deg2rad(45 * i)))
        const dy: number = Math.round(Math.sin(deg2rad(45 * i)))
        let x: number = coord.x + dx
        let y: number = coord.y + dy
        while (field.isWithinField(x, y)) {
          if (!field.isEmpty(x, y) && !field.isDisabled(x, y)) {
            newSelectableCoords.push({ x, y })
          }
          x += dx
          y += dy
        }
      }
    } else if (selectedCoords.length >= 2) {
      const coord1: Coordinate = selectedCoords[0]
      const coord2: Coordinate = selectedCoords[1]
      const dx: number = Math.sign(coord2.x - coord1.x)
      const dy: number = Math.sign(coord2.y - coord1.y)
      let x: number = coord2.x + dx
      let y: number = coord2.y + dy
      while (field.isWithinField(x, y)) {
        if (!field.isEmpty(x, y) && !field.isDisabled(x, y)) {
          newSelectableCoords.push({ x, y })
        }
        x += dx
        y += dy
      }
    }
    setSelectableCoords(newSelectableCoords)
  }, [field, selectedCoords])

  // 1つの組み合わせのセルを検索
  const searchHintCoords = () => {
    for (let y = 0; y < field.FIELD_HEIGHT; y++) {
      for (let x = 0; x < field.FIELD_WIDTH; x++) {
        if (!field.isExists(x, y)) {
          continue
        }
        for (let i = 0; i < 8; i++) {
          const coords: Coordinate[] = []
          const dx: number = Math.round(Math.cos(deg2rad(45 * i)))
          const dy: number = Math.round(Math.sin(deg2rad(45 * i)))
          let mx: number = x + dx
          let my: number = y + dy
          coords.push({ x, y })
          while (field.isWithinField(mx, my) && !field.isEmpty(mx, my)) {
            if (field.isDisabled(mx, my)) {
              mx += dx
              my += dy
              continue
            }
            coords.push({ x: mx, y: my })
            const isAllSame = coords.every(coord => field.cells[coord.y][coord.x].num === field.cells[y][x].num)
            const isSumTen = coords.reduce((sum, coord) => { return sum + field.cells[coord.y][coord.x].num }, 0) === 10
            const isOverTen = coords.reduce((sum, coord) => { return sum + field.cells[coord.y][coord.x].num }, 0) > 10
            if (isOverTen) {
              break
            } else if (isAllSame || isSumTen) {
              setHintCoords([...coords])
              return
            }
            mx += dx
            my += dy
          }
        }
      }
    }
  }

  // 選択したセルを無効化
  const disableSelectedCells = useCallback(() => {
    if (selectedCoords.length < 2) {
      return
    }

    const isAllSame: boolean = selectedCoords.every(coord => {
      const firstNum: number = field.cells[selectedCoords[0].y][selectedCoords[0].x].num
      const currentNum: number = field.cells[coord.y][coord.x].num
      return firstNum === currentNum
    })
    const isSumTen: boolean = selectedCoords.reduce((sum, coord) => {
      return sum + field.cells[coord.y][coord.x].num
    }, 0) === 10
    if (isAllSame || isSumTen) {
      for (const coord of selectedCoords) {
        field.disableCell(coord.x, coord.y)
      }
      removeAudio.stop()
      removeAudio.play()
    }
    if (isAllSame && isSumTen) {
      onRemove({type: "SAME_AND_TEN", count: selectedCoords.length})
    } else if (isAllSame) {
      onRemove({type: "SAME", count: selectedCoords.length})
    } else if (isSumTen) {
      onRemove({type: "TEN", count: selectedCoords.length})
    }
  }, [field.cells, selectedCoords])

  // 全てのセルが無効化されたラインを削除
  const removeAllDisabledLine = useCallback(() => {
    field.cells.forEach((row, i) => {
      if (row.every(cell => cell.disabled)) {
        field.removeLine(i)
      }
    })
  }, [field.cells])

  const handleMouseDown = (x: number, y: number) => {
    if (!field.isExists(x, y)) {
      return
    }
    selectAudio.stop()
    selectAudio.play()
    setSelectedCoords([{x, y}])
  }

  const handleMouseUp = useCallback(() => {
    disableSelectedCells()
    setSelectedCoords([])
    setSelectableCoords([])
  }, [disableSelectedCells])

  const handleMouseEnter = (x: number, y: number) => {
    if (selectedCoords.length < 1) {
      return
    }

    const lastSelectedCoord: Coordinate = selectedCoords[selectedCoords.length - 1]
    if (!isAdjacent(lastSelectedCoord, { x, y })) {
      return 
    }
    if (isSelected(x, y)) {
      setSelectedCoords(prevSelectedCoords => {
        const newSelectedCoords: Coordinate[] = [...prevSelectedCoords]
        newSelectedCoords.pop()
        return newSelectedCoords
      })
    } else if (isSelectable(x, y)) {
      selectAudio.stop()
      selectAudio.play()
      setSelectedCoords(prevSelectedCoords => {
        const newSelectedCoords: Coordinate[] = [...prevSelectedCoords]
        newSelectedCoords.push({ x, y })
        return newSelectedCoords
      })
    }
  }

  useEffect(() => {
    removeAllDisabledLine()
    setHintCoords([])
    clearTimeout(hintTimer.current)
    hintTimer.current = setTimeout(() => {
      searchHintCoords()
    }, 1000 * 5)
    return () => {
      clearTimeout(hintTimer.current)
    }
  }, [removeAllDisabledLine])

  useEffect(() => {
    searchSelectableCoords()
  }, [searchSelectableCoords])

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseUp])

  return (
    <div className="inline-flex flex-col gap-2">
      {field.cells.map((row, y) => {
        return (
          <div className="flex gap-2" key={y}>
            {row.map((cell, x) => {
              return (
                <div
                  className="rounded-full"
                  onMouseDown={() => handleMouseDown(x, y)}
                  onMouseEnter={() => handleMouseEnter(x, y)}
                  key={`${x}-${y}`}
                >
                  {(() => {
                    if (isSelected(x, y)) {
                      return <SelectedCell cell={cell}></SelectedCell>
                    } else if (isSelectable(x, y)) {
                      return <SelectableCell cell={cell}></SelectableCell>
                    } else if (isHint(x, y)) {
                      return <HintCell cell={cell}></HintCell>
                    } else {
                      return <Cell cell={cell}></Cell>
                    }
                  })()}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}