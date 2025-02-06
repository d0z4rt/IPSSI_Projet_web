import {For, createSignal, Show, createMemo} from 'solid-js';
import {jeux} from '../data/jeu';
import styles from './jeu.module.css';
import Card from '../components/Card'
import FormInput from '../components/FormInput'
import Button from '../components/Button';

const Jeu = () => {
  const [searchValue, setSearchValue] = createSignal('');
  const [selectedMainTag, setSelectedMainTag] = createSignal('');
  const [selectedSubTag, setSelectedSubTag] = createSignal('');
  const [sortCriteria, setSortCriteria] = createSignal('name');
  const [showFilterPage, setShowFilterPage] = createSignal(false);
  
  const allMainTags = Array.from(new Set(jeux.map(jeu => jeu.mainTag.toLowerCase())));
  
  const availableSubTags = createMemo(() => {
    if (selectedMainTag() === '') {
      return Array.from(new Set(jeux.map(jeu => jeu.subTag.toLowerCase())));
    }
    return Array.from(new Set(jeux.filter(jeu => jeu.mainTag.toLowerCase() === selectedMainTag()).map(jeu => jeu.subTag.toLowerCase())));
  });
  
  const filteredJeux = () =>
  jeux.filter((jeu) => {
    const nameMatch = jeu.name.toLowerCase().includes(searchValue());
    const mainTagMatch = selectedMainTag() === '' || jeu.mainTag.toLowerCase() === selectedMainTag();
    const subTagMatch = selectedSubTag() === '' || jeu.subTag.toLowerCase() === selectedSubTag();
    
    return nameMatch && mainTagMatch && subTagMatch;
  });
  
  const sortedJeux = () => {
    const jeuxToSort = filteredJeux();
    return jeuxToSort.sort((a, b) => {
      if (sortCriteria() === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortCriteria() === 'time') {
        return Number.parseInt(a.time) - Number.parseInt(b.time);
      }
      return 0;
    });
  };
  
  return (
  <>
  
  <div class={styles['filter-bar']}>
    
    <FormInput 
      type="text"
      id={styles.search}
      onInput={(e)=> setSearchValue(e.currentTarget.value.toLowerCase())}
      placeholder="🔍 Rechercher un jeu..."
    />

    <Button class={styles.filter_btn} type="button" onClick={() => setShowFilterPage(true)}>Filtres</Button>
      
      
      <select id="sort" aria-label="sort" class={styles.filter_select} onChange={(e) => setSortCriteria(e.currentTarget.value)}>
        <option value="default" disabled selected hidden>Trier par</option>
        <option value="name">Nom</option>
        <option value="time">Temps</option>
      </select>
    
  </div>
  


  <Show when={showFilterPage()}>
    <div class={styles['filter-page']}>
      <button class={styles['close-btn']} onClick={() => setShowFilterPage(false)} type='button'>Fermer</button>
      <button id="all" class={styles.btn_list} type="button" onClick={() => {
        setSelectedMainTag('');
        setSelectedSubTag('');
        setShowFilterPage(false);
      }}>Tout</button>
      <h3>Genre principal</h3>
      <div class={styles['tag-container']}>
        <For each={allMainTags}>
          {(tag) => (
            <button
            class={`${styles.btn_list} ${styles.mainTag} ${styles[tag.toLowerCase().replace(/\s+/g, '-')]} ${selectedMainTag() === tag ? styles.selected : ''}`}
            type="button"
            onClick={() => {
              setSelectedMainTag(selectedMainTag() === tag ? '' : tag);
              setSelectedSubTag('');
            }}
            >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
          )}
        </For>
      </div>
      <h3>Genre secondaire</h3>
      <div class={styles['tag-container']}>
        <For each={availableSubTags()}>
          {(tag) => (
            <button
            class={`${styles.btn_list} ${styles.subTag} ${selectedSubTag() === tag ? styles.selected : ''}`}
            type="button"
            onClick={() => {
              setSelectedSubTag(selectedSubTag() === tag ? '' : tag);
            }}
            >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
          )}
        </For>
      </div>
    </div>
  </Show>
  
  <div class={styles.cards} id="cards">
    <For each={sortedJeux()}>
      {(jeu) => (
        <Card title={jeu.name} alt={jeu.name} >
          <img src={jeu.img} alt={jeu.name} class={styles.imgcard} />
          <p>{jeu.info}</p>
          <p>⏲{jeu.time} minutes</p>
          <p class={`${styles.mainTag} ${styles[jeu.mainTag.toLowerCase().replace(/\s+/g, '-')]}`}>{jeu.mainTag}</p>
          <p class={styles.subTag}>{jeu.subTag}</p>
        </Card>
        )}
      </For>
    </div>
    </>
    );
  }
  
  export default Jeu;