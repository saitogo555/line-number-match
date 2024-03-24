export default function Countdown({
  countdown
}: {
  countdown: number
}) {
  return (
    <div className="flex justify-center items-center text-neutral-200 text-xs text-center px-6 py-1 rounded-full bg-neutral-900">
      段追加まで
      <span className={`text-lg font-bold px-1 ${countdown <= 1 ? "text-red-400" : ""}`}>
        {countdown}
      </span>
      ターン
    </div>
  )
}