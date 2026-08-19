import type { BookingPayload } from './types'

// Base URL for the RoomBooking.Api. Override with VITE_API_BASE_URL in
// .env.local; defaults to the local dev API (HTTP profile).
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5245'

// Thin typed client over fetch. Async loading/error states are handled in the
// view layer (Day 9); these return the raw JSON.
export function getBookings(): Promise<unknown> {
  return fetch(`${API_BASE}/api/booking`).then((res) => res.json())
}

export function getBooking(id: number): Promise<unknown> {
  return fetch(`${API_BASE}/api/booking/${id}`).then((res) => res.json())
}

export function createBooking(payload: BookingPayload): Promise<unknown> {
  return fetch(`${API_BASE}/api/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then((res) => res.json())
}
