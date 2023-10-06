<template>
  <header class="header mt-4 mb-4">
    <nav class="header-menu">
      <ul>
        <template
          v-for="(menuItem, itemIndex) in menuItems"
          :key="itemIndex"
        >
          <li :class="{ 'router-link-active': menuItem.route === route.path }">
            <RouterLink :to="{ path: menuItem.route }">
              {{ menuItem.label }}
            </RouterLink>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { IMenuItem } from '@/interfaces/MenuInterface'
import { ERoute } from '@/router'
import { useRoute } from 'vue-router'
const route = useRoute()

const menuItems: IMenuItem[] = [
  {
    route: ERoute.index,
    label: 'Bus Lines',
  },
  {
    route: ERoute.stops,
    label: 'Stops',
  },
]
</script>
