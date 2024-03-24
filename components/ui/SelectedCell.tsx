import Cell from "./Cell"
import { CellState } from "@/types"

export default function SelectedCell({
  cell,
}: {
  cell: CellState
}) {
  const colors: string[] = [
    "",
    "!bg-red-300",
    "!bg-orange-300",
    "!bg-lime-300",
    "!bg-green-300",
    "!bg-emerald-400",
    "!bg-sky-400",
    "!bg-indigo-400",
    "!bg-purple-400",
    "!bg-pink-400",
  ]

  return (
    <Cell className={`!text-white ${colors[cell.num]}`} cell={cell}></Cell>
  )
}