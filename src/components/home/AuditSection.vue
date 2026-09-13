<script setup lang="ts">
import { brand } from '@/config/brand'
</script>

<template>
  <section id="auditoria" class="audit section-space" aria-labelledby="audit-title">
    <div class="container audit-grid">
      <div class="audit-statement dark-section">
        <p class="eyebrow">Tecnologia + conhecimento fiscal</p>
        <p class="font-display">Tecnologia para analisar.<br /><em>Experiência para interpretar.</em></p>
        <div class="audit-principle">
          <span aria-hidden="true">↳</span>
          <p>Processos fiscais exigem critério, evidência e responsabilidade.</p>
        </div>
      </div>

      <div>
        <p class="eyebrow">Auditoria fiscal</p>
        <h2 id="audit-title">Um olhar especializado<br />sobre o que importa.</h2>
        <p class="audit-copy">O SomaPrumo conta com profissional auditor fiscal na operação. Tecnologia organiza e cruza informações; a análise especializada interpreta inconsistências, riscos e evidências para apoiar decisões com mais segurança.</p>
        <div class="audit-proof" aria-label="Diferencial de auditoria">
          <span>Análise especializada</span>
          <strong>com profissional auditor fiscal</strong>
        </div>
        <ul class="audit-list">
          <li>Revisão de informações e processos fiscais</li>
          <li>Identificação de inconsistências e análise de riscos</li>
          <li>Validações, evidências e rastreabilidade</li>
          <li>Melhoria de processos e organização tributária</li>
        </ul>
        <a class="text-link" :href="brand.links.contact">{{ brand.primaryCta }} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>

  <section id="tecnologia" class="technology dark-section section-space" aria-labelledby="technology-title">
    <div class="container technology-grid">
      <div>
        <p class="eyebrow">Tecnologia a serviço do processo</p>
        <h2 id="technology-title">Conectar informações.<br />Preservar o contexto.</h2>
      </div>
      <div>
        <p class="technology-copy">As integrações são planejadas conforme os sistemas e as necessidades de cada empresa. O objetivo é reduzir redigitação sem perder origem, contexto e controle.</p>
        <div class="connected-areas" aria-label="Fluxo entre financeiro, contabilidade e fiscal">
          <span>Financeiro</span><span aria-hidden="true">→</span><span>Contabilidade</span><span aria-hidden="true">→</span><span>Fiscal</span>
        </div>
        <p class="technology-note">Automação conecta. Controle acompanha. Auditoria valida o que precisa de atenção.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.audit-grid { display: grid; grid-template-columns: 1fr 1.1fr; align-items: center; gap: 90px; }
.audit-statement { display: flex; min-height: 460px; flex-direction: column; justify-content: space-between; padding: 52px 42px; }
.audit-statement > p.font-display { margin: 30px 0 48px; font-size: clamp(2.8rem, 3.7vw, 3.8rem); line-height: 1.08; }
.audit-statement em { color: var(--color-brand-primary); }
.audit-principle { display: flex; align-items: center; gap: 20px; padding-top: 20px; border-top: 1px solid var(--color-border-dark); }
.audit-principle span { color: var(--color-brand-primary); font-size: 2.4rem; }
.audit-principle p { max-width: 260px; color: var(--color-text-muted-light); font-size: .75rem; }
.audit-copy { margin-top: 26px; color: var(--color-text-muted); font-size: .9rem; }
.audit-proof { display: grid; gap: 5px; margin: 24px 0 10px; padding: 18px 0; border-block: 1px solid var(--color-border); }
.audit-proof span { color: var(--color-accent-on-light); font-size: .62rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.audit-proof strong { font-family: var(--font-display); font-size: 1.45rem; font-weight: 500; }
.audit-list { padding: 0; margin: 12px 0 16px; list-style: none; }
.audit-list li { padding: 12px 0; border-top: 1px solid var(--color-border); font-size: .8rem; }
.technology-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 90px; align-items: center; }
.technology h2 { font-size: clamp(2.5rem, 3.7vw, 3.5rem); }
.technology-copy { margin-top: 0; color: var(--color-text-muted-light); font-size: .9rem; }
.connected-areas { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 28px; padding: 24px 0; border-block: 1px solid var(--color-border-dark); font-size: .85rem; }
.connected-areas span[aria-hidden] { color: var(--color-brand-primary); }
.technology-note { margin: 20px 0 0; color: var(--color-text-muted-light); font-size: .72rem; }
@media (max-width: 1023px) { .audit-grid, .technology-grid { gap: 36px; } .audit-statement { padding: 36px 28px; } .connected-areas { gap: 6px; font-size: .75rem; } }
@media (max-width: 767px) { .audit-grid, .technology-grid { grid-template-columns: 1fr; } .audit-statement { order: 2; min-height: 350px; margin-top: 8px; } .audit-statement > p.font-display { margin-block: 20px 32px; font-size: 2.8rem; } .connected-areas { font-size: .73rem; } }
</style>
