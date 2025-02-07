import {
  For,
  type ParentComponent,
  Suspense,
  createResource,
  createSignal
} from 'solid-js'
import Card from '../components/Card'
import EventSubscribeButton from '../components/EventSubscribeButton'
import FormInput from '../components/FormInput'
import Select from '../components/Select'
import type { TEvent } from '../entities/event.entity'
import styles from './blog.module.css'

const Blog: ParentComponent = (props) => {
  // États pour gérer les filtres
  const [searchValue, setSearchValue] = createSignal('')
  const [selectedDate, setSelectedDate] = createSignal('')
  const [events, { refetch }] = createResource(async () => {
    const response = await fetch('http://localhost:4000/events/')
    return (await response.json()) as TEvent[]
  })

  // Fonction pour filtrer les événements
  const filteredEvents = () =>
    events()?.filter((event) => {
      const nameMatch = event.name.toLowerCase().includes(searchValue())
      const eventDateMatch =
        event.date.toLowerCase().includes(selectedDate()) ||
        selectedDate() === ''

      return nameMatch && eventDateMatch
    })

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
        <Suspense fallback={<div>Loading...</div>}>
          <For each={filteredEvents()}>
            {(event) => (
              <Card title={event.name} cover={`/${event.img}`} alt={event.name}>
                <p>{event.info}</p>
                <p>
                  <strong>{event.date}</strong>
                </p>
                <EventSubscribeButton eventId={event.id} />
              </Card>
            )}
          </For>
        </Suspense>
      </section>
    </main>
  )
}

export default Blog
