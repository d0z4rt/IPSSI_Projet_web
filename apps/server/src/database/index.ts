/**
 * FAKE DB
 * Since this is a school project no real database was implemented,
 * if by any chance you want to implement a real db connection all the methods used to interact with
 * this data are already async
 */

/**
 * User data format
 */
export type TUser = {
  id: string
  name: string
  email: string
  password: string
}

/**
 * Concert data format
 */
export type TConcert = {
  id: string
  name: string
}

/**
 * Booking data format
 */
export type TBooking = {
  id: string
  userId: string
  concertId: string
}

/**
 * Database data format
 */
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
  concerts: [
    { id: '0', name: 'Mega' },
    { id: '1', name: 'Mega' }
  ],
  bookings: []
}

export default database
