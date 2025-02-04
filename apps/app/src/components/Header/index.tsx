import { A } from '@solidjs/router'
import { Show, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useAuthState } from '../../contexts/auth.context'
import Logo from '../Logo'
import styles from './style.module.css'

const Header = () => {
  const authStore = useAuthState()
  const [showMobileNav, setShowMobileNav] = createSignal()
  const handleBurgerClick = () => {
    setShowMobileNav((d) => !d)
  }
  return (
    <header class={styles.header}>
      <Logo />
      <nav class={styles.nav}>
        <ul class={styles.menu}>
          <li>
            <A href="/">Accueil</A>
          </li>
          <li>
            <A href="/bar">Bar</A>
          </li>
          <li>
            <A href="/jeux">Jeux</A>
          </li>
          <li>
            <A href="/concerts">Concerts</A>
          </li>
        </ul>
        <Show
          when={!authStore.user}
          fallback={<A href="/profile">{authStore.user?.name}</A>}
        >
          <A href="/login">Connexion / Inscription</A>
        </Show>
      </nav>
      <button
        class={styles.burger_button}
        type="button"
        onClick={handleBurgerClick}
      >
        =
      </button>
      <Show when={showMobileNav()}>
        <Portal>
          <nav classList={{ [styles.mobile_nav]: true }}>
            <ul class={styles.menu}>
              <li>
                <A href="/">Accueil</A>
              </li>
              <li>
                <A href="/bar">Bar</A>
              </li>
              <li>
                <A href="/jeux">Jeux</A>
              </li>
              <li>
                <A href="/concerts">Concerts</A>
              </li>
            </ul>
            <Show
              when={!authStore.user}
              fallback={<A href="/profile">{authStore.user?.name}</A>}
            >
              <A href="/login">Connexion / Inscription</A>
            </Show>
          </nav>
        </Portal>
      </Show>
    </header>
  )
}

export default Header
