import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookingForm from '../components/BookingForm.vue'
import type { Room } from '../api/types'

const room: Room = { id: 2, name: 'Deluxe Room' }

describe('BookingForm', () => {
  it('mounts and shows the room\'s data', () => {
    const wrapper = mount(BookingForm, { props: { room } })

    // The room's name is the room data surfaced on the form.
    expect(wrapper.get('.room-name').text()).toContain('Deluxe Room')
    expect(wrapper.find('[data-test="start-date"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="end-date"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="book"]').exists()).toBe(true)
  })
})
