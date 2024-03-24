import { CellState } from "@/types";
import { getColor } from "@/utils";
import React from "react";

export default function Cell({
  className = "",
  cell,
}: {
  className?: string,
  cell: CellState
}) {
  const colors: string[] = [
    "",
    "text-red-300",
    "text-orange-300",
    "text-lime-300",
    "text-green-300",
    "text-emerald-400",
    "text-sky-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
  ]

  return (
    <div className={`
      flex justify-center items-center w-10 h-10
      ${colors[cell.num]} text-2xl leading-none font-bold
      rounded-full bg-neutral-900 select-none
      ${className} ${cell.disabled ? "!text-neutral-600": ""}
    `}>
      {cell.num > 0 ? cell.num : ""}
    </div>
  )
}