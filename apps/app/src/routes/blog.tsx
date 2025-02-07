import { For, type ParentComponent, createSignal } from 'solid-js'
import Button from '../components/Button'
import Card from '../components/Card'
import FormInput from '../components/FormInput'
import Select from '../components/Select'
import { blog } from '../data/blog'
import styles from './blog.module.css'

// États pour gérer les filtres
const [searchValue, setSearchValue] = createSignal('')
const [selectedDate, setSelectedDate] = createSignal('')

// Fonction pour filtrer les événements
const filteredEvents = () =>
  blog.filter((event) => {
    const nameMatch = event.name.toLowerCase().includes(searchValue())
    const eventDateMatch =
      event.date.toLowerCase().includes(selectedDate()) || selectedDate() === ''

    return nameMatch && eventDateMatch
  })

const Blog: ParentComponent = (props) => {
  return (
    <main class={styles['main-content']}>
      {/* Barre de filtres */}
      <div class={styles['filter-bar']}>
        <h1>Blog / </h1>
        <FormInput
          name="recherche"
          type="text"
          id={styles.search}
          onInput={(e) => setSearchValue(e.currentTarget.value.toLowerCase())}
          placeholder="🔍 Rechercher un événement..."
        />

        {/* Sélecteur de date */}
        <Select
          name="📅 Date"
          minWidth="22ch"
          options={[
            '6 février 2025',
            '13 février 2025',
            '14 février 2025',
            '22 février 2025',
            '27 février 2025'
          ]}
          activeOption={selectedDate()}
          setActiveOption={setSelectedDate}
        />
      </div>

      {/* Grille des événements */}
      <section class={styles['events-grid']} id="events-list">
        <For each={filteredEvents()}>
          {(event) => (
            <Card title={event.name} cover={`/${event.img}`} alt={event.name}>
              <p>{event.info}</p>
              <p>
                <strong>{event.date}</strong>
              </p>
              <Button type="button" class={styles['btn-reserve']}>
                S'inscrire
              </Button>
            </Card>
          )}
        </For>
      </section>
    </main>
  )
}

export default Blog
