import {For} from 'solid-js';
import {jeux} from '../data/jeu';
import styles from './jeu.module.css';

const Jeu = () => {


  return (
  <>
  <header class={styles.header}>
    <div class={styles.logo}>
      <img src="/images/logo.png" alt="Logo du Carré d'As" class="styles.logo-img" />
    </div>
    <nav class={styles.nav}>
      <ul class={styles.menu}>
        <li><a href="#">Bar</a></li>
        <li><a href="#">Jeux</a></li>
        <li><a href="#">Concerts</a></li>
      </ul>
      <a class={styles.login-btn} href="#">Connexion / Inscription</a>
    </nav>
  </header>
  
  <div>
    <div class={styles.title}>
      <h1>Jeux</h1>
    </div>
    <div class={styles.select}>
      <div id="search">
        <label for="search">Rechercher un jeu</label>
        <input type="text" id="search" name="search" placeholder="Rechercher un jeu"/>
      </div>
      <div id="filter">
        <div id="btnlist">
          <button id="all" class={styles.btnlist} type="button">Tout</button>
          <button id="card" class={styles.btnlist} type="button">Cartes</button>
          <button id="strat" class={styles.btnlist} type="button">Stratégie</button>
          <button id="soc" class={styles.btnlist} type="button">Société</button>
          <button id="reflex" class={styles.btnlist} type="button">Réflexion</button>
          <button id="arc" class={styles.btnlist} type="button">Arcade</button>
          <button id="role" class={styles.btnlist} type="button">Rôle</button>
          <button id="adrr" class={styles.btnlist} type="button">Adresse</button>
        </div>
      </div>
      <div id="sort">
        <select name="sorter" id="sortlist" title="Trier par">
          <option value="name">Nom</option>
          <option value="type">Type</option>
          <option value="age">Age</option>
          <option value="time">Durée</option>
        </select>
      </div>
    </div>
    <div class={styles.cards} id="cards">
      <For each={jeux}>{(jeu) => <>
        <img src={jeu.img} alt={jeu.name}/>
        <h3>{jeu.name}</h3>
        <p>{jeu.info}</p>
        <p>{jeu.time} minutes</p>
        <p>{jeu.tag}</p>
        </>
      }</For>
    </div>
    
    <section class={styles.contact}>
      <h2>Nous contacter</h2>
      <form class={styles.contact-form}>
        <div class="styles.contact-name">
          <div class="styles.contact-info">
            <label for="name">Nom</label>
            <input id="name" class="styles.contact-text" type="text" required/>
          </div>
          <div class="styles.contact-info">
            <label for="firstname">Prénom</label>
            <input id="firstname" class="styles.contact-text" type="text" required/>
          </div>
        </div>
        <div class="styles.contact-info other">
          <label for="email">Email</label>
          <input id="email" class="styles.contact-text" type="email" required/>
        </div>
        <div class="styles.contact-info other">
          <label for="subject">Sujet</label>
          <input id="subject" class="styles.contact-text" type="text" required/>
        </div>
        <div class="styles.contact-info other">
          <label for="message">Message</label>
          <input id="message" class="styles.contact-text" type="text" required/>
        </div>
        <button class="styles.button" type="submit">Envoyer</button>
      </form>
    </section> 
    
  </div>
  <footer class="styles.footer">
    <div class="styles.footer-content">
      <p>&#x1f4cd; 123 Rue des Stratèges, Montpellier</p>
      <p>&#x1f4de; 04 12 34 56 78 | ✉️ contact@carredas.fr</p>
      <div class="styles.footer-hours">
        <p>&#x1f552; Lundi - Jeudi : 18h - 00h | Vendredi - Dimanche : 17h - 02h</p>
      </div>
      <div class="styles.footer-social">
        <a href="#"><img src="/images/facebook-icon.png" alt="Facebook"/></a>
        <a href="#"><img src="/images/instagram-icon.png" alt="Instagram"/></a>
        <a href="#"><img src="/images/twitter-icon.png" alt="Twitter"/></a>
      </div>
      <div class="styles.footer-legal">
        <a href="#">Mentions légales</a> | 
        <a href="#">Politique de confidentialité</a>
      </div>
      <p>© 2025 Le Carré d'As - Tous droits réservés</p>
    </div>
  </footer>
  </>
  );
}

export default Jeu;