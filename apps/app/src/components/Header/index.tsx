import { A, useBeforeLeave } from '@solidjs/router'
import { Show, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useAuthState } from '../../contexts/auth.context'
import Logo from '../Logo'
import styles from './style.module.css'

const Header = () => {
  const authStore = useAuthState()
  const [showMobileNav, setShowMobileNav] = createSignal(false)
  const handleBurgerClick = () => {
    setShowMobileNav((d) => !d)
  }
  useBeforeLeave(() => {
    setShowMobileNav(false)
  })
  return (
    <header class={styles.header}>
      <nav class={styles.nav}>
        <Logo />
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
          <li>
            <A href="/blog">Blog</A>
          </li>
        </ul>
        <Show
          when={!authStore.user}
          fallback={
            <A href="/profile" class={`${styles.button} ${styles.profile}`}>
              <img
                width={512}
                height={512}
                alt="profile"
                src="/images/profile.png"
              />
              {authStore.user?.name}
            </A>
          }
        >
          <A href="/login" class={styles.button}>
            Connexion / Inscription
          </A>
        </Show>
        <button
          class={`${styles.button} ${styles.burger_button}`}
          type="button"
          onClick={handleBurgerClick}
        >
          <Show when={showMobileNav()} fallback="☰">
            ✕
          </Show>
        </button>
      </nav>
      <Show when={showMobileNav()}>
        <Portal>
          <nav classList={{ [styles.mobile_nav]: true }}>
            <Show
              when={!authStore.user}
              fallback={
                <A href="/profile" class={`${styles.button} ${styles.profile}`}>
                  <img
                    width={512}
                    height={512}
                    alt="profile"
                    src="/images/profile.png"
                  />
                  {authStore.user?.name}
                </A>
              }
            >
              <A href="/login" class={styles.button}>
                Connexion / Inscription
              </A>
            </Show>
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
              <li>
                <A href="/blog">Blog</A>
              </li>
            </ul>
          </nav>
        </Portal>
      </Show>
    </header>
  )
}

export default Header
