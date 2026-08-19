<script setup lang="ts">
import { ref } from 'vue'
import BookingForm from '../components/BookingForm.vue'
import { createBooking } from '../api/booking'
import type { BookingPayload, Room } from '../api/types'

// Sample room until the slot-list component fetches the real list (Day 9).
const room: Room = { id: 1, name: 'Standard Room' }

const bookingId = ref<number | null>(null)

async function handleBook(payload: BookingPayload): Promise<void> {
  const created = (await createBooking(payload)) as { id: number }
  bookingId.value = created.id
}
</script>

<template>
  <main class="page">
    <BookingForm :room="room" @book="handleBook" />
    <p v-if="bookingId" data-test="confirmation">
      Booking created with id {{ bookingId }}
    </p>
  </main>
</template>
