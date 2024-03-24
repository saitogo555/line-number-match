import Cell from "./Cell"
import { CellState } from "@/types"

export default function HintCell({
  cell,
}: {
  cell: CellState
}) {
  return (
    <Cell className="animate-pulsate-fwd" cell={cell}></Cell>
  )
}