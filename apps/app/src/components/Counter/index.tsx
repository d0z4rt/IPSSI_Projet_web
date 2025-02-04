import { createSignal } from 'solid-js'
import styles from './style.module.css'

export default function Counter() {
  const [count, setCount] = createSignal(0)
  return (
    <button
      class={styles.increment}
      onClick={() => setCount(count() + 1)}
      type="button"
    >
      Clicks: {count()}
    </button>
  )
}
