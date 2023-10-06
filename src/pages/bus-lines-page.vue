<template>
  <div>
    <div class="row g-0">
      <BusLineSelector :bus-stops-data="toRaw(busStopsData)" />
    </div>

    <div class="row g-4 pt-4">
      <div class="col-12 col-sm-6">
        <BusStopsSelector :bus-stops-data="toRaw(busStopsData)" />
      </div>
      <div class="col-12 col-sm-6">
        <BusStopTimeList :bus-stops-data="toRaw(busStopsData)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BusLineSelector from '@/components/BusLineSelector.vue'
import BusStopsSelector from '@/components/BusStopsSelector.vue'
import BusStopTimeList from '@/components/BusStopTimeList.vue'
import { onMounted, ref, toRaw } from 'vue'
import TimesTableService from '@/services/timesTable.api'
import { IBusTimeTableItem } from '@/interfaces/BusTimeTable'
import { useStore } from 'vuex'
import { EBusActions } from '@/store'

const busStopsData = ref<IBusTimeTableItem[] | null>(null)
const isLoading = ref<boolean>(false)

const store = useStore()

onMounted(async () => {
  busStopsData.value = store.getters.getBusStops

  if (busStopsData.value) return

  isLoading.value = true
  TimesTableService.getBusTimeTable()
    .then(response => {
      busStopsData.value = response
      store.dispatch(EBusActions.storeBusStops, response)
    })
    .catch(e => {
      if (e.message) alert(e.message)
    })
    .finally(() => (isLoading.value = false))
})
</script>
