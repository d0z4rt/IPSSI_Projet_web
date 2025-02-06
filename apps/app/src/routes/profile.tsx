import { useNavigate } from '@solidjs/router'
import { For, Show, createResource } from 'solid-js'
import Button from '../components/Button'
import Card from '../components/Card'
import { useAuthActions, useAuthState } from '../contexts/auth.context'
import { concerts } from '../data/concert'
import styles from './profile.module.css'

const Profile = () => {
  const { disconnect } = useAuthActions()
  const authStore = useAuthState()
  const navigate = useNavigate()
  const [bookings] = createResource(async () => {
    const response = await fetch(
      `http://127.0.0.1:4000/bookings/${authStore.user?.id}`
    )
    return (await response.json()) as { userId: string; concertId: string }[]
  })

  const handleDisconnect = () => {
    disconnect()
    navigate('/')
  }

  const userConcerts = () => {
    // biome-ignore lint/style/noNonNullAssertion: We already checked if it was null
    if (bookings() && bookings()!.length > 0) {
      return bookings()?.map((b) => concerts.find((c) => c.id === b.concertId))
    }
  }

  return (
    <main class={styles.main}>
      <Show when={authStore.user}>
        <div class={styles.user}>
          <img
            width={512}
            height={512}
            alt="profile"
            src="/images/profile.png"
          />{' '}
          <h1>{authStore.user?.name}</h1>
          <Button type="button" onClick={handleDisconnect}>
            Deconnexion
          </Button>
        </div>

        <h2 class={styles.booking_list_title}>Reservations</h2>
        <div class={styles.booking_list}>
          <Show
            // biome-ignore lint/style/noNonNullAssertion: We already checked if it was null
            when={userConcerts() && userConcerts()!.length > 0}
            fallback="Tu n'as pas encore de reservations"
          >
            <For each={userConcerts()}>
              {(concert) => (
                <Show when={concert}>
                  <Card
                    horizontal
                    title={concert?.name}
                    cover={`/${concert?.img}`}
                    alt={concert?.name}
                  >
                    <p>{concert?.info}</p>
                    <p>
                      <strong>{concert?.date}</strong>
                    </p>
                    <Button>Annuler</Button>
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
