function transitionColor(from: string, to: string, count: number): string[] {
  count = count + 1
  const int = parseInt(from, 16) // 100
  const intTo = parseInt(to, 16) // 50
  const list: string[] = [] // 5
  const diff = int - intTo // 50
  const one = diff / count // 10

  list.push(from)
  for (let i = 1; i <= count; i++) {
    // Ensure hex value is padded if needed (e.g., 'f' -> '0f')
    const hex = Math.floor(int - one * i).toString(16)
    list.push(hex.length === 1 ? '0' + hex : hex)
  }

  return list
}

function transition(from: string, to: string, count: number = 3): string[] {
  const r = from.slice(0, 2)
  const g = from.slice(2, 4)
  const b = from.slice(4, 6)
  const rt = to.slice(0, 2)
  const gt = to.slice(2, 4)
  const bt = to.slice(4, 6)
  const allR = transitionColor(r, rt, count)
  const allG = transitionColor(g, gt, count)
  const allB = transitionColor(b, bt, count)
  const list: string[] = []

  allR.forEach((_, i) => {
    list.push('' + allR[i] + allG[i] + allB[i])
  })

  return list
}

/**
 * Generates an array of hex color strings for a gradient.
 * @param from - Starting color hex (e.g., '#ff0000')
 * @param to - Ending color hex (e.g., '#0000ff')
 * @param count - Number of steps between from and to.
 * @returns Array of hex color strings including from and to.
 */
export function generateGradientStepsCss(from: string, to: string, count: number): string[] {
  from = from.replace('#', '')
  to = to.replace('#', '')
  const values = transition(from, to, count)
  return values.map((val) => '#' + val)
}
