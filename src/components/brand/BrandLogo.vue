<script setup lang="ts">
import { computed } from 'vue'

import logoMark from '@/assets/brand/logo-mark.svg'
import { brand } from '@/config/brand'

interface Props {
  variant?: 'wordmark' | 'mark'
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'wordmark',
  alt: 'SomaPrumo',
})

const isMarkOnly = computed(() => props.variant === 'mark')
</script>

<template>
  <span class="brand-logo" :class="{ 'brand-logo--mark-only': isMarkOnly }">
    <img
      :src="logoMark"
      :alt="isMarkOnly ? alt : ''"
      class="brand-logo__mark"
      :aria-hidden="isMarkOnly ? undefined : 'true'"
    />

    <span v-if="!isMarkOnly" class="brand-logo__copy">
      <span class="brand-logo__name">{{ brand.brandName }}</span>
      <span class="brand-logo__descriptor">{{ brand.descriptor }}</span>
    </span>
  </span>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  max-width: 100%;
  color: var(--color-text-dark);
}

.brand-logo__mark {
  display: block;
  width: 34px;
  height: 58px;
  flex: 0 0 auto;
  object-fit: contain;
}

.brand-logo__copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.brand-logo__name {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 600;
  line-height: .95;
  letter-spacing: -.025em;
  white-space: nowrap;
}

.brand-logo__descriptor {
  font-family: var(--font-sans);
  font-size: .58rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: .11em;
  text-transform: uppercase;
  white-space: nowrap;
}

.brand-logo--mark-only .brand-logo__mark {
  width: 44px;
  height: 68px;
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
