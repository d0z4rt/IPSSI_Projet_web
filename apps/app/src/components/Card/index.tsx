import { A } from '@solidjs/router'
import { type ParentComponent, Show } from 'solid-js'
import styles from './style.module.css'

const Card: ParentComponent<{
  title?: string
  href?: string
  cover?: string
  alt?: string
  type?: string
  horizontal?: boolean
  class?: string
}> = (props) => {
  return (
    <A
      href={props.href || ''}
      class={`${styles.card} ${props.horizontal ? styles.horizontal : ''} ${props.class ? props.class : ''} ${styles[props.type?.toLowerCase().replace(/\s+/g, '-') || '']}`}
    >
      <Show when={props.type}>
        <span class={`${styles.card_type} ${styles[props.type?.toLowerCase().replace(/\s+/g, '-') || '']}`}>
          {props.type}
        </span>
      </Show>
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
