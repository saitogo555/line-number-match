import Cell from "./Cell"
import { CellState } from "@/types"

export default function SelectableCell({
  cell,
}: {
  cell: CellState 
}) {
  return (
    <Cell className="!bg-neutral-700" cell={cell}></Cell>
  )
}