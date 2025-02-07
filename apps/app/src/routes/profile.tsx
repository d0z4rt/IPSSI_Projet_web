import { useNavigate } from '@solidjs/router'
import { For, Show, createResource, createSignal } from 'solid-js'
import Button from '../components/Button'
import Card from '../components/Card'
import { useAuthActions, useAuthState } from '../contexts/auth.context'
import type { TConcert } from '../entities/concert.entity'
import styles from './profile.module.css'

const handleDeleteBooking = async (bookingId: string) => {
  const res = await fetch(`http://localhost:4000/bookings/${bookingId}`, {
    method: 'DELETE'
  })
  const resBody = await res.json()
  if (!res.ok) {
    throw resBody
  }
  return resBody
}

const Profile = () => {
  const { disconnect } = useAuthActions()
  const authStore = useAuthState()
  const navigate = useNavigate()
  const [error, setError] = createSignal('')
  const [success, setSuccess] = createSignal(false)
  const [isLoading, setIsLoading] = createSignal(false)
  const [bookings, { refetch }] = createResource(async () => {
    const response = await fetch(
      `http://localhost:4000/bookings/${authStore.user?.id}`
    )
    return (await response.json()) as {
      id: string
      userId: string
      concert: TConcert
    }[]
  })

  const handleDisconnect = () => {
    disconnect()
    navigate('/')
  }

  const handleDeleteClick = async (bookingId: string) => {
    setIsLoading(true)
    setError('')
    try {
      if (!authStore.user) {
        throw new Error('Vous devez vous authentifier')
      }
      const user = await handleDeleteBooking(bookingId)
      setSuccess(true)
      refetch()
    } catch (error) {
      // ! Yeah ugly stuff...
      setError((error as { message: string }).message)
    }
    setIsLoading(false)
  }

  return (
    <main class={styles.main}>
      <Show when={authStore.user} fallback={'You need to login'}>
        <div class={styles.user}>
          <img
            width={512}
            height={512}
            alt="profile"
            src="/images/profile.png"
          />
          <div class={styles.user_infos}>
            <h1>{authStore.user?.name}</h1>
            <span class={styles.label}>Email</span>
            <span>{authStore.user?.email}</span>
            <span class={styles.label}>Phone</span>
            <span>{authStore.user?.phone}</span>
            <span class={styles.label}>Street</span>
            <span>{authStore.user?.street}</span>
            <span class={styles.label}>City</span>{' '}
            <span>{authStore.user?.city}</span>
            <span class={styles.label}>Postal Code</span>
            <span>{authStore.user?.['postal-code']}</span>
          </div>
          <Button type="button" onClick={handleDisconnect}>
            Deconnexion
          </Button>
        </div>

        <h2 class={styles.booking_list_title}>Reservations</h2>
        <div class={styles.booking_list}>
          <Show
            // biome-ignore lint/style/noNonNullAssertion: We already checked if it was null
            when={bookings() && bookings()!.length > 0}
            fallback="Tu n'as pas encore de reservations"
          >
            <For each={bookings()}>
              {(booking) => (
                <Show when={booking}>
                  <Card
                    horizontal
                    title={booking.concert.name}
                    cover={`/${booking.concert.img}`}
                    alt={booking.concert.name}
                  >
                    <p>{booking.concert.info}</p>
                    <p>
                      <strong>{booking.concert.date}</strong>
                    </p>
                    <Button onClick={() => handleDeleteClick(booking.id)}>
                      Annuler
                    </Button>
                  </Card>
                </Show>
              )}
            </For>
          </Show>
        </div>
      </Show>
    </main>
  )
}

export default Profile
