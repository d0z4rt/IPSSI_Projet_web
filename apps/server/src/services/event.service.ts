import database from '../database'
import { isEmpty, isNil } from '../utils/typeChecking.util'
import { wait } from '../utils/wait.util'

/**
 * Provides methods for manipulating the events database
 * @returns
 */
const EventService = () => {
  return {
    /**
     * Find all events
     * @returns all events
     */
    findAll: async () => {
      //! FIXME fake delay DEV ONLY
      await wait()

      const events = database.events
      // Check if there is any results
      if (isEmpty(events)) {
        throw new Error('No events found')
      }
      return database.events
    },

    /**
     * Find one event by id
     * @param id
     * @returns a event if found
     */
    findOneById: async (id: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      const event = database.events.find((c) => c.id === id)
      // check if the event was found
      if (isNil(event)) {
        throw new Error('Event not found')
      }
      return event
    }
  }
}

export default EventService
