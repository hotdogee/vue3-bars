<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { genPoints, genBarsData, genLabelsData } from '../helpers/path'

// Define types for props based on helper types
interface PointInput {
  value: number
  title?: string | number
}

interface Boundary {
  minX: number
  minY: number
  maxX: number
  maxY: number
  minBarHeight: number
}

interface LabelProps {
  labelData: (string | number)[]
  labelRotate: number
  labelColor: string
  labelSize: number
  labelHeight: number
  minX: number // Needed for genLabelsData calculation
  minY: number // Needed for genLabelsData calculation (though unused currently)
  maxX: number // Needed for genLabelsData calculation
  maxY: number // Needed for genLabelsData calculation
}

const props = defineProps({
  data: {
    type: Array as PropType<(number | PointInput)[]>,
    required: true,
  },
  boundary: {
    type: Object as PropType<Boundary>,
    required: true,
  },
  barWidth: {
    type: Number,
    default: 8, // Allow helper to calculate default
  },
  rounding: {
    type: Number,
    default: 2,
  },
  gradient: {
    type: Array as PropType<string[]>,
    default: () => ['#000'],
  },
  growDuration: {
    type: Number,
    default: 0.5,
  },
  max: {
    type: Number,
    default: -Infinity,
  },
  min: {
    type: Number,
    default: Infinity,
  },
  labelProps: {
    // Combine label-related props
    type: Object as PropType<LabelProps>,
    required: true,
  },
  padding: {
    // Pass padding for barWidth calculation in helpers
    type: Number,
    default: 8,
  },
})

// Calculate points
const points = computed(() => {
  if (!props.data || props.data.length === 0) return []
  // Ensure props.min and props.max are numbers before passing
  const minVal = typeof props.min === 'number' ? props.min : -Infinity
  const maxVal = typeof props.max === 'number' ? props.max : Infinity
  return genPoints(
    props.data,
    props.boundary,
    props.barWidth,
    { max: maxVal, min: minVal },
    props.labelProps,
  )
})
// console.log('points', points.value)

// Generate bar data for the template
const barsData = computed(() => {
  if (!points.value.length) return []
  return genBarsData(points.value, {
    // Pass combined props needed by genBarsData
    gradient: props.gradient,
    barWidth: props.barWidth,
    padding: props.padding,
    rounding: props.rounding,
    growDuration: props.growDuration,
    ...props.boundary, // Spread boundary props
  })
})
// console.log('barsData', barsData.value)

// Generate label data for the template
const labelsData = computed(() => {
  if (!points.value.length || !props.labelProps.labelData?.length) return []
  return genLabelsData(points.value, {
    // Pass combined props needed by genLabelsData
    labelData: props.labelProps.labelData,
    labelRotate: props.labelProps.labelRotate,
    labelColor: props.labelProps.labelColor,
    labelSize: props.labelProps.labelSize,
    labelHeight: props.labelProps.labelHeight,
    barWidth: props.barWidth, // Pass barWidth for calculation
    padding: props.padding, // Pass padding for calculation
    minX: props.labelProps.minX,
    minY: props.labelProps.minY,
    maxX: props.labelProps.maxX,
    maxY: props.labelProps.maxY,
  })
})
// console.log('labelsData', labelsData.value)
</script>

<template>
  <g class="container" :transform="`translate(0, 0)`">
    <!-- Render Bars -->
    <rect
      v-for="bar in barsData"
      :key="bar.id"
      :id="bar.id"
      :fill="bar.fill"
      :x="bar.x"
      :y="bar.y"
      :width="bar.width"
      :height="bar.height"
      :rx="bar.rx"
      :ry="bar.ry"
    >
      <!-- Animation -->
      <animate
        attributeName="height"
        from="0"
        :to="bar.height"
        :dur="`${bar.growDuration}s`"
        fill="freeze"
      />
      <animate
        attributeName="y"
        :from="boundary.maxY - (props.labelProps.labelData.length > 0 ? 20 : 0)"
        :to="bar.y"
        :dur="`${bar.growDuration}s`"
        fill="freeze"
      />
      <title>{{ bar.title }}</title>
    </rect>

    <!-- Render Labels -->
    <text
      v-for="(label, index) in labelsData"
      :key="`label-${index}`"
      class="v-bars--label-text"
      :style="label.style"
      :x="label.x"
      :y="label.y"
      :transform="label.transformText"
    >
      {{ label.text }}
    </text>
  </g>
</template>
