export type TUser = {
  id: string
  name: string
  email: string
  password: string
}

export type TConcert = {
  id: string
  name: string
}

export type TBooking = {
  id: string
  userId: string
  concertId: string
}

type TDatabase = {
  users: TUser[]
  concerts: TConcert[]
  bookings: TBooking[]
}

/**
 * ! Fake database
 * ! cleared everytime the server is stopped
 */
const database: TDatabase = {
  users: [],
  concerts: [{ id: '0', name: 'Mega' }],
  bookings: []
}

export default database
