import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VueBars from '../VueBars.vue'

describe('VueBars', () => {
  // Test basic rendering
  it('renders when valid data is provided', () => {
    const wrapper = mount(VueBars, {
      props: {
        data: [1, 2, 3]
      }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('.vue-bars').exists()).toBe(true)
  })

  // Test empty/invalid data handling
  it('does not render when no data is provided', () => {
    const wrapper = mount(VueBars, {
      props: {
        data: []
      }
    })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  // Test props functionality
  it('applies custom dimensions', () => {
    const width = '400px'
    const height = '200px'
    const viewWidth = 350
    const viewHeight = 100
    const wrapper = mount(VueBars, {
      props: {
        data: [1, 2, 3],
        width,
        height,
        viewWidth,
        viewHeight
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe(`${width}`)
    expect(svg.attributes('height')).toBe(`${height}`)
    expect(svg.attributes('viewBox')).toBe(`0 0 ${viewWidth} ${viewHeight}`)
  })

  // Test data point objects
  it('handles data points with titles', () => {
    const dataWithTitles = [
      { value: 1, title: 'First' },
      { value: 2, title: 'Second' }
    ]
    const wrapper = mount(VueBars, {
      props: {
        data: dataWithTitles
      }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  // Test label rendering
  it('renders labels when provided', () => {
    const wrapper = mount(VueBars, {
      props: {
        data: [1, 2, 3],
        labelData: ['A', 'B', 'C']
      }
    })
    const labels = wrapper.findAll('.v-bars--label-text')
    expect(labels.length).toBe(3)
  })

  // Test gradient props
  it('accepts gradient colors', () => {
    const wrapper = mount(VueBars, {
      props: {
        data: [1, 2, 3],
        gradient: ['#000', '#fff']
      }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  // Test custom styling
  it('applies custom SVG styles', () => {
    const customStyle = {
      backgroundColor: 'red'
    }
    const wrapper = mount(VueBars, {
      props: {
        data: [1, 2, 3],
        svgStyle: customStyle
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('style')).toContain('background-color: red')
  })
})
