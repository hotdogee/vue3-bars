<div align="center">
  <img src="https://raw.githubusercontent.com/deviavir/vue-bar/master/media/logo.png" width="500" alt="Vue Bars">
  <br>
  <h1>Vue Bars</h1>
  <p>🌈 Simple, elegant spark bars for Vue.js</p>
  <br>
  <a href="https://www.npmjs.org/package/vue3-bars"><img src="https://img.shields.io/npm/v/vue3-bars.svg?style=flat" alt="npm"></a>
  <img src="https://img.shields.io/badge/vue-^3.0.0-fc08d.svg?colorA=2c3e50&style=flat" alt="vue">
</div>

<br>

## Installation

```shell
npm i vue3-bars
```

## Usage

```js
import VueBars from 'vue3-bars'
```

[Live Demo](https://jsfiddle.net/h1o5z4xe/)

_vue template_

```vue
<VueBars :data="[1, 2, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 0]" :gradient="['#6fa8dc', '#42b983']">
</VueBars>
```

## Lineage

- Forked from [vue-bars](https://github.com/DeviaVir/vue-bar) - 🌈 Simple, elegant spark bars (Vue 2)
- Inspired by [vue-trend](https://github.com/QingWei-Li/vue-trend) - 📈 Simple, elegant spark lines (Vue 2)

## Props

| Name         | Type           | Default                                   | Description                                                                                                                         | Example                                                                      |
| ------------ | -------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| data         | Number\|Object | `undefined`                               | The data accepted by Vue Bars is incredibly simple: An array of y-axis values to graph.                                             | `[120, 149, 193.4, 200, 92]` or `[{ value: 4 }, { value: 6 }, { value: 8 }]` |
| gradient     | String         | `['#000']`                                | Colour can be specified as any SVG-supported format (named, rgb, hex, etc).                                                         | `['#0FF', '#F0F', '#FF0']`                                                   |
| width        | Number         | `300`                                     | Set an explicit width for your SVG.                                                                                                 | -                                                                            |
| height       | Number         | `75`                                      | Set an explicit height for your SVG.                                                                                                | -                                                                            |
| padding      | Number         | `8`                                       | If you set a very large `strokeWidth` on your line, you may notice that it gets "cropped" towards the edges.                        | -                                                                            |
| rounding     | Number         | `2`                                       | The radius on each bar's corners                                                                                                    | -                                                                            |
| barWidth     | Number         | `8`                                       | Set width of each bar                                                                                                               | -                                                                            |
| labelData    | String         | `[]`                                      | Array of strings                                                                                                                    | `['Label 1','Label 2','Label 3']`                                            |
| labelColor   | String         | `#999`                                    | The color of label text                                                                                                             | -                                                                            |
| labelSize    | Number         | `10`                                      | The font size of label text in pixels                                                                                               | -                                                                            |
| labelHeight  | Number         | `20`                                      | The height under the chart for label text in pixels                                                                                 |                                                                              |
| labelRotate  | Number         | `-45`                                     | The rotation of label text in degrees                                                                                               | -                                                                            |
| minBarHeight | Number         | `3`                                       | Minimum height                                                                                                                      | -                                                                            |
| autoDraw     | Boolean        | `false`                                   | Allow the line to draw itself on mount. Set to `true` to enable, and customize using `autoDrawDuration` and `autoDrawEasing`.       | -                                                                            |
| growDuration | Number         | `0.5`                                     | The amount of time, in seconds, that the autoDraw animation should span. This prop has no effect if `autoDraw` isn't set to `true`. | -                                                                            |
| max          | Number         | `-Infinity`                               | Specify max value                                                                                                                   | -                                                                            |
| min          | Number         | `Infinity`                                | Specify min value                                                                                                                   | -                                                                            |
| svgStyle     | Object         | `{display: 'block', overflow: 'visible'}` | CSS style on the svg                                                                                                                | -                                                                            |

#### SVG Props

By default, all properties not recognized by Vue Bars will be delegated to the SVG.

## License

MIT
