<template>
  <div
    v-if="store.getters.getSelectedStop && times"
    class="card card-stops"
  >
    <div class="ps-4 pe-4">
      <p>{{ `Bus Stop: ${store.getters.getSelectedStop}` }}</p>
      <p class="fs-12 light-black pb-3 pt-3">Time</p>
    </div>
    <template
      v-for="(time, itemIndex) in times"
      :key="itemIndex"
    >
      <div class="stop-selector">
        <div class="fs-16 fw-normal ps-4 pe-4">
          {{ time }}
        </div>
      </div>
    </template>
  </div>
  <div
    v-else
    class="card card-empty card-stops"
  >
    <div class="h-100 d-flex flex-column align-items-center justify-content-center">
      <p class="fw-normal">Please select the bus stop</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, withDefaults } from 'vue'
import store from '@/store'
import { IBusTimeTableItem } from '@/interfaces/BusTimeTable'

interface Props {
  busStopsData: IBusTimeTableItem[] | null
}

const props = withDefaults(defineProps<Props>(), {
  busStopsData: null,
})

const times = ref<string[] | null>(null)

function getTimes(selectedStopName: string) {
  if (props.busStopsData) {
    const timesData = props.busStopsData
      .filter(busStop => busStop.line === store.getters.getSelectedBusLineNumber && busStop.stop === selectedStopName)
      .map(item => item.time)

    times.value = timesData.sort((a, b) => {
      return (new Date('1970/01/01 ' + a) as any) - (new Date('1970/01/01 ' + b) as any)
    })
  }
}

watch(
  () => store.getters.getSelectedStop,
  newStopValue => {
    if (!newStopValue) return

    getTimes(newStopValue)
  },
)
</script>
