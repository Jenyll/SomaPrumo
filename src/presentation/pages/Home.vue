<template>
  <main class="page-shell">
    <header class="topbar">
      <div class="brand-block">
        <div class="brand-mark">S</div>
        <div>
          <span class="brand-name">SomaPrumo</span>
          <small>Operações com clareza</small>
        </div>
      </div>

      <nav class="main-nav" aria-label="Navegação principal">
        <a href="#solucoes">Soluções</a>
        <a href="#resultados">Resultados</a>
        <a href="#processo">Processo</a>
        <a href="#contato">Contato</a>
      </nav>

      <button class="nav-cta">Agendar demo</button>
    </header>

    <section class="hero section-grid">
      <div class="hero-copy">
        <p class="eyebrow">Automação para contabilidade e obra</p>
        <h1>Centralize custos, medições e relatórios em um só lugar.</h1>
        <p class="lead">
          A SomaPrumo ajuda escritórios e empresas de engenharia a reduzir retrabalho,
          ganhar previsibilidade e tomar decisões com dados confiáveis.
        </p>

        <div class="hero-actions">
          <button class="primary-button">Solicitar demonstração</button>
          <button class="secondary-button">Ver solução</button>
        </div>

        <div class="mini-stats" aria-label="Indicadores principais">
          <div>
            <strong>38%</strong>
            <span>menos retrabalho</span>
          </div>
          <div>
            <strong>12h</strong>
            <span>economizadas por semana</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>visibilidade operacional</span>
          </div>
        </div>
      </div>

      <div class="hero-visual" aria-label="Preview do dashboard">
        <div class="visual-card main-panel">
          <div class="panel-header">
            <span class="dot green" />
            <span class="dot yellow" />
            <span class="dot red" />
          </div>

          <div class="dashboard-grid">
            <div class="chart-panel">
              <div class="kpi-row">
                <span>Faturamento</span>
                <strong>R$ 184,6k</strong>
              </div>
              <div class="bars" aria-hidden="true">
                <span style="height: 38%" />
                <span style="height: 52%" />
                <span style="height: 68%" />
                <span style="height: 82%" />
                <span style="height: 72%" />
                <span style="height: 94%" />
              </div>
            </div>

            <div class="side-panel">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
                alt="Equipe revisando dados de obra"
              />
              <div class="mini-card">
                <span class="label">Projetos ativos</span>
                <strong>32</strong>
                <small>+8% no mês</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="logo-strip" aria-label="Parceiros e clientes">
      <span>Contabilidade</span>
      <span>Construção</span>
      <span>Obra Civil</span>
      <span>Financeiro</span>
      <span>Gestão</span>
    </section>

    <section id="solucoes" class="features section-block">
      <div class="section-heading">
        <p class="eyebrow">Solução completa</p>
        <h2>Da rotina contábil à execução da obra.</h2>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <div class="icon-box">01</div>
          <h3>Gestão contábil</h3>
          <p>Organize lançamentos, conciliações e saldos com processos mais claros e menos erros.</p>
        </article>

        <article class="feature-card highlight">
          <div class="icon-box">02</div>
          <h3>Medições e projetos</h3>
          <p>Controle etapas, estimativas e progresso em tempo real para cada empreendimento.</p>
        </article>

        <article class="feature-card">
          <div class="icon-box">03</div>
          <h3>Relatórios vivos</h3>
          <p>Transforme dados em dashboards acionáveis para direção, contabilidade e obra.</p>
        </article>
      </div>
    </section>

    <section id="resultados" class="showcase section-grid section-block">
      <div class="showcase-media">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
          alt="Time trabalhando em reunião com planejamento"
        />
      </div>

      <div class="showcase-copy">
        <p class="eyebrow">Mais controle, menos improviso</p>
        <h2>Visibilidade operacional sem depender de planilhas espalhadas.</h2>
        <ul class="check-list">
          <li>Fluxos de aprovação com rastreio claro</li>
          <li>Centralização de projetos, valores e documentos</li>
          <li>Alertas para riscos e atrasos de execução</li>
        </ul>
      </div>
    </section>

    <section id="processo" class="process section-block">
      <div class="section-heading">
        <p class="eyebrow">Como funciona</p>
        <h2>Um processo simples para equipes exigentes.</h2>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <span>1</span>
          <h3>Conectar</h3>
          <p>Sincronize dados de projetos, contas e movimentações em poucos passos.</p>
        </div>

        <div class="step-card">
          <span>2</span>
          <h3>Validar</h3>
          <p>Revele inconsistências, anomalias e pendências antes que impactem o fluxo.</p>
        </div>

        <div class="step-card">
          <span>3</span>
          <h3>Decidir</h3>
          <p>Monitore indicadores e acompanhe a performance em tempo real.</p>
        </div>
      </div>
    </section>

    <section class="cta-banner" id="contato">
      <div>
        <p class="eyebrow">Pronto para evoluir?</p>
        <h2>Planeje a próxima etapa do seu escritório ou obra com mais clareza.</h2>
      </div>
      <button class="primary-button">Falar com especialista</button>
    </section>
  </main>
</template>

<script setup lang="ts">
defineOptions({ name: 'HomePage' })
</script>

<style scoped>
.page-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 72px;
}

.topbar,
.section-grid,
.section-block,
.logo-strip,
.cta-banner {
  width: min(1200px, 100%);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 4px 30px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f172a, #1b8a7a);
  color: #f8fafc;
  font-weight: 800;
  box-shadow: 0 14px 30px rgba(17, 94, 89, 0.26);
}

.brand-name {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.brand-block small {
  display: block;
  font-size: 0.72rem;
  color: #6b7280;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 0.92rem;
}

.main-nav a {
  color: #475569;
  text-decoration: none;
  transition: color 0.2s ease;
}

.main-nav a:hover {
  color: #0f172a;
}

.nav-cta,
.primary-button,
.secondary-button {
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-cta,
.primary-button {
  background: linear-gradient(135deg, #0f172a 0%, #0b7c6b 100%);
  color: white;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.18);
}

.nav-cta {
  padding: 0.8rem 1.1rem;
  font-weight: 700;
}

.primary-button,
.secondary-button {
  padding: 1rem 1.5rem;
  font-weight: 700;
}

.secondary-button {
  background: rgba(15, 23, 42, 0.04);
  color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.nav-cta:hover,
.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-1px);
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 48px;
  padding: 32px 0 24px;
}

.eyebrow {
  margin: 0 0 14px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #057a6e;
}

.hero-copy h1,
.section-heading h2,
.showcase-copy h2,
.cta-banner h2 {
  margin: 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  letter-spacing: -0.04em;
  color: #111827;
}

.hero-copy h1 {
  font-size: clamp(3rem, 5vw, 5rem);
  line-height: 0.92;
  max-width: 620px;
}

.lead {
  max-width: 560px;
  margin-top: 18px;
  font-size: 1.05rem;
  line-height: 1.75;
  color: #475569;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 28px;
}

.mini-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 18px;
  margin-top: 32px;
}

.mini-stats div {
  padding: 16px 12px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
}

.mini-stats strong {
  display: block;
  font-size: 1.3rem;
  color: #0f172a;
}

.mini-stats span {
  display: block;
  margin-top: 8px;
  font-size: 0.72rem;
  line-height: 1.5;
  color: #475569;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  width: min(100%, 540px);
  padding: 18px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,250,252,0.85));
  border: 1px solid rgba(148,163,184,0.18);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.14);
}

.panel-header {
  display: flex;
  gap: 8px;
  padding: 0 0 16px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot.green { background: #34d399; }
.dot.yellow { background: #fbbf24; }
.dot.red { background: #f87171; }

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.8fr;
  gap: 18px;
}

.chart-panel,
.side-panel {
  border-radius: 22px;
  background: #f8fafc;
  border: 1px solid rgba(148,163,184,0.2);
  padding: 18px;
}

.kpi-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 18px;
  color: #475569;
  font-size: 0.82rem;
}

.kpi-row strong {
  font-size: 1.2rem;
  color: #0f172a;
}

.bars {
  height: 180px;
  display: flex;
  align-items: end;
  gap: 12px;
  padding-top: 10px;
}

.bars span {
  display: block;
  flex: 1;
  border-radius: 20px 20px 8px 8px;
  background: linear-gradient(180deg, #0b7c6b 0%, #93c5bd 100%);
}

.side-panel img {
  border-radius: 18px;
  width: 100%;
  height: 170px;
  object-fit: cover;
  display: block;
}

.mini-card {
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0f172a 0%, #0b7c6b 100%);
  color: white;
}

.mini-card .label,
.mini-card small {
  display: block;
  opacity: 0.8;
}

.mini-card strong {
  display: block;
  margin: 8px 0 4px;
  font-size: 1.8rem;
}

.logo-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 26px;
  padding: 18px 22px;
  border-radius: 22px;
  border: 1px solid rgba(148,163,184,0.18);
  background: rgba(255,255,255,0.68);
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-align: center;
}

.section-block {
  margin-top: 84px;
}

.section-heading {
  margin-bottom: 28px;
}

.section-heading h2,
.showcase-copy h2,
.cta-banner h2 {
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  line-height: 0.98;
  max-width: 680px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 22px;
}

.feature-card {
  padding: 28px 22px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(148,163,184,0.15);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
}

.feature-card.highlight {
  background: linear-gradient(180deg, #0f172a 0%, #0b7c6b 100%);
  color: white;
}

.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: rgba(11, 124, 107, 0.12);
  color: #0b7c6b;
  font-weight: 800;
}

.feature-card.highlight .icon-box {
  background: rgba(255,255,255,0.14);
  color: white;
}

.feature-card h3 {
  margin: 18px 0 12px;
  font-size: 1.35rem;
}

.feature-card p {
  margin: 0;
  line-height: 1.7;
  color: inherit;
  opacity: 0.8;
}

.showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 42px;
  align-items: center;
}

.showcase-media img {
  width: 100%;
  height: 540px;
  object-fit: cover;
  border-radius: 32px;
  box-shadow: 0 36px 80px rgba(15, 23, 42, 0.18);
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 26px 0 0;
  display: grid;
  gap: 16px;
}

.check-list li {
  position: relative;
  padding-left: 30px;
  color: #334155;
  line-height: 1.6;
}

.check-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: #0b7c6b;
  font-weight: 800;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 22px;
}

.step-card {
  padding: 26px 20px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(148,163,184,0.18);
}

.step-card span {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(11, 124, 107, 0.1);
  color: #0b7c6b;
  font-weight: 800;
}

.step-card h3 {
  margin: 18px 0 10px;
  font-size: 1.3rem;
}

.step-card p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
}

.cta-banner {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  margin-top: 90px;
  padding: 28px 32px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(12, 25, 38, 0.96), rgba(11, 124, 107, 0.9));
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.2);
}

.cta-banner .eyebrow {
  color: #d9fff3;
}

.cta-banner h2 {
  color: #f8fafc;
  max-width: 720px;
}

@media (max-width: 960px) {
  .topbar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-nav {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero,
  .showcase,
  .feature-grid,
  .steps-grid,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 12px;
  }

  .showcase-media img {
    height: 420px;
  }

  .cta-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .page-shell {
    width: min(100% - 22px, 1200px);
  }

  .topbar {
    padding-bottom: 18px;
  }

  .main-nav {
    gap: 14px;
    font-size: 0.8rem;
  }

  .hero-copy h1 {
    font-size: clamp(2.6rem, 18vw, 4rem);
  }

  .mini-stats {
    grid-template-columns: 1fr;
  }

  .logo-strip {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }

  .feature-card,
  .step-card,
  .visual-card {
    border-radius: 20px;
  }

  .showcase-media img {
    height: 300px;
  }

  .cta-banner {
    padding: 22px 20px;
  }
}
</style>
