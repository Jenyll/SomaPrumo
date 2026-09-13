<script setup lang="ts">
import { brand } from '@/config/brand'
</script>

<template>
  <section id="contato" class="contact section-space" aria-labelledby="contact-title">
    <div class="container contact-grid">
      <div><p class="eyebrow">{{ brand.contactEyebrow }}</p><h2 id="contact-title">{{ brand.contactTitle }}</h2><p class="contact-copy">{{ brand.contactDescription }}</p></div>
      <div class="contact-channel">
        <p class="eyebrow">{{ brand.primaryCta }}</p>
        <a v-if="brand.contact.href" class="button button-dark" :href="brand.contact.href">{{ brand.contact.label }} <span aria-hidden="true">↗</span></a>
        <template v-else><p class="contact-placeholder">{{ brand.contact.label }}</p><p class="contact-note">Canal de contato em breve.</p></template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { background: var(--color-bg-sand); }
.contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 90px; align-items: center; }
.contact h2 { max-width: 690px; font-size: clamp(2.8rem, 4.7vw, 4.5rem); }
.contact-copy { color: var(--color-text-muted); font-size: .9rem; max-width: 550px; margin: 24px 0 0; }
.contact-channel { border-left: 1px solid var(--color-border); padding: 24px 0 24px 48px; }
.contact-placeholder { font-family: var(--font-display); font-size: 2.5rem; margin: 0; overflow-wrap: anywhere; }
.contact-note { color: var(--color-text-muted); font-size: .75rem; margin-bottom: 0; }
@media (max-width: 767px) { .contact-grid { grid-template-columns: 1fr; gap: 32px; } .contact-channel { border-left: 0; border-top: 1px solid var(--color-border); padding: 24px 0 0; } }
</style>
