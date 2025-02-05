import { useParams } from '@solidjs/router'
import BookingForm from '../../components/BookingForm'
import styles from './id.module.css'

type Params = {
  id: string
}

const Booking = () => {
  const params = useParams<Params>()

  return (
    <div class={styles.popup}>
      <BookingForm concertId={params.id} />
    </div>
  )
}

export default Booking
