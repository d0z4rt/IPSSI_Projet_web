import type { Component, JSX } from 'solid-js'
import styles from './style.module.css'

const FormInput: Component<{
  name: string
  value?: HTMLInputElement['value']
  disabled?: boolean
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
}> = (props) => {
  return (
    <div class={styles.input}>
      <label for={props.name}>{props.name}</label>
      <input
        id={props.name}
        name={props.name}
        value={props.value || ''}
        disabled={props.disabled}
        onInput={props.onInput}
      />
    </div>
  )
}

export default FormInput
