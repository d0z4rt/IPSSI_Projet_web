import database from '../database'
import { isEmpty } from '../utils/typeChecking.util'
import { wait } from '../utils/wait.util'
import EventService from './event.service'
import UserService from './user.service'

type TCreateDto = {
  userId: string
  eventId: string
}

/**
 * Provides methods for manipulating the event subscriptions database
 * @returns
 */
const EventsSubscriptionService = () => {
  const userService = UserService()
  const eventService = EventService()

  return {
    /**
     * Create an Event subscription
     * @param dto
     * @returns created Event subscription
     */
    create: async (dto: TCreateDto) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      // check if user and event exists
      await userService.findOneById(dto.userId)
      await eventService.findOneById(dto.eventId)

      // check if there already is a eventsSubscription
      const eventsSubscriptionIndex = database.eventsSubscriptions.findIndex(
        (b) => b.eventId === dto.eventId && b.userId === dto.userId
      )

      if (eventsSubscriptionIndex !== -1) {
        throw new Error(
          'A subscription for this event already exist for the user'
        )
      }

      // create the eventsSubscription
      const eventsSubscription = {
        id: database.eventsSubscriptions.length.toString(),
        ...dto
      }
      database.eventsSubscriptions.push(eventsSubscription)
      return eventsSubscription
    },

    /**
     * Find all the eventsSubscriptions for an user and populate its event data
     * @param userId
     * @returns the user eventsSubscriptions with linked events
     */
    findAllByUserId: async (userId: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      // Check if the user has any eventsSubscriptions
      const eventsSubscriptions = database.eventsSubscriptions.filter(
        (b) => b.userId === userId
      )
      if (isEmpty(eventsSubscriptions)) {
        throw new Error('No events subscriptions found for this user')
      }

      // Populate event data for each eventsSubscription found
      const eventsSubscriptionsWithEvents = eventsSubscriptions?.map((b) => ({
        ...b,
        event: database.events.find((c) => c.id === b.eventId)
      }))

      return eventsSubscriptionsWithEvents
    },

    /**
     * Removes a eventsSubscription by id
     * @param eventsSubscriptionId
     * @returns the deleted eventsSubscription
     */
    delete: async (eventsSubscriptionId: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      // Check if the eventsSubscription exists
      const eventsSubscriptionIndex = database.eventsSubscriptions.findIndex(
        (b) => b.id === eventsSubscriptionId
      )
      if (eventsSubscriptionIndex === -1) {
        throw new Error('EventsSubscription not found')
      }

      const deleted = database.eventsSubscriptions.splice(
        eventsSubscriptionIndex,
        1
      )
      return deleted[0]
    }
  }
}

export default EventsSubscriptionService
