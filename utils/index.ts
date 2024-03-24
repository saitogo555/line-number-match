export const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}

export const getColor = (num: number) => {
  const colors: string[] = [
    "",
    "red-300",
    "orange-300",
    "lime-300",
    "green-300",
    "emerald-400",
    "sky-400",
    "indigo-400",
    "purple-400",
    "pink-400",
  ]
  return 0 <= num && num < colors.length ? colors[num] : colors[0]
}