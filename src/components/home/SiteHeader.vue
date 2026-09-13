<script setup lang="ts">
import { ref } from 'vue'
import BrandLogo from '@/components/brand/BrandLogo.vue'
import { brand } from '@/config/brand'

const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

function closeWithEscape() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header id="inicio" class="site-header" @keydown.esc="closeWithEscape">
    <div class="container header-inner">
      <a href="#inicio" class="home-link" aria-label="SomaPrumo — início" @click="menuOpen = false">
        <BrandLogo />
      </a>

      <button
        ref="menuButton"
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="main-navigation"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Fechar menu' : 'Menu' }}
        <span aria-hidden="true">{{ menuOpen ? '×' : '≡' }}</span>
      </button>

      <nav id="main-navigation" class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Navegação principal">
        <a v-for="item in brand.navigation" :key="item.href" :href="item.href" @click="menuOpen = false">
          {{ item.label }}
        </a>
        <a class="button button-dark header-cta" :href="brand.links.contact" @click="menuOpen = false">
          {{ brand.primaryCta }} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid rgb(206 197 184 / 55%);
  background: rgb(248 245 240 / 94%);
  backdrop-filter: blur(14px);
}

.header-inner {
  display: flex;
  min-height: 82px;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.home-link {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  text-decoration: none;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(14px, 1.6vw, 26px);
}

.main-nav > a:not(.button) {
  position: relative;
  display: flex;
  min-height: 44px;
  align-items: center;
  color: var(--color-text-muted);
  font-size: .71rem;
  text-decoration: none;
}

.main-nav > a:not(.button)::after {
  position: absolute;
  right: 0;
  bottom: 6px;
  left: 0;
  height: 1px;
  background: var(--sp-bronze-600);
  content: '';
  opacity: 0;
  transform: scaleX(.35);
  transition: opacity .2s ease, transform .2s ease;
}

.main-nav > a:not(.button):hover,
.main-nav > a:not(.button):focus-visible {
  color: var(--color-text-dark);
}

.main-nav > a:not(.button):hover::after,
.main-nav > a:not(.button):focus-visible::after {
  opacity: 1;
  transform: scaleX(1);
}

.header-cta {
  min-height: 42px;
  padding: 11px 16px;
  gap: 14px;
  font-size: .71rem;
}

.menu-toggle {
  display: none;
}

@media (max-width: 1180px) {
  .main-nav { gap: 14px; }
  .main-nav > a:not(.button) { font-size: .68rem; }
}

@media (max-width: 1023px) {
  .header-inner {
    min-height: 76px;
    flex-wrap: wrap;
    gap: 0;
    padding-block: 12px;
  }

  .menu-toggle {
    display: flex;
    min-height: 44px;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border: 0;
    background: transparent;
    color: inherit;
    font-size: .72rem;
  }

  .menu-toggle span {
    color: var(--color-accent-on-light);
    font-size: 1.25rem;
  }

  .main-nav {
    display: none;
    width: 100%;
    padding-top: 18px;
  }

  .main-nav.is-open {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .main-nav > a:not(.button) {
    min-height: 52px;
    border-top: 1px solid var(--color-border);
    font-size: .75rem;
  }

  .main-nav > a:not(.button)::after { display: none; }
  .main-nav .button { margin-top: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .main-nav > a:not(.button)::after { transition: none; }
}
</style>
