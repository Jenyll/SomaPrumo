<script setup lang="ts">
import BrandLogo from '@/components/brand/BrandLogo.vue'
import { brand } from '@/config/brand'
</script>

<template>
  <footer class="site-footer dark-section">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="footer-logo" href="#inicio" aria-label="SomaPrumo — voltar ao início"><BrandLogo /></a>
          <p>{{ brand.footerSupportText }}</p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <p class="eyebrow">Explore</p>
          <a v-for="item in brand.navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
        </nav>

        <div>
          <p class="eyebrow">Vamos conversar</p>
          <a class="text-link" :href="brand.links.contact">{{ brand.primaryCta }} <span aria-hidden="true">↗</span></a>
          <p class="footer-descriptor">{{ brand.descriptor }}</p>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} {{ brand.brandName }}</span>
        <span>{{ brand.slogan }}</span>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { padding: 64px 0 28px; }
.footer-grid { display: grid; grid-template-columns: 1.4fr .8fr 1fr; gap: 70px; padding-bottom: 52px; }
.footer-logo { display: inline-flex; align-items: center; max-width: 260px; padding: 12px 16px; background: var(--color-bg-light); text-decoration: none; }
.footer-brand > p { max-width: 340px; margin: 24px 0 0; color: var(--color-text-muted-light); font-size: .78rem; }
nav > a { display: flex; min-height: 44px; align-items: center; font-size: .75rem; text-decoration: none; }
nav > a:hover { color: var(--color-brand-primary); }
.eyebrow { margin-bottom: 16px; }
.footer-descriptor { color: var(--color-text-muted-light); font-size: .7rem; }
.footer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 24px; border-top: 1px solid var(--color-border-dark); color: var(--color-text-muted-light); font-size: .65rem; }
.footer-bottom a { display: flex; min-height: 44px; align-items: center; text-decoration: none; }
.footer-bottom a:hover { color: var(--color-brand-primary); }
@media (max-width: 767px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px 24px; } .footer-brand { grid-column: 1 / -1; } .footer-grid .text-link { gap: 8px; font-size: .73rem; } .footer-bottom { flex-wrap: wrap; } .footer-bottom span:nth-child(2) { display: none; } }
</style>
