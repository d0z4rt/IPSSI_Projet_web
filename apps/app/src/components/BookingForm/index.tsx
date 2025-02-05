import { A } from '@solidjs/router'
import { type Component, Show } from 'solid-js'
import { useAuthState } from '../../contexts/auth.context'
import { concerts } from '../../data/concert'
import Card from '../Card'
import styles from './style.module.css'

const BookingForm: Component<{ concertId: string }> = (props) => {
  const authStore = useAuthState()
  const concert = () => concerts.find((c) => c.id === props.concertId)

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
          <span>{authStore.user?.email}</span>
          <span>{authStore.user?.name}</span>
          <button type="button">reserver</button>
        </Show>
      </div>
    </div>
  )
}

export default BookingForm
