import { createSignal, onCleanup } from 'solid-js'
import styles from './style.module.css'

const Select = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [selectedValue, setSelectedValue] = createSignal('')
  const [activeOption, setActiveOption] = createSignal(null)

  const toggleDropdown = () => setIsOpen(!isOpen())
  const selectOption = (option) => {
    setSelectedValue(option.textContent)
    setActiveOption(option)
    setIsOpen(false)
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${styles['custom-dropdown']}`)) {
      setIsOpen(false)
    }
  }

  document.addEventListener('click', handleClickOutside)

  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return (
    <div class={`${styles['custom-dropdown']} ${isOpen() ? styles.open : ''}`}>
      <div
        class={styles.selected}
        onClick={toggleDropdown}
        onKeyUp={(e) => e.key === 'Enter' && toggleDropdown()}
      >
        {selectedValue()}
      </div>
      <ul class={styles['dropdown-list']}>
        {prop.options.map((value) => (
          <li
            value={value}
            class={
              activeOption() && activeOption().textContent === value
                ? styles.active
                : ''
            }
            onClick={(e: MouseEvent) => selectOption(e.target as HTMLElement)}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
