import { MouseEventHandler } from "react";
import Button from "../ui/Button";
import img_help1 from "@/public/assets/image/help-1.jpg"
import img_help2 from "@/public/assets/image/help-2.jpg"
import img_help3 from "@/public/assets/image/help-3.jpg"
import img_help4 from "@/public/assets/image/help-4.jpg"

export default function HelpScene({
  onClickReturn,
}: {
  onClickReturn: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div className="
      fixed top-0 left-0 flex flex-col justify-center items-center gap-6 p-4
      w-screen h-screen bg-opacity-70 bg-gray-900
    ">
      <h1 className="text-neutral-200 text-6xl font-bold">
        HELP
      </h1>
      <div className="flex flex-col gap-6 w-full max-w-lg text-neutral-200 p-4 rounded-lg bg-gray-800">
        <div className="flex justify-between gap-4">
          <h2 className="flex gap-2 text-neutral-200 text-lg font-bold">
            <span>1.</span>軸となる数字をクリックし続ける
          </h2>
          <img className="w-1/4" src={img_help1.src} alt="help image 1" />
        </div>
        <div className="flex justify-between gap-4">
          <h2 className="flex gap-2 text-neutral-200 text-lg font-bold">
            <span>2.</span>8方向の好きな方向へ直線でドラッグ
          </h2>
          <img className="w-1/4" src={img_help2.src} alt="help image 2" />
        </div>
        <div className="flex justify-between gap-4">
          <h2 className="flex gap-2 text-neutral-200 text-lg font-bold">
            <span>3.</span>同じ数字又は合計10になるように繋げる
          </h2>
          <img className="w-1/4" src={img_help3.src} alt="help image 3" />
        </div>
        <div className="flex justify-between gap-4">
          <h2 className="flex gap-2 text-neutral-200 text-lg font-bold">
            <span>4.</span>クリックを離す
          </h2>
          <img className="w-1/4" src={img_help4.src} alt="help image 4" />
        </div>
      </div>
      <Button className="w-48 !text-neutral-200 !shadow-emerald-900 !bg-emerald-600" onClick={onClickReturn}>
        RETURN
      </Button>
    </div>
  )
}