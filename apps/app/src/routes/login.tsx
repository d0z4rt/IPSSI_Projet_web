import { A, useNavigate } from '@solidjs/router'
import { type JSX, Show, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { useAuthActions } from '../contexts/auth.context'
import styles from './login.module.css'

const handleLogin = async (loginFields: {
  email: string
  password: string
}) => {
  const res = await fetch('http://127.0.0.1:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginFields)
  })
  const resBody = await res.json()
  if (!res.ok) {
    throw resBody
  }
  return resBody
}

const Login = () => {
  const { setUser } = useAuthActions()
  const [error, setError] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)
  const [loginFields, setLoginFields] = createStore({ email: '', password: '' })

  const navigate = useNavigate()

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e
  ) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const user = await handleLogin(loginFields)
      setUser(user)
      navigate('/')
    } catch (error) {
      // ! Yeah ugly stuff...
      setError((error as { message: string }).message)
    }
    setIsLoading(false)
  }

  return (
    <main class={styles.main}>
      <div class={styles.wrapper}>
        <div class={styles.card}>
          <form onSubmit={handleSubmit} class={styles.form}>
            <h1 class={styles.span}>Login</h1>
            <FormInput
              class={styles.span}
              type="email"
              name="email"
              disabled={isLoading()}
              onInput={(e) => setLoginFields('email', e.currentTarget.value)}
            />
            <FormInput
              class={styles.span}
              name="password"
              type="password"
              disabled={isLoading()}
              onInput={(e) => setLoginFields('password', e.currentTarget.value)}
            />
            <Button class={styles.span} type="submit">
              login
            </Button>
          </form>
          <Show when={error()}>
            <div class={styles.error}>
              {/* biome-ignore lint/suspicious/noCommentText: Not a comment */}
              <h3>// ERROR //</h3>
              <p>{error()}</p>
            </div>
          </Show>
          <p>
            Tu n'as pas de compte ? <A href="/register">s'inscrire</A>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login
