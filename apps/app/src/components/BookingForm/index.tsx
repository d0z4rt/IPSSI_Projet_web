import { A } from '@solidjs/router'
import { type Component, Show, createSignal } from 'solid-js'
import { useAuthState } from '../../contexts/auth.context'
import { concerts } from '../../data/concert'
import Button from '../Button'
import Card from '../Card'
import styles from './style.module.css'

const handleBooking = async (bookingFields: {
  userId: string
  concertId: string
}) => {
  const res = await fetch('http://127.0.0.1:4000/bookings', {
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

const BookingForm: Component<{ concertId: string }> = (props) => {
  const authStore = useAuthState()
  const concert = () => concerts.find((c) => c.id === props.concertId)
  const [error, setError] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError('')
    try {
      if (!authStore.user) {
        throw new Error('Vous devez vous authentifier')
      }
      const user = await handleBooking({
        userId: authStore.user.id,
        concertId: props.concertId
      })
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
        <A href="/concerts">x</A>
      </div>
      <div class={styles.concert_infos}>
        <Card
          title={concert()?.name}
          cover={`/${concert()?.img}`}
          alt={concert()?.name}
          horizontal
        >
          {concert()?.date}
        </Card>
      </div>
      <div class={styles.user_infos}>
        <Show
          when={authStore.user}
          fallback={'Connectez vous pour reservez ce concert'}
        >
          <span>{authStore.user?.name}</span>
          <span>{authStore.user?.email}</span>
          <Button type="button" onClick={handleSubmit}>
            reserver
          </Button>
          <Show when={error()}>
            <div class={styles.error}>
              {/* biome-ignore lint/suspicious/noCommentText: Not a comment */}
              <h3>// ERROR //</h3>
              <p>{error()}</p>
            </div>
          </Show>
        </Show>
      </div>
    </div>
  )
}

export default BookingForm
