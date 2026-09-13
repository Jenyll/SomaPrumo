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
      <button ref="menuButton" class="menu-toggle" type="button" :aria-expanded="menuOpen"
        aria-controls="main-navigation" @click="menuOpen = !menuOpen">
        {{ menuOpen ? 'Fechar menu' : 'Abrir menu' }} <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span>
      </button>
      <nav id="main-navigation" class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Navegação principal">
        <a v-for="item in brand.navigation" :key="item.href" :href="item.href" @click="menuOpen = false">{{ item.label }}</a>
        <a class="button button-dark" :href="brand.links.contact" @click="menuOpen = false">{{ brand.primaryCta }} <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header { background: var(--color-bg-light); }
.header-inner { display: flex; justify-content: space-between; align-items: center; gap: 32px; min-height: 100px; }
.home-link { flex-shrink: 0; }
.home-link :deep(img) { width: 198px; }
.main-nav { display: flex; gap: clamp(20px, 2.4vw, 36px); align-items: center; }
.main-nav > a:not(.button) { display: flex; align-items: center; min-height: 44px; font-size: .75rem; text-decoration: none; }
.main-nav > a:hover { text-decoration: underline; }
.menu-toggle { display: none; }
@media (max-width: 1023px) {
  .header-inner { flex-wrap: wrap; gap: 0; min-height: 84px; padding-block: 18px; }
  .home-link :deep(img) { width: 174px; }
  .menu-toggle { display: flex; gap: 12px; align-items: center; min-height: 44px; padding: 8px; border: 0; background: transparent; color: inherit; font-size: .75rem; }
  .menu-toggle span { font-size: 1.4rem; }
  .main-nav { display: none; width: 100%; padding-top: 20px; }
  .main-nav.is-open { display: flex; flex-direction: column; gap: 8px; align-items: stretch; }
  .main-nav > a:not(.button) { border-top: 1px solid var(--color-border); padding-block: 12px; }
  .main-nav .button { margin-top: 8px; }
}
</style>
