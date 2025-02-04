import database from '../database'
import { isEmpty } from '../utils/typeChecking.util'
import { wait } from '../utils/wait.util'
import ConcertService from './concert.service'
import UserService from './user.service'

type TCreateDto = {
  userId: string
  concertId: string
}

const BookingService = () => {
  const userService = UserService()
  const concertService = ConcertService()

  return {
    create: async (dto: TCreateDto) => {
      //! fake delay
      await wait()

      // check if user and concert exists
      await userService.findOneById(dto.userId)
      await concertService.findOneById(dto.concertId)

      // check if there already is a booking
      const concertIndex = database.bookings.findIndex(
        (b) => b.concertId === dto.concertId
      )
      const userIndex = database.bookings.findIndex(
        (b) => b.concertId === dto.concertId
      )

      if (concertIndex !== -1 && userIndex !== -1) {
        throw new Error('A booking for this concert already exist for the user')
      }

      // create the booking
      const booking = { id: database.bookings.length.toString(), ...dto }
      database.bookings.push(booking)
      return booking
    },
    findAllByUserId: async (userId: string) => {
      const bookings = database.bookings.filter((b) => b.userId === userId)
      if (isEmpty(bookings)) {
        throw new Error('No bookings found for this user')
      }
      return bookings
    }
  }
}

export default BookingService
