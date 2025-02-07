import database from '../database'
import { isEmpty, isNil } from '../utils/typeChecking.util'
import { wait } from '../utils/wait.util'

/**
 * Provides methods for manipulating the concerts database
 * @returns
 */
const ConcertService = () => {
  return {
    /**
     * Find all concerts
     * @returns all concerts
     */
    findAll: async () => {
      //! FIXME fake delay DEV ONLY
      await wait()

      const concerts = database.concerts
      // Check if there is any results
      if (isEmpty(concerts)) {
        throw new Error('No concerts found')
      }
      return database.concerts
    },

    /**
     * Find one concert by id
     * @param id
     * @returns a concert if found
     */
    findOneById: async (id: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      const concert = database.concerts.find((c) => c.id === id)
      // check if the concert was found
      if (isNil(concert)) {
        throw new Error('Concert not found')
      }
      return concert
    }
  }
}

export default ConcertService
