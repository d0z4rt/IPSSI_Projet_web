import { type ParentComponent, createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { TUser } from '../entities/user.entity'

/**
 * Store type
 */
type StoreState = {
  user?: TUser
  authToken?: string
}

type StoreActions = {
  setUser: (user?: TUser) => void
  setAuthToken: (token?: string) => void
  disconnect: () => void
}

/**
 * Initial state of the store
 */
const initialState: StoreState = {
  user: undefined,
  authToken: undefined
}

/**
 * Context
 */
const StateContext = createContext<StoreState>()
const ActionsContext = createContext<StoreActions>()

/**
 * Provider
 */
const AuthProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<StoreState>(initialState)

  const setUser: StoreActions['setUser'] = (user) => {
    setState('user', user)
  }

  const setAuthToken: StoreActions['setAuthToken'] = (token) => {
    setState('authToken', token)
  }

  const disconnect: StoreActions['disconnect'] = () => {
    setState('user', undefined)
    setState('authToken', undefined)
  }

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider
        value={{
          setUser,
          setAuthToken,
          disconnect
        }}
      >
        {props.children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

export default AuthProvider

export const useAuthState = () => {
  const context = useContext(StateContext)
  if (context) {
    return context
  }
  throw Error('Auth State not initialized')
}

export const useAuthActions = () => {
  const context = useContext(ActionsContext)
  if (context) {
    return context
  }
  throw Error('Auth Actions not initialized')
}
