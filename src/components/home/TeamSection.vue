<script setup lang="ts">
import type { TeamMember } from '@/data/team'
import { brand } from '@/config/brand'
import PartnersCarousel from './PartnersCarousel.vue'

defineProps<{ members: TeamMember[] }>()
</script>

<template>
  <section id="equipe" class="team section-space" aria-labelledby="team-title">
    <div class="container">
      <div class="section-intro">
        <div><p class="eyebrow">{{ brand.teamEyebrow }}</p><h2 id="team-title">{{ brand.teamTitle }}</h2></div>
        <p>{{ brand.teamDescription }}</p>
      </div>
      <PartnersCarousel :members="members" />
    </div>
  </section>
</template>
