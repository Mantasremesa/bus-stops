<template>
  <div class="card">
    <p>Select Bus Line</p>
    <div v-if="!busLinesData">
      <p class="text-center">Loading. Please wait...</p>
    </div>
    <div
      v-else
      class="d-flex gap-2 flex-wrap mt-3"
    >
      <button
        v-for="(busLineItem, index) in busLinesData"
        :key="index"
        class="bus-line-item"
        :class="{ 'item-selected': lineIsSelected(busLineItem) }"
        @click="setBusLineNumber(busLineItem)"
      >
        {{ busLineItem }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, watch, onMounted } from 'vue'
import { IBusTimeTableItem } from '@/interfaces/BusTimeTable'
import store, { EBusActions } from '@/store'

interface Props {
  busStopsData: IBusTimeTableItem[] | null
}

const props = withDefaults(defineProps<Props>(), {
  busStopsData: null,
})

const busLinesData = ref<number[] | null>(null)

function mappedBusLines(stopsData: IBusTimeTableItem[]) {
  return [...new Set(stopsData.map(stopItem => stopItem.line))].sort()
}

function setBusLineNumber(busLineNumber: number) {
  store.dispatch(EBusActions.setBusLineSelect, busLineNumber)
  store.dispatch(EBusActions.setStopSelect, null)
}

function lineIsSelected(lineNumber: number) {
  return store.getters.getSelectedBusLineNumber === lineNumber
}

onMounted(() => {
  store.dispatch(EBusActions.setBusLineSelect, null)
})

watch(
  () => props.busStopsData,
  newStopsDataValue => {
    if (newStopsDataValue) {
      busLinesData.value = mappedBusLines(newStopsDataValue)
    }
  },
)
</script>
