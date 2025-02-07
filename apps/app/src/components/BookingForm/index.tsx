import { A } from '@solidjs/router'
import { type Component, Show, createSignal } from 'solid-js'
import { useAuthState } from '../../contexts/auth.context'
import type { TConcert } from '../../entities/concert.entity'
import Button from '../Button'
import Card from '../Card'
import styles from './style.module.css'

const handleBooking = async (bookingFields: {
  userId: string
  concertId: string
}) => {
  const res = await fetch('http://localhost:4000/bookings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingFields)
  })
  const resBody = await res.json()
  if (!res.ok) {
    throw resBody
  }
  return resBody
}

const BookingForm: Component<{ concert?: TConcert }> = (props) => {
  const authStore = useAuthState()
  const [error, setError] = createSignal('')
  const [success, setSuccess] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')
    try {
      if (!authStore.user) {
        throw new Error('Vous devez vous authentifier')
      }
      if (!props.concert) {
        throw new Error('Concert inexistant')
      }
      const user = await handleBooking({
        userId: authStore.user.id,
        concertId: props.concert.id
      })
      setSuccess(true)
    } catch (error) {
      // ! Yeah ugly stuff...
      setError((error as { message: string }).message)
    }
    setIsLoading(false)
  }

  return (
    <div class={styles.wrapper}>
      <div class={styles.header}>
        <h2>Reserver</h2>
        <A href="/concerts">✕</A>
      </div>
      <div class={styles.concert_infos}>
        <Show when={props.concert} fallback="Concert inexistant">
          <Card
            title={props.concert?.name}
            cover={`/${props.concert?.img}`}
            alt={props.concert?.name}
            horizontal
          >
            {props.concert?.date}
          </Card>
        </Show>
      </div>
      <div class={styles.user_infos}>
        <h3>Reservation au nom de :</h3>
        <Show
          when={authStore.user}
          fallback={'Connectez vous pour reservez ce concert'}
        >
          <h4>{authStore.user?.name}</h4>
          <Show
            when={!isLoading()}
            fallback={
              <div class={styles.loading}>
                {/* biome-ignore lint/suspicious/noCommentText: Not a comment */}
                <h3>// LOADING //</h3>
              </div>
            }
          >
            <Show
              when={!success()}
              fallback={
                <div class={styles.success}>
                  {/* biome-ignore lint/suspicious/noCommentText: Not a comment */}
                  <h3>// SUCCESS //</h3>
                  <p>Reservation confirmée</p>
                </div>
              }
            >
              <Button type="button" onClick={handleSubmit}>
                Confirmer
              </Button>
              <Show when={error()}>
                <div class={styles.error}>
                  {/* biome-ignore lint/suspicious/noCommentText: Not a comment */}
                  <h3>// ERROR //</h3>
                  <p>{error()}</p>
                </div>
              </Show>
            </Show>
          </Show>
        </Show>
      </div>
    </div>
  )
}

export default BookingForm
