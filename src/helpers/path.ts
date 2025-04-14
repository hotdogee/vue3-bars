import { generateGradientStepsCss } from './gradient'

// Types
interface Point {
  x: number
  y: number
  height: number
  title: string | number
  zeroLineY: number // Make zeroLineY required
}

interface Boundary {
  minX: number
  minY: number
  maxX: number
  maxY: number
  minBarHeight: number
}

interface PointInput {
  value: number
  title?: string | number
}

interface BarProps {
  gradient: string[]
  barWidth?: number
  padding?: number
  rounding?: number
  growDuration: number
}

interface LabelProps {
  labelData: (string | number)[]
  labelRotate: number
  labelColor: string
  labelSize: number
  labelHeight: number
  minX: number
  minY: number
  maxX: number
  maxY: number
}

// Return type for genBarsData
interface BarData {
  id: string
  fill: string
  x: number
  y: number
  width: number
  height: number
  rx: number
  ry: number
  title: string | number
  growDuration: number
}

// Return type for genLabelsData
interface LabelData {
  x: number
  y: number
  transformText: string
  text: string | number
  style: string
  title: string | number
}

/**
 * Calculate the coordinate points for the bars.
 */
export function genPoints(
  inArr: (number | PointInput)[],
  { minX, minY, maxX, maxY, minBarHeight }: Boundary,
  barWidth: number,
  { max, min }: { max: number; min: number },
  labelProps: LabelProps, // Used to check if labels exist
): Point[] {
  const arr = inArr.map((item) => (typeof item === 'number' ? item : item.value))
  const minValue = Math.min(...arr, min === Infinity ? (arr.length ? Math.min(...arr) : 0) : min)
  const maxValue = Math.max(...arr, max === -Infinity ? (arr.length ? Math.max(...arr) : 0) : max)
  const absMaxVal = Math.abs(maxValue)
  const absMinVal = Math.abs(minValue)
  const gridX = arr.length > 1 ? (maxX - minX - barWidth) / (arr.length - 1) : maxX - minX // Handle single data point
  const labelHeight = labelProps.labelData.length > 0 ? labelProps.labelHeight : 0 // Adjust space if labels are present

  let delta = 0
  if (minValue < 0 && maxValue <= 0) {
    // Handle case where all values are negative or zero
    delta = absMinVal
  } else if (minValue < 0 && maxValue > 0) {
    delta = absMinVal + absMaxVal
  } else {
    // minValue >= 0 && maxValue >= 0
    delta = maxValue
  }

  // Prevent division by zero if delta is 0 and handle case where maxY equals minY
  const availableHeight = maxY - minY - labelHeight
  const heightMultiplier = delta !== 0 && availableHeight > 0 ? availableHeight / delta : 1

  // Adjust y baseline if minimum value causes bars to be too small
  const yAdjust =
    minValue >= 0 && minValue * heightMultiplier < minBarHeight
      ? 0
      : minValue < 0 && absMinVal * heightMultiplier < minBarHeight
        ? minBarHeight - absMinVal * heightMultiplier
        : 0

  const zeroLineY =
    minValue < 0 ? maxY - labelHeight - absMinVal * heightMultiplier : maxY - labelHeight

  return arr.map((value, index) => {
    const title =
      typeof inArr[index] === 'number'
        ? String(inArr[index])
        : ((inArr[index] as PointInput).title ?? String(value))
    const height = Math.abs(value) * heightMultiplier
    // Ensure minimum bar height, account for yAdjust
    const barHeight = Math.max(height - (value >= 0 ? 0 : yAdjust), minBarHeight)

    return {
      x: arr.length > 1 ? index * gridX + minX : minX + (maxX - minX - barWidth) / 2,
      // If value is negative, y starts at zeroLine, otherwise it's zeroLine - barHeight
      y: value >= 0 ? zeroLineY - barHeight : zeroLineY,
      height: barHeight,
      title: title,
      zeroLineY, // Add zeroLineY to point data
    }
  })
}

/**
 * Generates data properties for bar rectangles.
 */
export function genBarsData(
  points: Point[],
  props: BarProps & Boundary, // Combine types for easier access
): BarData[] {
  const { maxX, gradient, growDuration } = props
  const barWidth =
    props.barWidth ??
    (points.length > 1
      ? maxX / (points.length - 1) - (props.padding ?? 5)
      : maxX - props.minX - (props.padding ?? 5) * 2) // Use full width if only one point
  const rounding = props.rounding ?? 2
  let gradients: string[] = []
  if (gradient && gradient.length > 1 && points.length > 1) {
    gradients = generateGradientStepsCss(gradient[0], gradient[1], points.length - 1)
  } else if (gradient && gradient.length > 0) {
    gradients = points.map(() => gradient[0]) // Single color gradient
  } else {
    gradients = points.map(() => '#000') // Default color
  }
  return points.map((item, index) => ({
    id: `bar-id-${index}`,
    fill: gradients[index] || gradient[0] || '#000',
    x: item.x, // Adjust x for single point
    y: item.y,
    width: barWidth,
    height: item.height,
    rx: rounding,
    ry: rounding,
    title: item.title,
    growDuration: growDuration,
  }))
}

/**
 * Generates data properties for x-axis labels.
 */
export function genLabelsData(
  points: Point[],
  props: LabelProps & Pick<BarProps, 'barWidth' | 'padding'>,
): LabelData[] {
  const { labelData, labelRotate, labelColor, labelSize } = props
  if (!labelData || labelData.length === 0 || !points.length) return []

  // Add safety check and fallback
  const labelY = props.maxY - props.labelHeight + 10 // Add consistent padding below zero line

  return points
    .map((point, index) => {
      if (index >= labelData.length) return null
      const title = labelData[index]
      const labelX = point.x + (props.barWidth || 0) - labelSize / 2 // Center label on bar
      return {
        x: labelX,
        y: labelY,
        transformText: `rotate(${labelRotate}, ${labelX}, ${labelY})`,
        style: `text-anchor: end; fill:${labelColor}; font-size:${labelSize}px; user-select: none;`,
        text: title,
        title: point.title,
      }
    })
    .filter((item): item is LabelData => item !== null)
}
