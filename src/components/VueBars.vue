<script setup lang="ts">
import { computed, type PropType } from 'vue'
import PathGroup from './PathGroup.vue' // Import the new Path component

// Define the type for individual data points
interface PointInput {
  value: number
  title?: string | number
}

// Define props using defineProps with TypeScript
const props = defineProps({
  data: {
    type: Array as PropType<(number | PointInput)[]>,
    required: true
  },
  // autoDraw: Boolean, // This prop seems unused, omitting for now unless needed
  barWidth: {
    type: Number,
    default: 8 // Default can be managed here or within Path.vue/helpers
  },
  rounding: {
    type: Number,
    default: 2
  },
  growDuration: {
    type: Number,
    default: 0.5
  },
  gradient: {
    type: Array as PropType<string[]>,
    default: () => ['#000']
  },
  max: {
    type: Number,
    default: -Infinity
  },
  min: {
    type: Number,
    default: Infinity
  },
  minBarHeight: {
    type: Number,
    default: 3
  },
  labelData: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  labelRotate: {
    type: Number,
    default: -45
  },
  labelColor: {
    type: String,
    default: '#999'
  },
  labelSize: {
    type: Number,
    default: 10
  },
  labelHeight: {
    type: Number,
    default: 20
  },
  height: {
    type: String
  },
  width: {
    type: String
  },
  viewHeight: {
    type: Number,
    default: 75 // Default height if not provided
  },
  viewWidth: {
    type: Number,
    default: 300 // Default width if not provided
  },
  padding: {
    type: Number,
    default: 8
  },
  svgStyle: {
    type: Object,
    default: () => ({
      display: 'block' /* Prevent inline spacing issues */,
      overflow: 'visible' /* Allow labels/elements outside viewBox if needed */
    })
  }
})

// Computed property to determine if the component should render
const shouldRender = computed(() => props.data && props.data.length >= 1) // Allow rendering even with 1 bar

// SVG dimensions and viewBox
const svgWidth = computed(() => (props.width ? `${props.width}` : '100%'))
const svgHeight = computed(() => (props.height ? `${props.height}` : '100%'))
const viewWidth = computed(() => props.viewWidth)
const viewHeight = computed(() => props.viewHeight)
const viewBox = computed(() => `0 0 ${viewWidth.value} ${viewHeight.value}`)

// Calculated boundary object to pass to Path component
const boundary = computed(() => ({
  minX: props.padding,
  minY: props.padding,
  maxX: viewWidth.value - props.padding,
  maxY: viewHeight.value - props.padding,
  minBarHeight: props.minBarHeight
}))

// Combined label properties object to pass to Path component
const labelProps = computed(() => ({
  labelData: props.labelData,
  labelRotate: props.labelRotate,
  labelColor: props.labelColor,
  labelSize: props.labelSize,
  labelHeight: props.labelHeight,
  // Pass boundary coordinates needed for label calculation
  minX: boundary.value.minX,
  minY: boundary.value.minY,
  maxX: boundary.value.maxX,
  maxY: boundary.value.maxY
}))
</script>

<template>
  <svg
    v-if="shouldRender"
    :width="svgWidth"
    :height="svgHeight"
    :viewBox="viewBox"
    :style="svgStyle"
    class="vue-bars"
  >
    <PathGroup
      :data="props.data"
      :boundary="boundary"
      :barWidth="props.barWidth"
      :rounding="props.rounding"
      :gradient="props.gradient"
      :growDuration="props.growDuration"
      :max="props.max"
      :min="props.min"
      :labelProps="labelProps"
      :padding="props.padding"
    />
    <!-- Removed ID generation, can be added if needed externally -->
  </svg>
  <div v-else>
    <!-- Optional: message when data is insufficient -->
    <!-- Not enough data to render bars. -->
  </div>
</template>

<style scoped></style>
