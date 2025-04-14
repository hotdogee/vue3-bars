<script setup lang="ts">
import { ref } from 'vue'
import Bars from './components/BarsChart.vue'
const barWidth = ref(15)
</script>

<template>
  <main>
    <div class="chart-container">
      <Bars
        :data="[1, 2, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 0]"
        :barWidth
        :gradient="['#6fa8dc', '#42b983']"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[5]"
        :labelData="[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15'
        ]"
        :barWidth
        :gradient="['#6fa8dc', '#42b983']"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[1, 2]"
        :labelData="[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15'
        ]"
        :barWidth
        :gradient="['#6fa8dc', '#42b983']"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[1, 2, 5]"
        :labelData="[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15'
        ]"
        :barWidth
        :gradient="['#6fa8dc', '#42b983']"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[1, 2, 5, 9]"
        :labelData="[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15'
        ]"
        :barWidth
        :gradient="['#6fa8dc', '#42b983']"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[1, 2, 5, 9, 5]"
        :labelData="[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15'
        ]"
        :barWidth
        :gradient="['#6fa8dc', '#42b983']"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[
          { value: 4, title: 'Tooltip 4' },
          { value: 6, title: 'Tooltip 6' },
          { value: 8, title: 'Tooltip 8' },
          { value: 10, title: 'Tooltip 10' },
          { value: 12, title: 'Tooltip 12' },
          { value: 14, title: 'Tooltip 14' },
          { value: 16, title: 'Tooltip 16' },
          { value: 18, title: 'Tooltip 18' },
          { value: 20, title: 'Tooltip 20' },
          { value: 22, title: 'Tooltip 22' },
          { value: 24, title: 'Tooltip 24' },
          { value: 26, title: 'Tooltip 26' },
          { value: 28, title: 'Tooltip 28' },
          { value: 30, title: 'Tooltip 30' },
          { value: 32, title: 'Tooltip 32' }
        ]"
        :barWidth
        :gradient="['#6fa8dc', '#42b983']"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[1, 2, -5, 9, 5, 10, 3, 5, 5, 12, 1, 8, 2, 9, 14]"
        :labelData="[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15'
        ]"
        :gradient="['#6fa8dc', '#42b983']"
        :barWidth
        :growDuration="1"
      >
      </Bars>
    </div>
    <div class="chart-container">
      <Bars
        :data="[1, 2, -5, 9, 5, 10, 3, 5, 5, 12, 1, 8, 2, 9, 14]"
        :labelData="[
          'Label 1',
          'Label 2',
          'Label 3',
          'Label 4',
          'Label 5',
          'Label 6',
          'Label 7',
          'Label 8',
          'Label 9',
          'Label 10',
          'Label 11',
          'Label 12',
          'Label 13',
          'Label 14',
          'Label 15'
        ]"
        :gradient="['#6fa8dc', '#42b983']"
        :barWidth
        :growDuration="1"
      >
      </Bars>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 20px; /* Adding space between the Bars */
}

.chart-container {
  border: 0px solid black;
}
</style>
