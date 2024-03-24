import { MouseEventHandler } from "react";
import Button from "./Button";

export default function CircleButton({
  className = "",
  onClick,
  children
}: {
  className?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  children?: React.ReactNode
}) {
  return (
    <Button
      className={`flex justify-center items-center w-8 h-8 !px-0 !py-0 text-base ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}