// Types mirroring the RoomBooking.Api contract (Models/Entities + Models/DTOs).
// The API only accepts these fields; ownership (UserId) is assigned server-side.

export interface Room {
  id: number
  name: string
}

export interface BookingPayload {
  roomId: number
  startDate: string
  endDate: string
}
