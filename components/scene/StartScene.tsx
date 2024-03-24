import { MouseEventHandler } from "react";
import Button from "../ui/Button";

export default function StartScene({
  onClickStart
}: {
  onClickStart: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div className="
      fixed top-0 left-0 flex flex-col justify-center items-center
      w-screen h-screen bg-gray-800
    ">
      <h1 className="text-neutral-200 text-6xl text-justify text- font-bold">
        LINE<br />NUMBER<br />MATCH
      </h1>
      <Button className="!text-neutral-200 !shadow-rose-900 !bg-rose-600 mt-6 mb-10" onClick={onClickStart}>
        GAME START
      </Button>
      <div className="flex flex-col items-center gap-1 p-4 rounded-lg text-white bg-slate-700">
        <p>
          <span className="text-rose-300">同じ数字</span>または<span className="text-emerald-300">合計が10</span>になるように繋げよう
        </p>
        <p>
          5ターン経過するか繋げれる数字が無くなったらラインが追加されます
        </p>
        <p>
          ラインが一番上までいって追加出来なくなったらゲームオーバー
        </p>
      </div>
    </div>
  )
}