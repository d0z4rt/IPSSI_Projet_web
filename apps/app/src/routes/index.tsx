import Card from '../components/Card'
import Logo from '../components/Logo'
import styles from './index.module.css'

export default function Home() {
  return (
    <main class={styles['main-content']}>
      <div class={styles.wrapper}>
        <section class={styles.bio}>
          <Logo noText />
          <h2>Bienvenue au Carré d'As</h2>
          <p>
            Un spot unique où <em>jeux de société</em> et <em>concerts live</em>{' '}
            se rencontrent dans une ambiance électrique. Que tu sois là pour
            défier tes potes autour d’un plateau ou te laisser porter par des
            vibes musicales endiablées, chaque soirée ici est une{' '}
            <strong>nouvelle expérience</strong>. Entre <em>décor stylé</em>,{' '}
            <em>énergie conviviale</em> et <em>moments inoubliables</em>, c’est
            l’endroit parfait pour <strong>chiller</strong>,{' '}
            <strong>jouer</strong> et <strong>vibrer</strong>.
          </p>
        </section>

        <section class={styles.cards}>
          <Card
            title="Notre Carte"
            href="carte"
            cover="./images/bar2.png"
            alt="cover"
          >
            Des <strong>cocktails originaux</strong>, des{' '}
            <strong>bières artisanales</strong> et des <em>snacks gourmands</em>{' '}
            pour accompagner tes soirées.
          </Card>

          <Card
            title="Jeux de Société"
            href="jeux"
            cover="./images/jeux.png"
            alt="cover"
          >
            Des <em>jeux pour tous</em> : stratégie, fun rapide ou classiques.
            Viens défier tes potes dans une ambiance détendue !
          </Card>

          <Card
            title="Concerts Live"
            href="concerts"
            cover="./images/concert.png"
            alt="cover"
          >
            Des <strong>concerts intenses</strong> chaque semaine avec des{' '}
            <em>artistes locaux</em> et des <em>vibes uniques</em>.
          </Card>
        </section>
      </div>
    </main>
  )
}
