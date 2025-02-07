import database from '../database'
import { isEmpty } from '../utils/typeChecking.util'
import { wait } from '../utils/wait.util'
import ConcertService from './concert.service'
import UserService from './user.service'

type TCreateDto = {
  userId: string
  concertId: string
}

/**
 * Provides methods for manipulating the bookings database
 * @returns
 */
const BookingService = () => {
  const userService = UserService()
  const concertService = ConcertService()

  return {
    /**
     * Create a booking
     * @param dto
     * @returns created booking
     */
    create: async (dto: TCreateDto) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      // check if user and concert exists
      await userService.findOneById(dto.userId)
      await concertService.findOneById(dto.concertId)

      // check if there already is a booking
      const bookingIndex = database.bookings.findIndex(
        (b) => b.concertId === dto.concertId && b.userId === dto.userId
      )

      if (bookingIndex !== -1) {
        throw new Error('A booking for this concert already exist for the user')
      }

      // create the booking
      const booking = { id: database.bookings.length.toString(), ...dto }
      database.bookings.push(booking)
      return booking
    },

    /**
     * Find all the bookings for an user and populate its concert data
     * @param userId
     * @returns the user bookings with linked concerts
     */
    findAllByUserId: async (userId: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      // Check if the user has any bookings
      const bookings = database.bookings.filter((b) => b.userId === userId)
      if (isEmpty(bookings)) {
        throw new Error('No bookings found for this user')
      }

      // Populate concert data for each booking found
      const bookingsWithConcerts = bookings?.map((b) => ({
        ...b,
        concert: database.concerts.find((c) => c.id === b.concertId)
      }))

      return bookingsWithConcerts
    },

    /**
     * Removes a booking by id
     * @param bookingId
     * @returns the deleted booking
     */
    delete: async (bookingId: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      // Check if the booking exists
      const bookingIndex = database.bookings.findIndex(
        (b) => b.id === bookingId
      )
      if (bookingIndex === -1) {
        throw new Error('Booking not found')
      }

      const deleted = database.bookings.splice(bookingIndex, 1)
      return deleted[0]
    }
  }
}

export default BookingService
