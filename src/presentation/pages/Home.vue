<script setup lang="ts">
import SiteHeader from '@/components/home/SiteHeader.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import SolutionsSection from '@/components/home/SolutionsSection.vue'
import AutomationSection from '@/components/home/AutomationSection.vue'
import AuditSection from '@/components/home/AuditSection.vue'
import TeamSection from '@/components/home/TeamSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import SiteFooter from '@/components/home/SiteFooter.vue'
import { teamMembers } from '@/data/team'

defineOptions({ name: 'HomePage' })
</script>

<template>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <HeroSection />
    <SolutionsSection />
    <AutomationSection />
    <AuditSection />
    <TeamSection :members="teamMembers" />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
