<template>
  <main class="main">
    <GithubBadge slug="hotdogee/vue3-bars" />

    <h1>Vue 3 Bars</h1>
    <p class="headline">Simple, elegant spark bars for Vue 3</p>
    <VueBars
      :data="data"
      :gradient="[color1, color2]"
      :barWidth="barWidth"
      :rounding="radius"
      :padding="padding"
      :labelData="labelData"
      :key="JSON.stringify(labelData)"
      :labelColor="labelColor"
      :labelRotate="labelRotate"
      :labelSize="labelSize"
      :growDuration="1"
    >
    </VueBars>

    <div>
      <Tabs>
        <Tab value="Configure">
          <div class="settings-container tab-content">
            <div class="settings-column">
              <div>
                <div class="setting-label">Width</div>
                <VueSlider v-model="barWidth" :min="1" :max="12" :interval="0.1"></VueSlider>
              </div>

              <div>
                <div class="setting-label">Rounding</div>
                <VueSlider v-model="radius" :min="0.1" :max="6" :interval="0.1"></VueSlider>
              </div>

              <div>
                <div class="setting-label">Padding</div>
                <VueSlider v-model="padding" :min="0" :max="10" :interval="0.1"></VueSlider>
              </div>

              <div>
                <div class="setting-label">Gradient first color</div>
                <v-swatches
                  v-model="color1"
                  :swatch-size="18"
                  background-color="#f7f7f7"
                  :swatches="[
                    '#b8f2e6',
                    '#00f5d4',
                    '#35a7ff',
                    '#3a86ff',
                    '#001233',
                    '#000000',
                    '#ffe74c',
                    '#ffbe88',
                    '#ff93df',
                    '#f94144',
                    '#d6d6d6'
                  ]"
                  inline
                ></v-swatches>
              </div>

              <div>
                <div class="setting-label">Gradient second color</div>
                <v-swatches
                  v-model="color2"
                  :swatch-size="18"
                  background-color="#f7f7f7"
                  :swatches="[
                    '#b8f2e6',
                    '#00f5d4',
                    '#35a7ff',
                    '#3a86ff',
                    '#001233',
                    '#000000',
                    '#ffe74c',
                    '#ffbe88',
                    '#ff93df',
                    '#f94144',
                    '#d6d6d6'
                  ]"
                  inline
                ></v-swatches>
              </div>
            </div>

            <div class="settings-column">
              <label class="control">
                <input
                  type="checkbox"
                  class="control__input visually-hidden"
                  v-model="showLabels"
                />
                <span class="control__indicator"></span>
                <span class="checkbox-label">Show labels ?</span>
              </label>

              <div>
                <div class="setting-label">Label color</div>
                <v-swatches
                  v-model="labelColor"
                  :swatch-size="18"
                  background-color="#f7f7f7"
                  :swatches="[
                    '#b8f2e6',
                    '#00f5d4',
                    '#35a7ff',
                    '#3a86ff',
                    '#001233',
                    '#000000',
                    '#ffe74c',
                    '#ffbe88',
                    '#ff93df',
                    '#f94144',
                    '#d6d6d6'
                  ]"
                  inline
                ></v-swatches>
              </div>

              <div>
                <div class="setting-label">Label rotate</div>
                <VueSlider v-model="labelRotate" :min="-45" :max="90" :interval="1"></VueSlider>
              </div>

              <div>
                <div class="setting-label">Label size</div>
                <VueSlider v-model="labelSize" :min="2" :max="24" :interval="1"></VueSlider>
              </div>
            </div>
          </div>
        </Tab>
        <Tab value="Code">
          <pre class="code-wrap"><code class="code" v-html="code"></code></pre>
        </Tab>
      </Tabs>
    </div>

    <footer>
      Released under the
      <a href="//github.com/hotdogee/vue3-bars/blob/master/LICENSE">MIT</a> license.
      <a href="//github.com/hotdogee/vue3-bars">View source</a>.
    </footer>
  </main>
</template>

<script setup lang="ts">
import hanabi from 'hanabi'
import { Tab, Tabs } from 'super-vue3-tabs'
import { computed, ref } from 'vue'
import VueSlider from 'vue-3-slider-component'
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'
import VueBars from '../src/components/VueBars.vue'
import GithubBadge from './GithubBadge.vue'

const barWidth = ref(4)
const radius = ref(2)
const padding = ref(8)
const color1 = ref('#00f5d4')
const color2 = ref('#ffbe88')
const showLabels = ref(false)
const labelColor = ref('#ffbe88')
const labelRotate = ref(-45)
const labelSize = ref(8)

const data = ref<number[]>([
  1, 2, 5, 9, 5, 10, 3, 5, 8, 12, 1, 8, 2, 9, 10, 2, 9, 4, 5, 6, 7, 3, 2, 3, 5
])

const labelData = computed(() => {
  return showLabels.value ? [...Array(25).keys()].map((_, index) => `${index + 1}`) : []
})

const code = computed(() => {
  return hanabi(`<bars
  :key=\"reference-to-your-var\"
  :data=[1, 2, 5, 9, 5, 10, 3, 5, 8, 12, 1, 8, 2, 9, 10, 2, 9, 4, 5, 6, 7, 3, 2, 3, 5]
  :gradient=['${color1.value}', '${color2.value}']
  :barWidth=${barWidth.value}
  :rounding=${radius.value}${showLabels.value ? '\n  :labelData="[' + labelData.value + ']"' : ''}  ${showLabels.value ? '\n  :labelColor="' + labelColor.value + '"' : ''}  ${showLabels.value ? '\n  :labelRotate="' + labelRotate.value + '"' : ''}  ${showLabels.value ? '\n  :labelSize="' + labelSize.value + '"' : ''}
  :growDuration="1">
</bars>`)
})
</script>

<style>
h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
}

.headline {
  font-family:
    Courier,
    Courier New,
    monospace;
  font-size: 15px;
  font-weight: 400;
  padding: 20px 0;
}

.main {
  max-width: 650px;
  margin: 5vh auto 20px;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 18px;
}

.code-wrap {
  text-align: left;
  background-color: #f7f7f7;
  padding: 2em 1.4em;
  line-height: 1.5em;
  margin: 0;
  overflow: auto;
  font-size: 1rem;
}

.code {
  margin: 0;
  padding: 0;
}

footer {
  margin-top: 40px;
  line-height: 2;
  font-size: 0.8rem;
  color: #c1c1c1;
  font-family:
    Courier,
    Courier New,
    monospace;
}

a {
  color: #39fda4;
}

.setting-label {
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  padding-top: 1rem;
}

.settings-container {
  display: flex;
}

@media only screen and (max-width: 480px) {
  .settings-container {
    display: block;
  }
}

.tab-content {
  background: #f7f7f7;
}

.settings-column {
  flex: auto;
  margin: 2rem 2rem 0;
  padding-bottom: 2rem;
}

.vue-swatches {
  display: flex;
}

.vue-swatches__wrapper {
  padding-left: 0 !important;
}

.vue-swatches__container {
  padding: 5px 0 0 !important;
  margin-bottom: 0 !important;
}

.control {
  display: flex;
  align-items: center;
  padding-top: 14px;
}
.control__indicator {
  margin-right: 0.25rem;
  width: 1rem;
  height: 1rem;
  background-color: #ccc;
  border-radius: 3px;
}
.control__input:focus ~ .control__indicator {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}
.control__input:checked ~ .control__indicator {
  background-color: #3498db;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTYuMkw0LjggMTJsLTEuNCAxLjRMOSAxOSAyMSA3bC0xLjQtMS40TDkgMTYuMnoiLz48L3N2Zz4=');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
/* Visually hide the browser input to ensure it is still focusable via keyboards */
.visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.checkbox-label {
  font-size: 1rem;
  padding-left: 5px;
  margin-top: 3px;
}

.vue-tabs .nav > li span.title {
  font-weight: 700;
}
</style>
