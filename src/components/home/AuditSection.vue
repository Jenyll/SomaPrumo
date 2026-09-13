<script setup lang="ts">
import { brand } from '@/config/brand'
</script>

<template>
  <section id="auditoria" class="audit section-space" aria-labelledby="audit-title">
    <div class="container audit-grid">
      <div class="audit-statement dark-section">
        <p class="eyebrow">Tecnologia + conhecimento fiscal</p>
        <p class="font-display">Precisão para analisar.<br /><em>Critério para agir.</em></p>
        <div class="audit-principle"><span aria-hidden="true">↳</span><p>Conferência, evidência e responsabilidade em cada etapa.</p></div>
      </div>
      <div>
        <p class="eyebrow">Auditoria fiscal</p>
        <h2 id="audit-title">Um olhar especializado<br />sobre o que importa.</h2>
        <p class="audit-copy">O SomaPrumo conta com profissional auditor fiscal na operação. Unimos tecnologia e análise especializada para revisar processos, identificar inconsistências e fortalecer controles fiscais.</p>
        <ul class="audit-list"><li>Revisão de informações e processos fiscais</li><li>Identificação de inconsistências e análise de riscos</li><li>Validações, evidências e rastreabilidade</li><li>Melhoria de processos e organização tributária</li></ul>
        <a class="text-link" :href="brand.links.contact">{{ brand.primaryCta }} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
  <section id="tecnologia" class="technology dark-section section-space" aria-labelledby="technology-title">
    <div class="container technology-grid">
      <div><p class="eyebrow">Tecnologia a serviço do processo</p><h2 id="technology-title">Conectar informações.<br />Preservar o contexto.</h2></div>
      <div><p class="technology-copy">As integrações são planejadas conforme os sistemas e as necessidades de cada empresa. O objetivo é aproximar as áreas, reduzir redigitação e preservar a origem das informações.</p>
        <div class="connected-areas" aria-label="Financeiro, contabilidade e fiscal conectados"><span>Financeiro</span><span aria-hidden="true">↔</span><span>Contabilidade</span><span aria-hidden="true">↔</span><span>Fiscal</span></div>
        <p class="technology-note">Investimentos alimentam a visão financeira e contábil.<br />Automação conecta as etapas. Auditoria e controle acompanham o fluxo.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.audit-grid { display: grid; grid-template-columns: 1fr 1.1fr; align-items: center; gap: 90px; }
.audit-statement { padding: 52px 42px; min-height: 460px; display: flex; flex-direction: column; justify-content: space-between; }
.audit-statement > p.font-display { font-size: clamp(2.8rem, 3.7vw, 3.8rem); line-height: 1.12; margin: 30px 0 48px; }
.audit-statement em { color: var(--color-brand-primary); }
.audit-principle { display: flex; gap: 20px; align-items: center; border-top: 1px solid var(--color-border-dark); padding-top: 20px; }
.audit-principle span { font-size: 2.4rem; color: var(--color-brand-primary); }
.audit-principle p { font-size: .75rem; color: var(--color-text-muted-light); max-width: 235px; }
.audit-copy { color: var(--color-text-muted); font-size: .9rem; margin-top: 26px; }
.audit-list { list-style: none; padding: 0; margin: 24px 0 16px; }
.audit-list li { font-size: .8rem; padding: 12px 0; border-top: 1px solid var(--color-border); }
.technology-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 90px; align-items: center; }
.technology h2 { font-size: clamp(2.5rem, 3.7vw, 3.5rem); }
.technology-copy { color: var(--color-text-muted-light); font-size: .9rem; margin-top: 0; }
.connected-areas { display: flex; justify-content: space-between; align-items: center; gap: 10px; border-block: 1px solid var(--color-border-dark); padding: 24px 0; margin-top: 28px; font-size: .85rem; }
.connected-areas span[aria-hidden] { color: var(--color-brand-primary); }
.technology-note { color: var(--color-text-muted-light); font-size: .72rem; margin: 20px 0 0; }
@media (max-width: 1023px) { .audit-grid, .technology-grid { gap: 36px; } .audit-statement { padding: 36px 28px; } .connected-areas { font-size: .75rem; gap: 6px; } }
@media (max-width: 767px) { .audit-grid, .technology-grid { grid-template-columns: 1fr; } .audit-statement { min-height: 350px; order: 2; margin-top: 8px; } .audit-statement > p.font-display { font-size: 2.8rem; margin-block: 20px 32px; } .connected-areas { font-size: .73rem; } }
</style>
