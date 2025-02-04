import { A } from '@solidjs/router'
import { type ParentComponent, Show } from 'solid-js'
import styles from './style.module.css'

const Card: ParentComponent<{
  title?: string
  href?: string
  cover?: string
  alt?: string
  horizontal?: boolean
}> = (props) => {
  return (
    <A
      href={props.href || ''}
      classList={{ [styles.card]: true, [styles.horizontal]: props.horizontal }}
    >
      <Show when={props.cover}>
        <img src={props.cover} alt={props.alt} loading="lazy" />
      </Show>
      <div class={styles.card_content}>
        <Show when={props.title}>
          <h3>{props.title}</h3>
        </Show>

        <p>{props.children}</p>
      </div>
    </A>
  )
}

export default Card
