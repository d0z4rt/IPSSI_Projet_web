import {
  type Component,
  For,
  type Setter,
  createSignal,
  onCleanup,
  onMount
} from 'solid-js'
import styles from './style.module.css'

const Select: Component<{
  name?: string
  options: string[]
  activeOption?: string
  minWidth?: string
  setActiveOption: Setter<string>
}> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false)

  const toggleDropdown = () => setIsOpen(!isOpen())

  const selectOption = (option: string) => {
    props.setActiveOption(option)
    setIsOpen(false)
  }

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation()
    setIsOpen(false)
    props.setActiveOption('')
  }

  const handleClickOutside = (e: MouseEvent) => {
    // ! we need to infer the type HTMLElement for closest to be recognized
    if (!(e.target as HTMLElement)?.closest(`.${styles['custom-dropdown']}`)) {
      setIsOpen(false)
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside)

    onCleanup(() => {
      if (document) {
        document.removeEventListener('click', handleClickOutside)
      }
    })
  })

  return (
    <div
      class={`${styles['custom-dropdown']} ${isOpen() ? styles.open : ''}`}
      style={{
        'min-width': props.minWidth ? props.minWidth : '15ch'
      }}
    >
      <span>{props.name}</span>
      <div
        class={styles.selected}
        onClick={toggleDropdown}
        onKeyUp={(e) => e.key === 'Enter' && toggleDropdown()}
      >
        <span>{props.activeOption || 'Select'}</span>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Using this for now, might need to fix it using a button */}
        <span style={{ 'margin-left': '1ch' }} onClick={handleClear}>
          {props.activeOption && '✕'}
        </span>
      </div>
      <ul class={styles['dropdown-list']}>
        <For each={props.options}>
          {(option) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: Using this for now, might need to fix it using a button
            <li
              value={option}
              class={
                props.activeOption && props.activeOption === option
                  ? styles.active
                  : ''
              }
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

export default Select
