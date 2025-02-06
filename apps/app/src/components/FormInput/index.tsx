import type { Component, JSX } from 'solid-js'
import styles from './style.module.css'

/**
 * Input destiné a s'integrer dans des formulaire
 *
 * @param {Object} props
 * @param {string} props.name Nom utilisé pour `label`, `for`, `name`
 * @param {string} props.id
 * @returns
 */
const FormInput: Component<{
  name: string
  id?: string
  placeholder?: string
  value?: HTMLInputElement['value']
  disabled?: boolean
  class?: JSX.HTMLAttributes<HTMLInputElement>['class']
  type?: JSX.InputHTMLAttributes<HTMLInputElement>['type']
  style?: JSX.HTMLAttributes<HTMLDivElement>['style']
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
}> = (props) => {
  return (
    <div
      style={props.style}
      class={`${styles.input} ${props.class ? props.class : ''}`}
    >
      <label for={props.name}>{props.name}</label>
      <input
        type={props.type}
        id={props.id || props.name}
        name={props.name}
        value={props.value || ''}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onInput={props.onInput}
      />
    </div>
  )
}

export default FormInput
