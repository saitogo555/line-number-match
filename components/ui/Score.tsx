export default function Score({
  score,
}: {
  score: number,
}) {
  return (
    <div className="inline-flex justify-center w-28 text-neutral-200 text-xl py-1 rounded-full bg-neutral-900">
      {score}
    </div>
  )
}