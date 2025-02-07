import type { JSX, ParentComponent } from 'solid-js'
import styles from './style.module.css'

/**
 * Button component based of HTMLButtonElement
 * @param props
 * @returns
 */
const Button: ParentComponent<{
  class?: string
  type?: JSX.ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: JSX.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  style?: JSX.ButtonHTMLAttributes<HTMLButtonElement>['style']
}> = (props) => {
  return (
    <button
      class={`${styles.button} ${props.class ? props.class : ''}`}
      // Forcing good practice
      type={props.type || 'button'}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  )
}

export default Button
