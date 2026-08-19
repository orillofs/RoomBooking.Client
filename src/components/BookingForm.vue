<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BookingPayload, Room } from '../api/types'

const props = defineProps<{ room: Room }>()

const emit = defineEmits<{
  book: [payload: BookingPayload]
}>()

const startDate = ref('')
const endDate = ref('')

// A range is valid only when both dates are chosen and the stay is at least
// one night (check-out strictly after check-in).
const isValidRange = computed(() => {
  if (!startDate.value || !endDate.value) return false
  return endDate.value > startDate.value
})

function submit(): void {
  if (!isValidRange.value) return
  emit('book', {
    roomId: props.room.id,
    startDate: startDate.value,
    endDate: endDate.value,
  })
}
</script>

<template>
  <form class="booking-form" @submit.prevent="submit">
    <h2 class="room-name">{{ room.name }}</h2>
    <label>
      Check-in
      <input v-model="startDate" type="date" data-test="start-date" />
    </label>
    <label>
      Check-out
      <input v-model="endDate" type="date" data-test="end-date" />
    </label>
    <p v-if="startDate && endDate && !isValidRange" class="validation-msg" data-test="date-error">
      Check-out must be after check-in.
    </p>
    <button type="submit" data-test="book" :disabled="!isValidRange">Book this room</button>
  </form>
</template>

<style scoped>
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 18rem;
}
.room-name {
  margin: 0;
}
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.validation-msg {
  color: #c62828;
  margin: 0;
}
</style>
