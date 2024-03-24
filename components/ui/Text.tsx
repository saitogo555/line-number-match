export default function Text({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="flex justify-center items-center h-10 text-red-400 text-2xl font-bold">
      {children}
    </div>
  )
}