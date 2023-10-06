<template>
  <div>
    <div class="main-content">
      <div class="row g-0">
        <h4>Timetable</h4>
        <HorizontalMenu />
      </div>
      <RouterView v-slot="{ Component }">
        <Transition
          name="appRouteTransition"
          mode="out-in"
        >
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import HorizontalMenu from '@/components/layout/HorizontalMenu.vue'
</script>
