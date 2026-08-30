import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Home from '../src/presentation/pages/Home.vue'

describe('Home', () => {
  it('renders title', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toContain('SomaPrumo (Scaffold)')
  })
})
