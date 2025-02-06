import { For } from 'solid-js'
import { bar } from '../data/bar'
import styles from './bar.module.css'

const Bar = () => {
  return (
    <main>
      <div class={styles['menu-container']}>
        <For each={bar}>
          {(category) => (
            <div class={styles.category}>
              <h2>{category.name}</h2>
              <div>
                <For each={category.data}>
                  {(item) => (
                    <div class={styles.item}>
                      <div class={styles['item-header']}>
                        <span class={styles['item-price']}>{item.prix}</span>
                        <p class={styles['item-name']}>{item.nom}</p>
                      </div>
                      <p class={styles['item-description']}>
                        {(item as { description: string }).description || ''}
                      </p>
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </main>
  )
}
export default Bar
