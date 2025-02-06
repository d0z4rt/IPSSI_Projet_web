import { A, useNavigate } from '@solidjs/router'
import { type JSX, Show, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import styles from './register.module.css'

const handleRegister = async (registerFields: {
  name: string
  email: string
  password: string
  'repeat-password': string
}) => {
  const res = await fetch('http://127.0.0.1:4000/auth/register', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerFields)
  })
  const resBody = await res.json()
  if (!res.ok) {
    throw resBody
  }
  return resBody
}

const Register = () => {
  const [error, setError] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)
  const [registerFields, setRegisterFields] = createStore({
    name: '',
    email: '',
    password: '',
    'repeat-password': ''
  })

  const navigate = useNavigate()

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e
  ) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await handleRegister(registerFields)
      navigate('/login')
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
            <h1 class={styles.span}>Register</h1>
            <FormInput
              name="name"
              disabled={isLoading()}
              onInput={(e) => setRegisterFields('name', e.currentTarget.value)}
            />
            <FormInput
              name="phone"
              disabled={isLoading()}
              onInput={(e) =>
                setRegisterFields('password', e.currentTarget.value)
              }
            />
            <FormInput
              name="email"
              type="email"
              class={styles.span}
              disabled={isLoading()}
              onInput={(e) => setRegisterFields('email', e.currentTarget.value)}
            />
            <FormInput
              name="street"
              class={styles.span}
              disabled={isLoading()}
              onInput={(e) =>
                setRegisterFields('password', e.currentTarget.value)
              }
            />
            <FormInput
              name="postal-code"
              type="number"
              disabled={isLoading()}
              onInput={(e) =>
                setRegisterFields('password', e.currentTarget.value)
              }
            />
            <FormInput
              name="city"
              disabled={isLoading()}
              onInput={(e) =>
                setRegisterFields('password', e.currentTarget.value)
              }
            />
            <FormInput
              name="password"
              type="password"
              disabled={isLoading()}
              onInput={(e) =>
                setRegisterFields('password', e.currentTarget.value)
              }
            />
            <FormInput
              name="repeat-password"
              disabled={isLoading()}
              type="password"
              onInput={(e) =>
                setRegisterFields('repeat-password', e.currentTarget.value)
              }
            />
            <Button class={styles.span} type="submit">
              register
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
            Tu as deja un compte ? <A href="/login">Se connecter</A>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Register
