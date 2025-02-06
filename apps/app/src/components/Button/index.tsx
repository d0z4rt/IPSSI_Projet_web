import type { JSX, ParentComponent } from 'solid-js'
import styles from './style.module.css'

const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      class={`${styles.button} ${props.class ? props.class : ''}`}
      type={props.type}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  )
}

export default Button
