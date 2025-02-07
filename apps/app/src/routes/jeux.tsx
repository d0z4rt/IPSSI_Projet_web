import { For, Show, createMemo, createSignal } from 'solid-js'
import Button from '../components/Button'
import Card from '../components/Card'
import FormInput from '../components/FormInput'
import Select from '../components/Select'
import { jeux } from '../data/jeu'
import styles from './jeu.module.css'

// Composant principal pour afficher les jeux
const Jeu = () => {
  // Déclaration des signaux pour la recherche, les tags et les critères de tri
  const [searchValue, setSearchValue] = createSignal('')
  const [selectedMainTag, setSelectedMainTag] = createSignal('')
  const [selectedSubTag, setSelectedSubTag] = createSignal('')
  const [sortCriteria, setSortCriteria] = createSignal('name')
  const [showFilterPage, setShowFilterPage] = createSignal(false)

  // Récupération de tous les tags principaux uniques
  const allMainTags = Array.from(
    new Set(jeux.map((jeu) => jeu.mainTag.toLowerCase()))
  )

  // Recherche des tags secondaires disponibles en fonction du tag principal sélectionné
  const availableSubTags = createMemo(() => {
    if (selectedMainTag() === '') {
      return Array.from(new Set(jeux.map((jeu) => jeu.subTag.toLowerCase())))
    }
    return Array.from(
      new Set(
        jeux
          .filter((jeu) => jeu.mainTag.toLowerCase() === selectedMainTag())
          .map((jeu) => jeu.subTag.toLowerCase())
      )
    )
  })

  // Filtrage des jeux en fonction des critères de recherche et des tags sélectionnés
  const filteredJeux = () =>
    jeux.filter((jeu) => {
      const nameMatch = jeu.name.toLowerCase().includes(searchValue())
      const mainTagMatch =
        selectedMainTag() === '' ||
        jeu.mainTag.toLowerCase() === selectedMainTag()
      const subTagMatch =
        selectedSubTag() === '' || jeu.subTag.toLowerCase() === selectedSubTag()

      return nameMatch && mainTagMatch && subTagMatch
    })

  // Tri des jeux filtrés en fonction des critères de tri
  const sortedJeux = () => {
    const jeuxToSort = filteredJeux()
    return jeuxToSort.sort((a, b) => {
      if (sortCriteria() === 'name') {
        return a.name.localeCompare(b.name)
      }
      if (sortCriteria() === 'time') {
        return Number.parseInt(a.time) - Number.parseInt(b.time)
      }
      return 0
    })
  }

  return (
    <>
      {/* Barre de filtre */}
      <div class={styles['filter-bar']}>
        <h1>Jeux / </h1>
        <FormInput
          type="text"
          name="Recherche"
          id={styles.search}
          onInput={(e) => setSearchValue(e.currentTarget.value.toLowerCase())}
          placeholder="🔍 Rechercher un jeu..."
        />

        <Button
          class={styles.filter_btn}
          type="button"
          onClick={() => setShowFilterPage(true)}
        >
          Filtres
        </Button>

        <Select
          name="Trier par"
          options={['name', 'time']}
          activeOption={sortCriteria()}
          setActiveOption={setSortCriteria}
        />
      </div>

      {/* Page de filtre */}
      <Show when={showFilterPage()}>
        <div class={styles['filter-page']}>
          {/* Bouton pour fermer la page de filtre */}
          <button
            class={styles['close-btn']}
            onClick={() => setShowFilterPage(false)}
            type="button"
          >
            Fermer
          </button>

          {/* Bouton pour réinitialiser les filtres */}
          <button
            id="all"
            class={styles.btn_list}
            type="button"
            onClick={() => {
              setSelectedMainTag('')
              setSelectedSubTag('')
              setShowFilterPage(false)
            }}
          >
            Tout
          </button>

          {/* Section pour sélectionner le genre principal */}
          <h3>Genre principal</h3>
          <div class={styles['tag-container']}>
            <For each={allMainTags}>
              {(tag) => (
                <button
                  class={`${styles.btn_list} ${styles.mainTag} ${styles[tag.toLowerCase().replace(/\s+/g, '-')]} ${selectedMainTag() === tag ? styles.selected : ''}`}
                  type="button"
                  onClick={() => {
                    setSelectedMainTag(selectedMainTag() === tag ? '' : tag)
                    setSelectedSubTag('')
                  }}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              )}
            </For>
          </div>

          {/* Section pour sélectionner le genre secondaire */}
          <h3>Genre secondaire</h3>
          <div class={styles['tag-container']}>
            <For each={availableSubTags()}>
              {(tag) => (
                <button
                  class={`${styles.btn_list} ${styles.subTag} ${selectedSubTag() === tag ? styles.selected : ''}`}
                  type="button"
                  onClick={() => {
                    setSelectedSubTag(selectedSubTag() === tag ? '' : tag)
                  }}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* Affichage des cartes de jeux */}
      <div class={styles.cards} id="cards">
        <For each={sortedJeux()}>
          {(jeu) => (
            <Card title={jeu.name} alt={jeu.name} type={jeu.mainTag}>
              <img src={jeu.img} alt={jeu.name} class={styles.imgcard} />
              <p>{jeu.info}</p>
              <p>⏲ {jeu.time} minutes</p>
              <p class={styles.subTag}>{jeu.subTag}</p>
            </Card>
          )}
        </For>
      </div>
    </>
  )
}

export default Jeu
