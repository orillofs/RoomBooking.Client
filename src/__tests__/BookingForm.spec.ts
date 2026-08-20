import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookingForm from '../components/BookingForm.vue'
import type { BookingPayload, Room } from '../api/types'

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

  // Behavior tests assert what the user sees: drive the visible date inputs
  // and button, never the component's internal isValidRange state.

  it('disables the submit button until the date range is valid', async () => {
    const wrapper = mount(BookingForm, { props: { room } })
    const book = () => wrapper.get('[data-test="book"]').element as HTMLButtonElement

    // No dates chosen yet — disabled.
    expect(book().disabled).toBe(true)

    // Check-out before check-in — still invalid, so still disabled.
    await wrapper.get('[data-test="start-date"]').setValue('2026-08-21')
    await wrapper.get('[data-test="end-date"]').setValue('2026-08-20')
    expect(book().disabled).toBe(true)

    // A valid stay (check-out after check-in) enables the button.
    await wrapper.get('[data-test="end-date"]').setValue('2026-08-22')
    expect(book().disabled).toBe(false)
  })

  it('emits book with the room id and chosen dates when submitted', async () => {
    const wrapper = mount(BookingForm, { props: { room } })

    await wrapper.get('[data-test="start-date"]').setValue('2026-08-20')
    await wrapper.get('[data-test="end-date"]').setValue('2026-08-21')
    await wrapper.get('form').trigger('submit')

    const emitted = wrapper.emitted('book')
    expect(emitted).toBeDefined()
    expect(emitted).toHaveLength(1)

    // Each emission is an array of its arguments, so [0][0] is the payload.
    const payload = (emitted as BookingPayload[][] | undefined)![0]![0]
    expect(payload).toEqual({
      roomId: 2,
      startDate: '2026-08-20',
      endDate: '2026-08-21',
    })
  })

  it('does not emit book when the range is invalid', async () => {
    const wrapper = mount(BookingForm, { props: { room } })

    await wrapper.get('[data-test="start-date"]').setValue('2026-08-21')
    await wrapper.get('[data-test="end-date"]').setValue('2026-08-20')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.emitted('book')).toBeUndefined()
  })

  it('shows a validation message on an invalid range and hides it once valid', async () => {
    const wrapper = mount(BookingForm, { props: { room } })

    // No message while the inputs are still empty.
    expect(wrapper.find('[data-test="date-error"]').exists()).toBe(false)

    // An invalid range surfaces the message.
    await wrapper.get('[data-test="start-date"]').setValue('2026-08-21')
    await wrapper.get('[data-test="end-date"]').setValue('2026-08-20')
    expect(wrapper.find('[data-test="date-error"]').exists()).toBe(true)
    expect(wrapper.get('[data-test="date-error"]').text()).toContain(
      'Check-out must be after check-in.',
    )

    // A valid range clears it.
    await wrapper.get('[data-test="end-date"]').setValue('2026-08-22')
    expect(wrapper.find('[data-test="date-error"]').exists()).toBe(false)
  })
})
