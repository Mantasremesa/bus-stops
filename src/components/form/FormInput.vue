<template>
  <div class="form-group">
    <div class="position-relative">
      <label
        v-if="props.label"
        class="form-group__label"
        :class="{ focus: props.value || hasFocus }"
        for="search"
      >
        {{ props.label }}
      </label>
      <input
        name="search"
        @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
      <button
        class="form-group__button"
        title="Search"
      >
        <img
          :src="searchIcon"
          alt="Search"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import searchIcon from '@/assets/images/search.svg'
import { withDefaults, defineProps, ref, defineEmits } from 'vue'

interface Props {
  value?: string | number
  label?: string | undefined
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  label: '',
})

defineEmits(['update:value'])

const hasFocus = ref<boolean>(false)
</script>
