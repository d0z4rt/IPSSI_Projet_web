import database from '../database'
import { isEmpty, isNil } from '../utils/typeChecking.util'

const ConcertService = () => {
  return {
    findAll: async () => {
      const concerts = database.concerts
      if (isEmpty(concerts)) {
        throw new Error('No concerts found')
      }
      return database.concerts
    },
    findOneById: async (id: string) => {
      const concert = database.concerts.find((c) => c.id === id)
      if (isNil(concert)) {
        throw new Error('Concert not found')
      }
      return concert
    }
  }
}

export default ConcertService
