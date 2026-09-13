<script setup lang="ts">
import { solutions } from '@/data/solutions'
</script>

<template>
  <section id="sobre" class="problem section-space" aria-labelledby="problem-title">
    <div class="container problem-grid">
      <div>
        <p class="eyebrow">Da informação dispersa à operação estruturada</p>
        <h2 id="problem-title">Sua operação precisa<br />de um ponto de encontro.</h2>
        <p class="problem-copy">Planilhas, documentos, mensagens e conferências manuais espalham a informação e aumentam a dependência de pessoas específicas.</p>
        <p class="problem-copy">O SomaPrumo transforma essa rotina em processos claros, rastreáveis e acompanháveis.</p>
      </div>

      <div class="solution-statement">
        <span class="eyebrow">A solução SomaPrumo</span>
        <p class="font-display">Menos informação solta.<br /><em>Mais processo conectado.</em></p>
        <ol class="information-flow" aria-label="Da organização à decisão">
          <li>Dados e documentos</li>
          <li>Processo e validação</li>
          <li>Automação e controle</li>
          <li>Informação para decisão</li>
        </ol>
      </div>
    </div>
  </section>

  <section id="solucoes" class="solutions section-space" aria-labelledby="solutions-title">
    <div class="container">
      <div class="section-intro">
        <div>
          <p class="eyebrow">A plataforma · quatro áreas, uma operação</p>
          <h2 id="solutions-title">Cada área no seu lugar.<br />Todas na mesma direção.</h2>
        </div>
        <p>Financeiro, contabilidade, fiscal e investimentos se complementam. A estrutura se adapta à realidade de cada operação.</p>
      </div>

      <div class="solutions-grid">
        <article v-for="solution in solutions" :id="solution.id" :key="solution.id" class="solution">
          <div class="solution-heading">
            <span class="solution-number">{{ solution.number }}</span>
            <h3>{{ solution.title }}</h3>
          </div>
          <p class="solution-summary">{{ solution.summary }}</p>
          <p>{{ solution.description }}</p>
          <details>
            <summary>Explore esta área <span aria-hidden="true">›</span></summary>
            <p>{{ solution.details }}</p>
          </details>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 90px; align-items: center; }
.problem-copy { max-width: 540px; color: var(--color-text-muted); font-size: .9rem; }
.problem-copy:first-of-type { margin-top: 28px; }
.solution-statement { padding: 36px 0 36px 42px; border-left: 1px solid var(--color-border); }
.solution-statement > p { margin: 22px 0 32px; font-size: clamp(2rem, 3vw, 2.7rem); line-height: 1.15; }
.solution-statement em { color: var(--color-accent-on-light); }
.information-flow { padding: 0; margin: 0; list-style: none; counter-reset: flow; }
.information-flow li { display: flex; align-items: center; gap: 20px; padding-block: 13px; border-top: 1px solid var(--color-border); font-size: .8rem; counter-increment: flow; }
.information-flow li::before { color: var(--color-accent-on-light); font-size: .65rem; content: '0' counter(flow); }
.solutions { padding-top: 0; }
.solutions > .container { padding-top: var(--section-space); border-top: 1px solid var(--color-border); }
.solutions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 64px; }
.solution { padding-block: 30px 36px; border-top: 1px solid var(--color-border); }
.solution-heading { display: flex; align-items: baseline; gap: 20px; }
.solution-number { color: var(--color-accent-on-light); font-size: .7rem; }
.solution h3 { font-size: 2.5rem; }
.solution p { max-width: 480px; margin: 12px 0; color: var(--color-text-muted); font-size: .86rem; }
.solution .solution-summary { margin-top: 20px; color: var(--color-text-dark); font-weight: 500; }
summary { display: flex; min-height: 48px; align-items: center; justify-content: space-between; gap: 24px; padding-block: 14px; font-size: .75rem; list-style: none; cursor: pointer; }
summary::-webkit-details-marker { display: none; }
summary span { color: var(--color-accent-on-light); font-size: 1.35rem; transition: transform .2s ease; }
details[open] summary span { transform: rotate(90deg); }
details[open] { border-bottom: 1px solid var(--color-border); }
@media (max-width: 1023px) { .problem-grid { gap: 36px; } .solution-statement { padding-left: 28px; } }
@media (max-width: 767px) { .problem-grid, .solutions-grid { grid-template-columns: 1fr; } .solution-statement { padding-block: 12px; padding-left: 24px; } .solution { padding-block: 24px; } }
@media (prefers-reduced-motion: reduce) { summary span { transition: none; } }
</style>
