const root = document.querySelector('#root')
if (!root) {
  throw new Error('root element missing')
}
const errorEl = document.createElement('div')
let errorNode

/**
 * Form mode
 * 0 - login
 * 1 - register
 */
let CURRENT_MODE = 0

/**
 * Create a label and an input
 * @param {string} name
 * @param {Object} opts input options
 * @param {HTMLInputElement['type']} opts.type input type
 * @param {(e: Event) => void} opts.onChange
 * @returns
 */
const createInput = (name, opts = { type: 'text' }) => {
  const labelEl = document.createElement('label')
  const inputEl = document.createElement('input')
  opts?.onChange && inputEl.addEventListener('input', opts.onChange)

  labelEl.setAttribute('for', name)
  labelEl.textContent = name
  inputEl.id = name
  inputEl.setAttribute('name', name)
  inputEl.setAttribute('type', opts.type)

  return [labelEl, inputEl]
}

/**
 * Toggle between login and register
 */
const toggleForm = () => {
  if (CURRENT_MODE === 1) {
    CURRENT_MODE = 0
    createLoginForm()
  } else {
    CURRENT_MODE = 1
    createRegisterForm()
  }
}

/**
 * Send login request
 * @param {FormData} data
 */
const handleLogin = async (data) => {
  const body = JSON.stringify({
    email: data.get('email'),
    password: data.get('password')
  })

  const res = await fetch('http://127.0.0.1:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  const resBody = await res.json()
  if (!res.ok) {
    throw resBody
  }
}

/**
 * Send register request
 * @param {FormData} data
 */
const handleRegister = async (data) => {
  const body = JSON.stringify({
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
    'repeat-password': data.get('repeat-password')
  })

  const res = await fetch('http://127.0.0.1:4000/auth/register', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  const resBody = await res.json()
  if (!res.ok) {
    throw resBody
  }
}

/**
 *
 * @param {SubmitEvent} e
 */
const handleSumbit = async (e) => {
  e.preventDefault()
  errorNode.innerHTML = ''
  const data = new FormData(e.currentTarget)
  try {
    if (CURRENT_MODE === 0) {
      await handleLogin(data)
    } else {
      await handleRegister(data)
    }
  } catch (err) {
    errorNode.innerHTML = err.message
  }
}

/**
 * Login form
 */
const createLoginForm = () => {
  root.innerHTML = ''
  errorNode = root.appendChild(errorEl)

  const formEL = document.createElement('form')
  formEL.addEventListener('submit', handleSumbit)

  const toggleModebuttonEL = document.createElement('button')
  toggleModebuttonEL.textContent = 'register'
  toggleModebuttonEL.addEventListener('click', toggleForm)

  const submitButtonEL = document.createElement('button')
  submitButtonEL.textContent = 'login'

  formEL.append(
    ...createInput('email', {
      // type: 'email',
    }),
    ...createInput('password', {
      type: 'password'
    }),
    submitButtonEL
  )

  root.append(formEL, toggleModebuttonEL)
}

/**
 * Register form
 */
const createRegisterForm = () => {
  root.innerHTML = ''
  errorNode = root.appendChild(errorEl)

  const formEL = document.createElement('form')
  formEL.addEventListener('submit', handleSumbit)

  const toggleModebuttonEL = document.createElement('button')
  toggleModebuttonEL.textContent = 'login'
  toggleModebuttonEL.addEventListener('click', toggleForm)

  const submitButtonEL = document.createElement('button')
  submitButtonEL.textContent = 'register'

  formEL.append(
    ...createInput('name'),
    ...createInput('email'),

    ...createInput('password', {
      type: 'password'
    }),
    ...createInput('repeat-password', {
      type: 'password'
    }),
    submitButtonEL
  )

  root.append(formEL, toggleModebuttonEL)
}

/**
 * Init first form
 */
createLoginForm()
