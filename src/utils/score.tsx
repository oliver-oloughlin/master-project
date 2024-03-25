export const ScoreTextMap = new Map([
  [1, "Skummelt"],
  [2, "Ikke Gøy"],
  [3, "Vet Ikke"],
  [4, "Litt Gøy"],
  [5, "Veldig Gøy"],
])

export const ScoreEmojiMap = new Map([
  [1, <>🫣</>],
  [2, <>🙁</>],
  [3, <>😐</>],
  [4, <>🙂</>],
  [5, <>😀</>],
])

export const ScoreBgColorMap = new Map([
  [1, "#fecaca"],
  [2, "#fed7aa"],
  [3, "#fef08a"],
  [4, "#d9f99d"],
  [5, "#a7f3d0"],
])

export const ScoreBorderColorMap = new Map([
  [1, "#fca5a5"],
  [2, "#fdba74"],
  [3, "#fcd34d"],
  [4, "#bef264"],
  [5, "#6ee7b7"],
])

// Force tailwindcss to generate necessary class names
export const __CLASS = `
  bg-[#fecaca]
  bg-[#fed7aa]
  bg-[#fef08a]
  bg-[#d9f99d]
  bg-[#a7f3d0]
  border-[#fca5a5]
  border-[#fdba74]
  border-[#fcd34d]
  border-[#bef264]
  border-[#6ee7b7]
`
