<script setup lang="ts">
import { brand } from '@/config/brand'
import { methodology } from '@/data/solutions'
</script>

<template>
  <section id="automacao" class="dark-section section-space" aria-labelledby="automation-title">
    <div class="container automation-grid">
      <div>
        <p class="eyebrow">Automação personalizada</p>
        <h2 id="automation-title">Sua empresa é única.<br /><em>Seus processos também.</em></h2>
        <p class="automation-copy">Sistemas, documentos, políticas e responsáveis mudam de uma empresa para outra. Uma automação precisa considerar essas diferenças.</p>
        <p class="automation-copy">Desenvolvemos automações financeiras, contábeis e fiscais a partir da sua operação: da conciliação ao processamento de documentos, das conferências ao tratamento de exceções.</p>
        <a class="text-link" :href="brand.links.contact">{{ brand.primaryCta }} <span aria-hidden="true">↗</span></a>
      </div>
      <div class="control-panel">
        <p class="eyebrow">Processos críticos</p>
        <h3>Automação com controle,<br />não automação às cegas.</h3>
        <ol class="control-flow">
          <li><span class="flow-index">01</span><div><strong>Automatizar o repetitivo</strong><p>Processar, classificar e cruzar informações conforme regras definidas.</p></div></li>
          <li class="human-review"><span class="flow-index">02</span><div><strong>Validar o que exige atenção</strong><p>Direcionar divergências e decisões críticas para revisão e aprovação humana.</p><span class="review-label">Revisão humana</span></div></li>
          <li><span class="flow-index">03</span><div><strong>Manter a rastreabilidade</strong><p>Acompanhar evidências, responsáveis e o histórico de cada etapa.</p></div></li>
        </ol>
      </div>
    </div>
  </section>
  <section id="processo" class="methodology section-space" aria-labelledby="method-title">
    <div class="container">
      <div class="section-intro"><div><p class="eyebrow">Como trabalhamos</p><h2 id="method-title">Antes de automatizar,<br />é preciso entender.</h2></div><p>Um caminho construído com a sua equipe, do diagnóstico da rotina ao acompanhamento da operação.</p></div>
      <ol class="method-grid"><li v-for="(step, index) in methodology" :key="step.title"><span class="step-number">0{{ index + 1 }}</span><h3>{{ step.title }}</h3><p>{{ step.description }}</p></li></ol>
    </div>
  </section>
</template>

<style scoped>
.automation-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 80px; align-items: center; }
h2 em { color: var(--color-brand-primary); font-weight: 400; }
.automation-copy { color: var(--color-text-muted-light); font-size: .9rem; max-width: 530px; }
.automation-copy:first-of-type { margin-top: 28px; }
.text-link { margin-top: 12px; }
.control-panel { border: 1px solid var(--color-border-dark); padding: 36px; background: var(--color-surface-dark); }
.control-panel h3 { font-size: 2.2rem; }
.control-flow { list-style: none; padding: 0; margin: 30px 0 0; }
.control-flow li { display: flex; gap: 20px; padding-block: 22px; border-top: 1px solid var(--color-border-dark); }
.control-flow li:last-child { padding-bottom: 0; }
.flow-index { font-size: .65rem; color: var(--color-brand-primary); padding-top: 4px; }
.control-flow strong { font-size: .8rem; font-weight: 500; }
.control-flow p { font-size: .78rem; line-height: 1.7; color: var(--color-text-muted-light); margin: 10px 0 0; }
.human-review { border-left: 2px solid var(--color-brand-primary); padding-left: 16px; }
.review-label { display: inline-block; padding-top: 14px; color: var(--color-brand-primary); text-transform: uppercase; letter-spacing: .14em; font-size: .59rem; }
.methodology { background: var(--color-bg-sand); }
.method-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px; padding: 0; margin: 0; list-style: none; }
.method-grid li { border-top: 1px solid var(--color-accent-on-light); padding-top: 24px; }
.step-number { color: var(--color-accent-on-light); font-size: .7rem; }
.method-grid h3 { margin-top: 24px; font-size: 2rem; }
.method-grid p { font-size: .82rem; color: var(--color-text-muted); margin-bottom: 0; }
@media (max-width: 1023px) { .automation-grid { gap: 36px; } .control-panel { padding: 28px; } .method-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 767px) { .automation-grid { grid-template-columns: 1fr; } .control-panel { padding: 24px; } .method-grid { grid-template-columns: 1fr; gap: 24px; } .method-grid li { display: grid; grid-template-columns: 36px 1fr; column-gap: 16px; } .method-grid h3 { margin: 0; } .method-grid p { grid-column: 2; } .step-number { padding-top: 9px; } }
</style>
