import { For } from 'solid-js'
import { bar } from '../data/bar'
import styles from './bar.module.css'

// Composant affichant le menu du bar en différentes catégories
const Bar = () => {
  return (
    <main>
      {/* Conteneur principal du menu */}
      <div class={styles['menu-container']}>
        {/* Boucle sur chaque catégorie du menu */}
        <For each={bar}>
          {(category) => (
            <div class={styles.category}>
              {/* Nom de la catégorie */}
              <h2>{category.name}</h2>
              <div>
                {/* Boucle sur les items de chaque catégorie */}
                <For each={category.data}>
                  {(item) => (
                    <div class={styles.item}>
                      {/* En-tête de l'item avec le prix et le nom */}
                      <div class={styles['item-header']}>
                        <span class={styles['item-price']}>{item.prix}</span>
                        <p class={styles['item-name']}>{item.nom}</p>
                      </div>
                      {/* Description de l'item, affichée si disponible */}
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
