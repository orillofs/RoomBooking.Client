import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import router from '../router'

describe('App', () => {
  it('mounts and renders the navigation', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.get('nav').text()).toContain('Book a room')
  })
})
