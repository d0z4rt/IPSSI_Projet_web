import { useParams } from '@solidjs/router'
import { Suspense, createResource } from 'solid-js'
import BookingForm from '../../components/BookingForm'
import type { TConcert } from '../../entities/concert.entity'
import styles from './id.module.css'

type Params = {
  id: string
}

const Booking = () => {
  const params = useParams<Params>()
  const [concert] = createResource(async () => {
    const response = await fetch(`http://127.0.0.1:4000/concerts/${params.id}`)
    return (await response.json()) as TConcert
  })

  return (
    <div class={styles.popup}>
      <Suspense fallback={<div>Loading...</div>}>
        {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
        <BookingForm concert={concert()!} />
      </Suspense>
    </div>
  )
}

export default Booking
