import { MouseEventHandler } from "react";
import Button from "../ui/Button";

export default function PauseScene({
  onClickReturn,
  onClickQuit,
}: {
  onClickReturn: MouseEventHandler<HTMLButtonElement>,
  onClickQuit: MouseEventHandler<HTMLButtonElement>,
}) {
  return (
    <div className="
      fixed top-0 left-0 flex flex-col justify-center items-center gap-6
      w-screen h-screen bg-opacity-70 bg-gray-900
    ">
      <h1 className="text-neutral-200 text-6xl font-bold">
        PAUSE
      </h1>
      <div className="flex gap-4">
        <Button className="w-48 !text-neutral-200 !shadow-emerald-900 !bg-emerald-600" onClick={onClickReturn}>
          RETURN
        </Button>
        <Button className="w-48 !text-neutral-200 !shadow-red-900 !bg-red-600" onClick={onClickQuit}>
          QUIT
        </Button>
      </div>
    </div>
  )
}