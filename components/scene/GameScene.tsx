import CircleButton from "../ui/CircleButton";
import Countdown from "../ui/Countdown";
import Score from "../ui/Score";
import Text from "../ui/Text";
import Field from "../ui/Field"
import { MouseEventHandler } from "react";
import { FieldHook } from "@/hooks/useField";
import { RemoveEvent } from "@/types";

export default function GameScene({
  score,
  text,
  countdown,
  field,
  onClickHelp,
  onClickPause,
  onRemove,
}: {
  score: number,
  text: string,
  countdown: number,
  field: FieldHook,
  onClickHelp: MouseEventHandler<HTMLButtonElement>,
  onClickPause: MouseEventHandler<HTMLButtonElement>,
  onRemove: ((e: RemoveEvent) => void)
}) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center w-full">
          <CircleButton className="!text-neutral-300 !bg-cyan-600 !text-xl" onClick={onClickHelp}>?</CircleButton>
          <Score score={score}></Score>
          <CircleButton className="!text-neutral-300 !bg-red-600" onClick={onClickPause}>■</CircleButton>
        </div>
        <Text>{text.replaceAll("_", " ")}</Text>
      </div>
      <Field field={field} onRemove={(e) => onRemove(e)}></Field>
      <Countdown countdown={countdown}></Countdown>
    </>
  )
}