<script setup lang="ts">
import { computed } from 'vue'

import logoMark from '@/assets/brand/logo-mark.svg'
import logoWordmark from '@/assets/brand/logo-wordmark.svg'

interface Props {
  variant?: 'wordmark' | 'mark'
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'wordmark',
  alt: 'SomaPrumo',
})

const src = computed(() => (props.variant === 'mark' ? logoMark : logoWordmark))
</script>

<template>
  <img :src="src" :alt="alt" class="brand-logo" :class="{ 'brand-logo--mark': variant === 'mark' }" />
</template>

<style scoped>
.brand-logo {
  display: block;
  max-width: 220px;
  height: auto;
}

.brand-logo--mark {
  max-width: 52px;
}
</style>
