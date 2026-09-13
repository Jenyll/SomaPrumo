import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Home from '../src/presentation/pages/Home.vue'

describe('Home', () => {
  it('renders title', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toContain('SomaPrumo')
  })

  it('keeps the public positioning focused and does not fabricate results', () => {
    const wrapper = mount(Home)
    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.find('#solucoes').text()).toContain('Investimentos')
    expect(wrapper.find('#automacao').text()).toContain('Revisão humana')
    expect(wrapper.find('#auditoria').text()).toContain('profissional auditor fiscal')
    expect(wrapper.text()).not.toMatch(/engenharia|construção|\bobras?\b|38%|96%|90%|12h|4x/i)
  })

  it('gives every internal link an existing destination', () => {
    const wrapper = mount(Home)
    for (const link of wrapper.findAll('a[href^="#"]')) {
      expect(wrapper.find(link.attributes('href')!).exists()).toBe(true)
    }
  })

  it('opens and closes the mobile navigation', async () => {
    const wrapper = mount(Home)
    const toggle = wrapper.find('button[aria-controls="main-navigation"]')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('true')
    await wrapper.find('#main-navigation a').trigger('click')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    await toggle.trigger('click')
    await toggle.trigger('keydown', { key: 'Escape' })
    expect(toggle.attributes('aria-expanded')).toBe('false')
  })

  it('displays the requested contact placeholder without a fabricated endpoint', () => {
    const wrapper = mount(Home)
    const contact = wrapper.find('#contato')
    expect(contact.text()).toContain('loreimpus')
    expect(contact.text()).toContain('Canal de contato em breve')
    expect(contact.find('a').exists()).toBe(false)
    expect(contact.find('form').exists()).toBe(false)
  })
})
