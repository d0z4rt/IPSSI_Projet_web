const root = document.querySelector('#root')
if (!root) {
  throw new Error('root element missing')
}

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

const login = async (data) => {
  const _data = JSON.stringify({
    email: 'test@test.test',
    password: 'StrongPassword1'
  })

  const res = await fetch('http://127.0.0.1:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: _data
  })
}

/**
 *
 * @param {SubmitEvent} e
 */
const handleSumbit = (e) => {
  e.preventDefault()
  const data = new FormData(e.currentTarget)

  if (CURRENT_MODE === 0) {
    login(data)
  } else {
    register(data)
  }
}

/**
 * Login form
 */
const createLoginForm = () => {
  root.innerHTML = ''

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
      onChange: (e) => {
        console.log(e)
      }
    }),
    ...createInput('password'),
    submitButtonEL
  )

  root.append(formEL, toggleModebuttonEL)
}

/**
 * Register form
 */
const createRegisterForm = () => {
  root.innerHTML = ''

  const formEL = document.createElement('form')
  formEL.addEventListener('submit', handleSumbit)

  const toggleModebuttonEL = document.createElement('button')
  toggleModebuttonEL.textContent = 'login'
  toggleModebuttonEL.addEventListener('click', toggleForm)

  const submitButtonEL = document.createElement('button')
  submitButtonEL.textContent = 'register'

  formEL.append(
    ...createInput('name'),
    ...createInput('repeat-password'),
    ...createInput('repeat-password'),
    ...createInput('password'),
    submitButtonEL
  )

  root.append(formEL, toggleModebuttonEL)
}

/**
 * Init first form
 */
createLoginForm()
