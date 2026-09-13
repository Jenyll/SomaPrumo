<script setup lang="ts">
import { computed, ref } from 'vue'
import { commercialAudiences, type AudienceKey } from '@/data/commercialOffers'

const selectedAudience = ref<AudienceKey>('mei')
const selectedItemId = ref('mei-abertura')

const audience = computed(
  () => commercialAudiences.find((item) => item.key === selectedAudience.value) ?? commercialAudiences[1],
)

const selectedItem = computed(
  () => audience.value.offers.find((item) => item.id === selectedItemId.value) ?? audience.value.offers[0],
)

function selectAudience(key: AudienceKey) {
  selectedAudience.value = key
  const nextAudience = commercialAudiences.find((item) => item.key === key)
  if (nextAudience) selectedItemId.value = nextAudience.offers[0].id
}

function previewItem(id: string) {
  selectedItemId.value = id
}
</script>

<template>
  <section id="servicos" class="solutions-explorer section-space" aria-labelledby="solutions-explorer-title">
    <div class="container">
      <div class="explorer-heading">
        <div>
          <p class="eyebrow">Soluções SomaPrumo</p>
          <h2 id="solutions-explorer-title">O que você precisa<br />resolver?</h2>
        </div>
        <p>
          Escolha seu contexto e encontre o caminho mais direto. Alguns itens são serviços,
          outros fazem parte de uma assinatura e os mais complexos começam com um especialista.
        </p>
      </div>

      <div class="audience-tabs" role="tablist" aria-label="Escolha seu perfil">
        <button
          v-for="item in commercialAudiences"
          :key="item.key"
          type="button"
          role="tab"
          :aria-selected="selectedAudience === item.key"
          :class="{ active: selectedAudience === item.key }"
          @click="selectAudience(item.key)"
        >
          {{ item.label }}
        </button>
      </div>

      <div class="audience-intro">
        <p class="eyebrow">{{ audience.eyebrow }}</p>
        <p>{{ audience.intro }}</p>
      </div>

      <div class="explorer-layout">
        <div class="offer-list" role="list">
          <button
            v-for="(item, index) in audience.offers"
            :key="item.id"
            type="button"
            class="offer-row"
            :class="{ active: selectedItem.id === item.id }"
            :aria-pressed="selectedItem.id === item.id"
            @mouseenter="previewItem(item.id)"
            @focus="previewItem(item.id)"
            @click="previewItem(item.id)"
          >
            <span class="offer-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="offer-title">{{ item.title }}</span>
            <span class="offer-kind">{{ item.kind }}</span>
            <span class="offer-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        <aside class="offer-preview" aria-live="polite">
          <div>
            <p class="preview-kind">{{ selectedItem.kind }}</p>
            <h3>{{ selectedItem.title }}</h3>
            <p class="preview-description">{{ selectedItem.description }}</p>
            <ul>
              <li v-for="detail in selectedItem.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>

          <a :href="selectedItem.href" class="preview-cta">
            {{ selectedItem.ctaLabel }}
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>

      <p class="official-note">
        Serviços sujeitos à análise de escopo e disponibilidade. Quando houver processo oficial,
        a etapa correspondente permanece nos canais governamentais aplicáveis.
      </p>
    </div>
  </section>
</template>

<style scoped>
.solutions-explorer { background: var(--sp-ivory-50); }
.explorer-heading { display: grid; grid-template-columns: 1.15fr 1fr; gap: 72px; align-items: end; margin-bottom: 56px; }
.explorer-heading h2 { max-width: 760px; margin: 0; }
.explorer-heading > p { max-width: 500px; margin: 0 0 4px; color: var(--color-text-muted); }
.audience-tabs { display: flex; gap: 38px; border-bottom: 1px solid var(--color-border); }
.audience-tabs button { position: relative; padding: 0 0 16px; border: 0; background: transparent; color: var(--color-text-muted); font-size: .75rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.audience-tabs button::after { position: absolute; right: 0; bottom: -1px; left: 0; height: 2px; background: var(--sp-bronze-600); content: ''; opacity: 0; transform: scaleX(.35); transition: opacity .2s ease, transform .2s ease; }
.audience-tabs button:hover, .audience-tabs button.active { color: var(--color-text-dark); }
.audience-tabs button.active::after { opacity: 1; transform: scaleX(1); }
.audience-intro { display: grid; grid-template-columns: 180px minmax(0, 560px); gap: 32px; padding: 28px 0 34px; }
.audience-intro .eyebrow { margin: 0; }
.audience-intro > p:last-child { margin: 0; color: var(--color-text-muted); font-size: .82rem; line-height: 1.7; }
.explorer-layout { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(320px, .75fr); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); }
.offer-list { border-right: 1px solid var(--color-border); }
.offer-row { display: grid; grid-template-columns: 58px minmax(0, 1fr) 110px 28px; gap: 20px; align-items: center; width: 100%; min-height: 78px; padding: 0 24px 0 0; border: 0; border-bottom: 1px solid var(--color-border); background: transparent; color: var(--color-text-dark); text-align: left; transition: background .2s ease; }
.offer-row:last-child { border-bottom: 0; }
.offer-row:hover, .offer-row.active { background: rgb(176 138 98 / 10%); }
.offer-index { color: var(--color-accent-on-light); font-size: .62rem; letter-spacing: .1em; }
.offer-title { font-family: var(--font-display); font-size: clamp(1.35rem, 2vw, 1.85rem); font-weight: 500; line-height: 1.1; }
.offer-kind { color: var(--color-text-muted); font-size: .64rem; font-weight: 600; letter-spacing: .08em; text-align: right; text-transform: uppercase; }
.offer-arrow { color: var(--color-accent-on-light); font-size: 1.05rem; transition: transform .2s ease; }
.offer-row:hover .offer-arrow, .offer-row.active .offer-arrow { transform: translateX(4px); }
.offer-preview { display: flex; min-height: 100%; flex-direction: column; justify-content: space-between; padding: 42px; background: var(--sp-ivory-100); }
.preview-kind { margin: 0 0 22px; color: var(--color-accent-on-light); font-size: .65rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
.offer-preview h3 { max-width: 360px; margin: 0 0 22px; font-size: clamp(2rem, 3vw, 3.2rem); line-height: .98; }
.preview-description { max-width: 380px; margin: 0; color: var(--color-text-muted); font-size: .82rem; line-height: 1.75; }
.offer-preview ul { display: grid; gap: 10px; padding: 0; margin: 30px 0 42px; list-style: none; }
.offer-preview li { position: relative; padding-left: 18px; color: var(--color-text-muted); font-size: .75rem; }
.offer-preview li::before { position: absolute; top: .62em; left: 0; width: 5px; height: 5px; background: var(--sp-bronze-600); border-radius: 50%; content: ''; }
.preview-cta { display: inline-flex; justify-content: space-between; gap: 24px; padding-top: 18px; border-top: 1px solid var(--color-border); color: var(--color-text-dark); font-size: .76rem; font-weight: 600; text-decoration: none; }
.preview-cta:hover { color: var(--color-accent-on-light); }
.official-note { max-width: 760px; margin: 20px 0 0; color: var(--color-text-muted); font-size: .66rem; line-height: 1.6; }
@media (max-width: 1023px) { .explorer-heading { grid-template-columns: 1fr; gap: 24px; } .explorer-layout { grid-template-columns: 1fr; } .offer-list { border-right: 0; border-bottom: 1px solid var(--color-border); } .offer-preview { min-height: 360px; } }
@media (max-width: 767px) { .explorer-heading { margin-bottom: 38px; } .audience-tabs { gap: 24px; overflow-x: auto; } .audience-tabs button { flex: 0 0 auto; } .audience-intro { grid-template-columns: 1fr; gap: 10px; } .offer-row { grid-template-columns: 36px minmax(0, 1fr) 22px; min-height: 72px; gap: 12px; padding-right: 8px; } .offer-kind { display: none; } .offer-title { font-size: 1.4rem; } .offer-preview { min-height: auto; padding: 30px 24px; } .offer-preview h3 { font-size: 2.35rem; } }
@media (prefers-reduced-motion: reduce) { .audience-tabs button::after, .offer-row, .offer-arrow { transition: none; } }
</style>
