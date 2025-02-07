import Button from '../Button'
import FormInput from '../FormInput'
import styles from './style.module.css'

const Footer = () => {
  return (
    <footer class={styles.footer}>
      <form class={styles.form}>
        <FormInput name="nom" />
        <FormInput name="prénom" />
        <FormInput class={styles.span} name="email" />
        <FormInput class={styles.span} name="sujet" />
        <FormInput class={styles.span} name="message" />
        <Button class={styles.span}>Envoyer</Button>
      </form>
      <div class={styles['footer-content']}>
        <p>📍 123 Rue des Stratèges, 75000 Paris</p>
        <p>📞 04 12 34 56 78 | ✉️ contact@carredas.fr</p>
        <div class={styles['footer-hours']}>
          <p>🕒 Lundi - Jeudi : 18h - 00h | Vendredi - Dimanche : 17h - 02h</p>
        </div>

        <div class={styles['footer-social']}>
          <a href={'./#'}>
            <img src="images/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="./#">
            <img src="images/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="./#">
            <img src="images/twitter-icon.png" alt="Twitter" />
          </a>
        </div>

        <div class={styles['footer-legal']}>
          <a href="mentions">Mentions légales</a> |
          <a href="privacy">Politique de confidentialité</a>
        </div>

        <p>© 2025 Le Carré d'As - Tous droits réservés</p>
      </div>
      <div id="gmap-canvas" class={styles.map}>
        <iframe
          title="map"
          style="height:100%;width:100%;border:0;filter: invert(90%) grayscale(0.5) hue-rotate(0deg) contrast(1.2);"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1099.5580186509796!2d2.3725422989245395!3d48.87496777733965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66de0a4ca9a25%3A0xa4310fb4f3acfbb3!2sCarre%20D&#39;as!5e0!3m2!1sen!2sus!4v1738831930877!5m2!1sen!2sus"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  )
}

export default Footer
