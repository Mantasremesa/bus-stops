<template>
  <div>
    <div
      v-if="stopsListItems"
      class="card card-stops"
    >
      <div class="ps-4 pe-4">
        <div class="mw-300">
          <FormInput
            v-model:value="searchText"
            label="Search..."
          />
        </div>
        <p class="fs-12 light-black pb-3 pt-3">Bus stops</p>
      </div>
      <template v-if="searchText && !stopsListItems!.length">
        <div class="text-center">No results! Try searching again!</div>
      </template>
      <template
        v-else
        v-for="(stopName, itemIndex) in stopsListItems"
        :key="itemIndex"
      >
        <div class="stop-selector">
          <div class="fs-16 fw-normal ps-4 pe-4">
            {{ stopName }}
          </div>
        </div>
      </template>
    </div>
    <div
      v-else
      class="card card-empty card-stops"
    >
      <div class="h-100 d-flex flex-column align-items-center justify-content-center">
        <p class="fw-normal">Loading please wait...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, withDefaults } from 'vue'
import { IBusTimeTableItem } from '@/interfaces/BusTimeTable'
import FormInput from '@/components/form/FormInput.vue'

interface Props {
  busStopsData: IBusTimeTableItem[] | null
}

const props = withDefaults(defineProps<Props>(), {
  busStopsData: null,
})

const searchText = ref<string>('')

function getStopsNames(stopsData: IBusTimeTableItem[]) {
  return [...new Set(stopsData.map(item => item.stop))].sort()
}

const stopsListItems = computed(() => {
  if (props.busStopsData) {
    const stops = getStopsNames(props.busStopsData)
    if (!searchText.value || searchText.value === '') return stops

    return stops.filter(item => item.match(searchText.value as string))
  }

  return null
})
</script>
