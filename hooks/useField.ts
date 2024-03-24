import { CellState } from "@/types"
import { useEffect, useState } from "react"

export type FieldHook = {
  FIELD_WIDTH: number
  FIELD_HEIGHT: number
  cells: CellState[][]
  init: () => void
  isWithinField: (x: number, y: number) => boolean
  isEmpty: (x: number, y: number) => boolean
  isDisabled: (x: number, y: number) => boolean
  isExists: (x: number, y: number) => boolean
  addLine: () => void
  removeLine: (index: number) => void
  disableCell: (x: number, y: number) => void
}

export const useField = (): FieldHook => {
  const FIELD_WIDTH: number = 8
  const FIELD_HEIGHT: number = 10
  const [cells, setCells] = useState<CellState[][]>([[]])

  const init = () => {
    const newCells: CellState[][] = []
    for (let n = 0; n < FIELD_HEIGHT - 3; n++) {
      newCells.push([...Array(FIELD_WIDTH)].map(() => {
        return { num: 0, disabled: false } as CellState
      }))
    }
    for (let n = FIELD_HEIGHT - 3; n < FIELD_HEIGHT; n++) {
      newCells.push([...Array(FIELD_WIDTH)].map(() => {
        return { num: Math.floor(Math.random() * 9) + 1, disabled: false } as CellState
        // return {num: 1, disabled: false}
      }))
    }
    setCells(newCells)
  }

  const isWithinField = (x: number, y: number): boolean => {
    return 0 <= x && x < FIELD_WIDTH && 0 <= y && y < FIELD_HEIGHT 
  }

  const isEmpty = (x: number, y: number): boolean => {
    return cells[y][x].num === 0
  }

  const isDisabled = (x: number, y: number): boolean => {
    return cells[y][x].disabled
  }

  const isExists = (x: number, y: number): boolean => {
    return isWithinField(x, y) && !isEmpty(x, y) && !isDisabled(x, y)
  }

  const addLine = () => {
    setCells(prevCells => {
      const newCells: CellState[][] = [...prevCells].map(row => [...row])
      newCells.splice(0, 1)
      newCells.push([...Array(FIELD_WIDTH)].map(() => {
        return { num: Math.floor(Math.random() * 9) + 1, disabled: false } as CellState
      }))
      return newCells
    })
  }

  const removeLine = (index: number) => {
    setCells(prevCells => {
      const newCells: CellState[][] = [...prevCells].map(row => [...row])
      newCells.splice(index, 1)
      newCells.unshift([...Array(FIELD_WIDTH)].map(_ => ({ num: 0, disabled: false })))
      return newCells
    })
  }

  const disableCell = (x: number, y: number) => {
    setCells(prevCells => {
      const newCells = [...prevCells].map(row => [...row])
      newCells[y][x].disabled = true
      return newCells
    })
  }

  useEffect(() => {
    init()
  }, [])

  return {
    FIELD_WIDTH,
    FIELD_HEIGHT,
    cells,
    init,
    isWithinField,
    isEmpty,
    isDisabled,
    isExists,
    addLine,
    removeLine,
    disableCell
  }
}