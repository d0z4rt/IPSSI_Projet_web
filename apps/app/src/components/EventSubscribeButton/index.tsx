import { type Component, Show, createSignal } from 'solid-js'
import { useAuthState } from '../../contexts/auth.context'
import Button from '../Button'
import styles from './style.module.css'

/**
 * Creates a new event subscription
 * @param eventSubscriptionFields
 * @returns
 */
const handleEventSubscription = async (eventSubscriptionFields: {
  userId: string
  eventId: string
}) => {
  const res = await fetch('http://localhost:4000/events-subscriptions', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventSubscriptionFields)
  })
  const resBody = await res.json()
  if (!res.ok) {
    throw resBody
  }
  return resBody
}

const EventSubscribeButton: Component<{ eventId?: string }> = (props) => {
  const authStore = useAuthState()

  // request handling
  const [error, setError] = createSignal('')
  const [success, setSuccess] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)

  /**
   * Handle eventSubscription create request
   */
  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')
    try {
      if (!authStore.user) {
        throw new Error('Vous devez vous authentifier')
      }
      if (!props.eventId) {
        throw new Error('Event inexistant')
      }
      const user = await handleEventSubscription({
        userId: authStore.user.id,
        eventId: props.eventId
      })
      setSuccess(true)
    } catch (error) {
      // ! We know the format of the error since it comes from our api
      setError((error as { message: string }).message)
    }
    setIsLoading(false)
  }

  return (
    <Show
      when={!isLoading()}
      fallback={
        <div class={styles.loading}>
          <h3>LOADING</h3>
        </div>
      }
    >
      <Show
        when={!success()}
        fallback={
          <div class={styles.success}>
            <h3>SUCCESS</h3>
          </div>
        }
      >
        <Button
          type="button"
          class={styles['btn-reserve']}
          onClick={handleSubmit}
        >
          S'inscrire
        </Button>

        <Show when={error()}>
          <div class={styles.error}>
            <h3>ERROR</h3>
            <p>{error()}</p>
          </div>
        </Show>
      </Show>
    </Show>
  )
}

export default EventSubscribeButton
