<template>
  <section id="planos" class="plans dark-section section-space" aria-labelledby="plans-title">
    <div class="container">
      <div class="section-intro">
        <div>
          <p class="eyebrow">Planos e acompanhamento</p>
          <h2 id="plans-title">Comece pelo que faz<br />sentido para você.</h2>
        </div>
        <p>Planos pessoais, acompanhamento para MEI e soluções empresariais com níveis diferentes de suporte e especialização.</p>
      </div>

      <div class="plans-grid">
        <article>
          <span>01</span>
          <p class="eyebrow">Pessoal</p>
          <h3>Organização para você.</h3>
          <p>Finanças, patrimônio e investimentos em uma experiência simples.</p>
          <a href="#contato" class="text-link">Quero conhecer <span aria-hidden="true">→</span></a>
        </article>

        <article>
          <span>02</span>
          <p class="eyebrow">MEI</p>
          <h3>Gestão do seu negócio.</h3>
          <p>Faturamento, obrigações, documentos, alertas e serviços assistidos.</p>
          <a href="#contato" class="text-link">Quero conhecer <span aria-hidden="true">→</span></a>
        </article>

        <article>
          <span>03</span>
          <p class="eyebrow">Empresas</p>
          <h3>Estrutura para crescer.</h3>
          <p>Financeiro, contabilidade, fiscal, automação e serviços especializados.</p>
          <a href="#contato" class="text-link">Falar com especialista <span aria-hidden="true">→</span></a>
        </article>
      </div>

      <p class="pricing-note">Valores e escopos serão apresentados quando os planos comerciais forem definidos. Nenhum preço fictício é exibido.</p>
    </div>
  </section>
</template>

<style scoped>
.plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-block: 1px solid var(--color-border-dark); }
article { display: flex; min-height: 360px; flex-direction: column; padding: 34px; border-left: 1px solid var(--color-border-dark); }
article:last-child { border-right: 1px solid var(--color-border-dark); }
article > span { margin-bottom: 46px; color: var(--color-brand-primary); font-size: .62rem; }
h3 { margin: 0 0 18px; font-size: 2.25rem; line-height: 1.08; }
article > p:not(.eyebrow) { color: var(--color-text-muted-light); font-size: .82rem; }
.text-link { margin-top: auto; }
.pricing-note { margin: 20px 0 0; color: var(--color-text-muted-light); font-size: .67rem; }
@media (max-width: 767px) { .plans-grid { grid-template-columns: 1fr; } article { min-height: 280px; border-right: 1px solid var(--color-border-dark); border-bottom: 1px solid var(--color-border-dark); } }
</style>
