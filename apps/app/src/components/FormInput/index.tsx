import type { Component, JSX } from 'solid-js'

const FormInput: Component<{
  name: string
  value?: HTMLInputElement['value']
  disabled?: boolean
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
}> = (props) => {
  return (
    <>
      <label for={props.name}>{props.name}</label>
      <input
        id={props.name}
        name={props.name}
        value={props.value || ''}
        disabled={props.disabled}
        onInput={props.onInput}
      />
    </>
  )
}

export default FormInput
