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
import { events } from './MOCK/events'

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
 * Event data format
 */
export type TEvent = {
  id: string
  name: string
  info: string
  img: string
  date: string
}

/**
 * Event Subscription data format
 */
export type TEventSubscription = {
  id: string
  userId: string
  eventId: string
}

/**
 * Database data format
 */
type TDatabase = {
  users: TUser[]
  concerts: TConcert[]
  bookings: TBooking[]
  events: TEvent[]
  eventsSubscriptions: TEventSubscription[]
}

/**
 * ! Fake database
 * ! cleared everytime the server is stopped
 */
const database: TDatabase = {
  users: [
    {
      id: '0',
      name: 'Admin',
      email: 'admin@lecarredas.com',
      password: 'adminCRODE_PWOA',
      phone: '00 00 00 00 00',
      street: '123 Rue des Stratèges',
      'postal-code': 75000,
      city: 'Paris'
    }
  ],
  concerts: concerts,
  bookings: [],
  events: events,
  eventsSubscriptions: []
}

export default database
