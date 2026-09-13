<script setup lang="ts">
import { solutions } from '@/data/solutions'
</script>

<template>
  <section id="sobre" class="problem section-space" aria-labelledby="problem-title">
    <div class="container problem-grid">
      <div>
        <p class="eyebrow">Da informação dispersa à operação estruturada</p>
        <h2 id="problem-title">Sua operação precisa<br />de um ponto de encontro.</h2>
        <p class="problem-copy">Planilhas de um lado. Documentos em e-mails e WhatsApp do outro. Conferências manuais e respostas que dependem sempre da mesma pessoa.</p>
        <p class="problem-copy">O SomaPrumo organiza essa rotina em fluxos claros, com responsáveis, validações e informações que você consegue acompanhar.</p>
      </div>
      <div class="solution-statement">
        <span class="eyebrow">A solução SomaPrumo</span>
        <p class="font-display">Menos informação solta.<br /><em>Mais processo conectado.</em></p>
        <ol class="information-flow" aria-label="Da organização à decisão">
          <li>Dados e documentos</li><li>Processo e validação</li><li>Automação e controle</li><li>Informação para decisão</li>
        </ol>
      </div>
    </div>
  </section>
  <section id="solucoes" class="solutions section-space" aria-labelledby="solutions-title">
    <div class="container">
      <div class="section-intro">
        <div><p class="eyebrow">A plataforma · quatro áreas, uma operação</p><h2 id="solutions-title">Cada área no seu lugar.<br />Todas na mesma direção.</h2></div>
        <p>Financeiro, contabilidade, fiscal e investimentos se complementam. A estrutura parte das suas necessidades, com espaço para os detalhes de cada rotina.</p>
      </div>
      <div class="solutions-grid">
        <article v-for="solution in solutions" :id="solution.id" :key="solution.id" class="solution">
          <div class="solution-heading"><span class="solution-number">{{ solution.number }}</span><h3>{{ solution.title }}</h3></div>
          <p class="solution-summary">{{ solution.summary }}</p>
          <p>{{ solution.description }}</p>
          <details><summary>Explore esta área <span aria-hidden="true">+</span></summary><p>{{ solution.details }}</p></details>
        </article>
      </div>
      <div class="audiences" aria-label="Para quem é o SomaPrumo">
        <p class="eyebrow">Para a sua realidade</p>
        <div><h3>Para empresas</h3><p>Da rotina financeira às operações com muitas planilhas, sistemas desconectados e processos que precisam de estrutura.</p></div>
        <div><h3>Para pessoas físicas</h3><p>Organização financeira, investimentos, patrimônio, documentos e informações para as suas obrigações fiscais.</p></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 90px; align-items: center; }
.problem-copy { color: var(--color-text-muted); max-width: 540px; font-size: .93rem; }
.problem-copy:first-of-type { margin-top: 28px; }
.solution-statement { padding: 36px 0 36px 42px; border-left: 1px solid var(--color-border); }
.solution-statement > p { font-size: clamp(2rem, 3vw, 2.7rem); line-height: 1.15; margin: 22px 0 32px; }
.solution-statement em { color: var(--color-accent-on-light); }
.information-flow { list-style: none; padding: 0; margin: 0; counter-reset: flow; }
.information-flow li { display: flex; align-items: center; gap: 20px; padding-block: 13px; border-top: 1px solid var(--color-border); font-size: .8rem; counter-increment: flow; }
.information-flow li::before { content: '0' counter(flow); color: var(--color-accent-on-light); font-size: .65rem; }
.solutions { padding-top: 0; }
.solutions > .container { border-top: 1px solid var(--color-border); padding-top: var(--section-space); }
.solutions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 64px; }
.solution { border-top: 1px solid var(--color-border); padding-block: 30px 36px; }
.solution-heading { display: flex; gap: 20px; align-items: baseline; }
.solution-number { font-size: .7rem; color: var(--color-accent-on-light); }
.solution h3 { font-size: 2.5rem; }
.solution p { color: var(--color-text-muted); font-size: .88rem; margin: 12px 0; max-width: 480px; }
.solution .solution-summary { color: var(--color-text-dark); font-weight: 500; margin-top: 20px; }
summary { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding-block: 14px; min-height: 48px; font-size: .75rem; cursor: pointer; list-style: none; }
summary::-webkit-details-marker { display: none; }
summary span { font-size: 1.2rem; color: var(--color-accent-on-light); }
details[open] summary span { transform: rotate(45deg); }
details[open] { border-bottom: 1px solid var(--color-border); }
.audiences { display: grid; grid-template-columns: .7fr 1fr 1fr; gap: 48px; background: var(--sp-ivory-100); padding: 36px; margin-top: 24px; }
.audiences .eyebrow { margin: 7px 0 0; }
.audiences h3 { font-size: 1.7rem; }
.audiences p:not(.eyebrow) { color: var(--color-text-muted); font-size: .82rem; margin-bottom: 0; }
@media (max-width: 1023px) { .problem-grid { gap: 36px; } .solution-statement { padding-left: 28px; } .audiences { gap: 24px; grid-template-columns: 1fr 1fr; } .audiences .eyebrow { grid-column: 1 / -1; } }
@media (max-width: 767px) { .problem-grid, .solutions-grid, .audiences { grid-template-columns: 1fr; } .solution-statement { padding-block: 12px; padding-left: 24px; } .solution { padding-block: 24px; } .audiences { padding: 24px; } }
</style>
