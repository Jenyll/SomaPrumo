<script setup lang="ts">
import type { TeamMember } from '@/data/team'
import { brand } from '@/config/brand'
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps<{ members: TeamMember[] }>()
const trackRef = ref<HTMLElement | null>(null)
const canScrollBack = ref(false)
const canScrollForward = ref(false)
let observer: ResizeObserver | undefined
function updateControls() {
  const track = trackRef.value
  if (!track) return
  canScrollBack.value = track.scrollLeft > 2
  canScrollForward.value = track.scrollLeft + track.clientWidth < track.scrollWidth - 2
}
function scrollCarousel(direction: 1 | -1) {
  const track = trackRef.value
  if (!track) return
  const card = track.querySelector<HTMLElement>('.team-card')
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
  track.scrollBy({ left: direction * ((card?.offsetWidth ?? 280) + gap),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
onMounted(() => {
  updateControls()
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(updateControls)
    if (trackRef.value) observer.observe(trackRef.value)
  }
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="carousel" role="region" aria-label="Áreas de experiência da equipe">
    <div id="team-track" ref="trackRef" class="carousel-track" @scroll="updateControls">
      <article v-for="member in members" :key="member.id" class="team-card">
        <div class="avatar-wrap"><img :src="member.image" alt="Integrante da equipe SomaPrumo" width="1024" height="1536" loading="lazy" decoding="async" /></div>
        <div class="team-meta">
          <p class="team-role">{{ member.role }}</p>
          <h3>{{ member.name }}</h3>
          <p>{{ member.description }}</p>
          <button type="button" class="text-link is-placeholder-action">{{ brand.primaryCta }}</button>
          <!-- TODO: conectar à jornada comercial quando a rota estiver disponível. -->
        </div>
      </article>
    </div>
    <div class="carousel-controls">
      <span>Conheça as áreas de experiência</span>
      <button type="button" aria-label="Perfil anterior" aria-controls="team-track" :disabled="!canScrollBack" @click="scrollCarousel(-1)">←</button>
      <button type="button" aria-label="Próximo perfil" aria-controls="team-track" :disabled="!canScrollForward" @click="scrollCarousel(1)">→</button>
    </div>
  </div>
</template>

<style scoped>
.carousel-track { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
.team-card { min-width: 0; scroll-snap-align: start; }
.avatar-wrap { background: var(--sp-sand-200); overflow: hidden; }
.avatar-wrap img { width: 100%; height: 355px; object-fit: contain; object-position: center bottom; padding: 20px 20px 0; }
.team-meta { padding-top: 24px; }
.team-meta h3 { font-size: 1.9rem; }
.team-meta p:not(.team-role) { color: var(--color-text-muted); font-size: .83rem; }
.team-role { margin: 0 0 12px; color: var(--color-accent-on-light); font-size: .6rem; letter-spacing: .13em; text-transform: uppercase; line-height: 1.7; }
.team-meta .text-link { font-size: .72rem; }
.carousel-controls { display: none; }
@media (max-width: 1023px) {
  .carousel-track { grid-template-columns: none; grid-auto-flow: column; grid-auto-columns: calc((100% - 24px) / 2); gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; }
  .carousel-controls { display: flex; align-items: center; gap: 10px; margin-top: 20px; }
  .carousel-controls > span { margin-right: auto; color: var(--color-text-muted); font-size: .67rem; }
  .carousel-controls button { width: 46px; height: 46px; flex-shrink: 0; background: transparent; border: 1px solid var(--color-border); color: var(--color-text-dark); }
  .carousel-controls button:disabled { opacity: .35; cursor: default; }
  .avatar-wrap img { height: 300px; }
}
@media (max-width: 600px) {
  .carousel-track { grid-auto-columns: 88%; gap: 20px; }
  .avatar-wrap img { height: 320px; }
}
</style>
