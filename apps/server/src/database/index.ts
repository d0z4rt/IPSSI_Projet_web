/**
 * FAKE DB
 * Since this is a school project no real database was implemented,
 * if by any chance you want to implement a real db connection all the methods used to interact with
 * this data are already async
 */

/**
 * Import MOCK data
 */
import { concerts } from './MOCK/concerts'

/**
 * User data format
 */
export type TUser = {
  id: string
  name: string
  email: string
  phone: string
  street: string
  'postal-code': number
  city: string
  password: string
}

/**
 * Concert data format
 */
export type TConcert = {
  id: string
  name: string
  info: string
  img: string
  tag: string[]
  date: string
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
  concerts: concerts,
  bookings: []
}

export default database
