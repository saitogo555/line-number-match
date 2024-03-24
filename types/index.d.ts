export type CellState = {
  num: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  disabled: boolean,
}

export type Coordinate = {
  x: number,
  y: number
}

export type RemoveEvent = {
  type: "SAME" | "TEN" | "SAME_AND_TEN",
  count: number
}
