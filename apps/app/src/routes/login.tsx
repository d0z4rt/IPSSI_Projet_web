import { useNavigate } from '@solidjs/router'
import { type JSX, Show, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import FormInput from '../components/FormInput'
import { useAuthActions } from '../contexts/auth.context'

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

const Login = () => {
  const { setUser } = useAuthActions()
  const [error, setError] = createSignal('')
  const [isLoading, setIsLoading] = createSignal(false)
  const [isRegister, setIsRegister] = createSignal(false)
  const [loginFields, setLoginFields] = createStore({ email: '', password: '' })
  const [registerFields, setRegisterFields] = createStore({
    name: '',
    email: '',
    password: '',
    'repeat-password': ''
  })

  const navigate = useNavigate()

  const toggleRegister = () => {
    setIsRegister((r) => !r)
  }

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e
  ) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      if (isRegister()) {
        await handleRegister(registerFields)
        toggleRegister()
      } else {
        const user = await handleLogin(loginFields)
        setUser(user)
        navigate('/')
      }
    } catch (error) {
      // ! Yeah ugly stuff...
      setError((error as { message: string }).message)
    }
    setIsLoading(false)
  }

  return (
    <main>
      <Show
        when={isRegister()}
        fallback={
          <>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <FormInput
                name="email"
                disabled={isLoading()}
                onInput={(e) => setLoginFields('email', e.currentTarget.value)}
              />
              <FormInput
                name="password"
                disabled={isLoading()}
                onInput={(e) =>
                  setLoginFields('password', e.currentTarget.value)
                }
              />
              <button type="submit">login</button>
            </form>
            <p>
              Pas de compte ?
              <button type="button" onClick={toggleRegister}>
                Register
              </button>
            </p>
          </>
        }
      >
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            name="name"
            disabled={isLoading()}
            onInput={(e) => setRegisterFields('name', e.currentTarget.value)}
          />
          <FormInput
            name="email"
            disabled={isLoading()}
            onInput={(e) => setRegisterFields('email', e.currentTarget.value)}
          />
          <FormInput
            name="password"
            disabled={isLoading()}
            onInput={(e) =>
              setRegisterFields('password', e.currentTarget.value)
            }
          />
          <FormInput
            name="repeat-password"
            disabled={isLoading()}
            onInput={(e) =>
              setRegisterFields('repeat-password', e.currentTarget.value)
            }
          />
          <button type="submit">register</button>
        </form>
        <p>
          Vous avez deja un compte
          <button type="button" onClick={toggleRegister}>
            Login
          </button>
        </p>
      </Show>
      <p>{error()}</p>
    </main>
  )
}

export default Login
