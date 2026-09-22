<script setup lang="ts">
import { computed } from 'vue'

import logoMark from '@/assets/brand/logo-mark.svg'
import { brand } from '@/config/brand'

interface Props {
  variant?: 'wordmark' | 'mark'
  alt?: string
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'wordmark',
  alt: 'SomaPrumo',
  theme: 'light',
})

const isMarkOnly = computed(() => props.variant === 'mark')
</script>

<template>
  <span
    class="brand-logo"
    :class="[
      { 'brand-logo--mark-only': isMarkOnly },
      `brand-logo--${props.theme}`,
    ]"
  >
    <img
      :src="logoMark"
      :alt="isMarkOnly ? props.alt : ''"
      class="brand-logo__mark"
      :aria-hidden="!isMarkOnly"
    />

    <span v-if="!isMarkOnly" class="brand-logo__copy">
      <span class="brand-logo__name">{{ brand.brandName }}</span>
      <span class="brand-logo__descriptor">{{ brand.logoDescriptor }}</span>
    </span>
  </span>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  color: var(--color-text-dark);
}

.brand-logo__mark {
  display: block;
  width: 28px;
  height: 54px;
  flex: 0 0 28px;
  object-fit: contain;
  object-position: center;
}

.brand-logo__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-width: 0;
}

.brand-logo__name {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.025em;
  white-space: nowrap;
}

.brand-logo__descriptor {
  display: block;
  width: 100%;
  font-family: var(--font-body);
  font-size: 0.52rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.1em;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand-logo--dark {
  color: var(--color-bg-light);
}

.brand-logo--mark-only .brand-logo__mark {
  width: 36px;
  height: 62px;
  flex-basis: 36px;
}

@media (max-width: 480px) {
  .brand-logo {
    gap: 9px;
  }

  .brand-logo__mark {
    width: 28px;
    height: 48px;
  }

  .brand-logo__name {
    font-size: 1.55rem;
  }

  .brand-logo__descriptor {
    font-size: .5rem;
    letter-spacing: .085em;
  }
}
</style>
