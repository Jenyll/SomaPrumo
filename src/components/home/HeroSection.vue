<script setup lang="ts">
import { brand } from '@/config/brand'
import meetingPhoto from '@/assets/photos/process-meeting.jpg'
</script>

<template>
  <section class="hero dark-section" aria-labelledby="hero-title">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">{{ brand.heroEyebrow }}</p>
        <h1 id="hero-title">Operações<br />com <em>clareza.</em></h1>
        <p class="hero-lead">{{ brand.heroSupportText }}</p>

        <div class="actions">
          <a class="button button-primary" :href="brand.links.solutions">{{ brand.primaryCta }} <span aria-hidden="true">↗</span></a>
          <button type="button" class="text-link is-placeholder-action">{{ brand.secondaryCta }}</button>
          <!-- TODO: conectar à jornada comercial quando a rota estiver disponível. -->
        </div>

        <p class="hero-footnote">Automação com controle.<br />Conhecimento especializado para manter o processo em ordem.</p>
      </div>

      <figure class="hero-figure">
        <div class="photo-frame">
          <img
            :src="meetingPhoto"
            width="1600"
            height="1067"
            fetchpriority="high"
            alt="Profissionais mapeando etapas de um processo em reunião de planejamento"
          />
        </div>
        <figcaption>
          <span>O ponto de partida é a sua realidade.</span>
          <span aria-hidden="true">01 — 04</span>
        </figcaption>
      </figure>
    </div>

    <div class="container pillar-strip" aria-label="Áreas de atuação">
      <span class="strip-label">Uma visão integrada</span>
      <a href="#financeiro">Financeiro</a>
      <a href="#contabilidade">Contabilidade</a>
      <a href="#fiscal">Fiscal</a>
      <a href="#investimentos">Investimentos</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(36px, 5vw, 64px);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: clamp(38px, 5vw, 92px);
  padding-bottom: 56px;
}

h1 {
  font-size: clamp(4rem, 7vw, 7.1rem);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: -0.04em;
}

h1 em {
  color: var(--color-brand-primary);
  font-weight: 400;
}

.hero-lead {
  max-width: 560px;
  color: var(--color-text-muted-light);
  margin: 28px 0 30px;
  font-size: 1rem;
}

.hero-footnote {
  border-left: 1px solid var(--color-brand-primary);
  padding-left: 16px;
  font-size: 0.73rem;
  color: var(--color-text-muted-light);
  margin: 32px 0 0;
}

.hero-figure {
  margin: 0;
  position: relative;
  padding-top: 20px;
}

.hero-figure::before {
  content: '';
  position: absolute;
  top: 0;
  right: 18px;
  width: 58%;
  height: 72%;
  border-top: 1px solid var(--color-brand-primary);
  border-left: 1px solid var(--color-brand-primary);
  pointer-events: none;
}

.photo-frame {
  margin-left: 22px;
  overflow: hidden;
}

.photo-frame img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: 43% center;
  filter: saturate(0.38);
}

figcaption {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 18px 0 0 22px;
  font-size: 0.63rem;
  color: var(--color-text-muted-light);
}

figcaption span:last-child {
  white-space: nowrap;
  color: var(--color-brand-primary);
}

.pillar-strip {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  border-top: 1px solid var(--color-border-dark);
  min-height: 92px;
}

.strip-label {
  max-width: 110px;
  color: var(--color-text-muted-light);
  font-size: 0.64rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  line-height: 1.8;
}

.pillar-strip a {
  font-family: var(--font-display);
  font-size: 1.8rem;
  text-decoration: none;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.pillar-strip a:hover,
.pillar-strip a:focus-visible {
  color: var(--color-brand-primary);
}

@media (max-width: 1023px) {
  .hero-grid { gap: 28px; }
  h1 { font-size: clamp(3.8rem, 8vw, 5.8rem); }
  .hero .actions { align-items: flex-start; flex-direction: column; gap: 10px; }
  .photo-frame img { height: 470px; }
}

@media (max-width: 767px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 34px;
    padding-bottom: 36px;
  }

  h1 {
    font-size: clamp(3.6rem, 14vw, 5.3rem);
  }

  .hero-lead {
    font-size: 0.9rem;
    margin-top: 24px;
  }

  .hero-footnote {
    display: none;
  }

  .hero-figure {
    padding-top: 16px;
  }

  .photo-frame {
    margin-left: 14px;
  }

  .photo-frame img {
    height: 280px;
    object-position: center 42%;
  }

  figcaption {
    margin-left: 14px;
    font-size: 0.6rem;
  }

  .pillar-strip {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 20px;
    padding: 20px 0;
  }

  .strip-label {
    grid-column: 1 / -1;
    max-width: none;
    margin-bottom: 8px;
  }

  .pillar-strip a {
    font-size: 1.5rem;
  }
}
</style>
