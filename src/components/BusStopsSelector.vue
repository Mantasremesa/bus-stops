<template>
  <div
    v-if="stopsOfBusLine"
    class="card card-stops"
  >
    <div class="ps-4 pe-4">
      <p>{{ `Bus Line: ${store.getters.getSelectedBusLineNumber}` }}</p>
      <p class="fs-12 light-black pb-3 pt-3">Bus stops</p>
    </div>
    <template
      v-for="(item, itemIndex) in stopsOfBusLine"
      :key="itemIndex"
    >
      <div
        class="stop-selector"
        :class="{ 'item-selected': stopIsSelected(item.stop) }"
        type="button"
        @click="showTimeTable(item.stop)"
      >
        <div class="fs-16 fw-normal ps-4 pe-4">
          {{ item.stop }}
        </div>
      </div>
    </template>
  </div>
  <div
    v-else
    class="card card-empty card-stops"
  >
    <div class="h-100 d-flex flex-column align-items-center justify-content-center">
      <p class="fw-normal">Please select the bus line first</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, withDefaults } from 'vue'
import store, { EBusActions } from '@/store'
import { IBusTimeTableItem } from '@/interfaces/BusTimeTable'

interface Props {
  busStopsData: IBusTimeTableItem[] | null
}

const props = withDefaults(defineProps<Props>(), {
  busStopsData: null,
})

function stopIsSelected(stopName: string) {
  return store.getters.getSelectedStop === stopName
}

const stopsOfBusLine = ref<IBusTimeTableItem[] | null>(null)

function showTimeTable(stopName: string) {
  store.dispatch(EBusActions.setStopSelect, stopName)
}

function getStopsOfBusLine(newLineNumber: number) {
  if (props.busStopsData) {
    const lineStops = props.busStopsData.filter(busStop => busStop.line === newLineNumber)
    const busStopNames = [...new Set(lineStops.map(item => item.stop))]
    const filteredBusStops = busStopNames.map(item =>
      props.busStopsData?.find(stopItem => stopItem.stop === item),
    ) as IBusTimeTableItem[]

    stopsOfBusLine.value = Object.keys(filteredBusStops)
      .sort((a: any, b: any) => filteredBusStops[a].order - filteredBusStops[b].order)
      .map((f: any) => filteredBusStops[f])
  }
}

watch(
  () => store.getters.getSelectedBusLineNumber,
  newLineNumber => {
    if (!newLineNumber) return

    getStopsOfBusLine(newLineNumber)
  },
)
</script>
