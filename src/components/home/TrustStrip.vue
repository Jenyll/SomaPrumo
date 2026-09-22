<template>
  <section class="trust-strip" aria-label="Princípios de confiança SomaPrumo">
    <div class="container trust-grid">
      <div>
        <span>01</span>
        <strong>Rastreabilidade</strong>
        <p>Histórico, evidências e responsáveis em cada etapa.</p>
      </div>
      <div>
        <span>02</span>
        <strong>Validação humana</strong>
        <p>Decisões críticas permanecem sob revisão.</p>
      </div>
      <div>
        <span>03</span>
        <strong>Processos definidos</strong>
        <p>Critérios claros antes de automatizar.</p>
      </div>
      <div>
        <span>04</span>
        <strong>Conhecimento especializado</strong>
        <p>Tecnologia apoiada por análise profissional.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-strip { background: var(--sp-ivory-50); border-bottom: 1px solid var(--color-border); }
.trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.trust-grid > div { padding: 28px 24px; border-left: 1px solid var(--color-border); }
.trust-grid > div:last-child { border-right: 1px solid var(--color-border); }
span { display: block; margin-bottom: 18px; color: var(--color-accent-on-light); font-size: .62rem; letter-spacing: .14em; }
strong { display: block; font-family: var(--font-display); font-size: 1.35rem; font-weight: 500; }
p { margin: 8px 0 0; color: var(--color-text-muted); font-size: .75rem; line-height: 1.65; }
@media (max-width: 1023px) { .trust-grid { grid-template-columns: 1fr 1fr; } .trust-grid > div:nth-child(n + 3) { border-top: 1px solid var(--color-border); } }
@media (max-width: 767px) { .trust-grid { grid-template-columns: 1fr; } .trust-grid > div { border-right: 1px solid var(--color-border); border-top: 1px solid var(--color-border); } }
</style>
