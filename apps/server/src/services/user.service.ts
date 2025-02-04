export type TUser = {
  id: string
  name: string
  email: string
  password: string
}

type TCreateUserDto = {
  name: string
  email: string
  password: string
}

/**
 * ! Fake database
 * ! cleared everytime the server is stopped
 */
const users: TUser[] = []

/**
 *
 * @param dto
 * @returns
 */
export const create = async (dto: TCreateUserDto) => {
  // Check if an user already exists with this email
  const userIndex = users.findIndex((u) => u.email === dto.email)
  if (userIndex !== -1) {
    throw new Error('User already exists')
  }

  // hash the password (fake)
  dto.password += 'CRODE_PWOA'

  const user = { id: users.length.toString(), ...dto }
  users.push(user)
  return user
}

/**
 *
 * @param id
 * @returns
 */
export const findOneById = async (id: string) => {
  const user = users.find((u) => u.id === id)
  return user
}

/**
 *
 * @param email
 * @returns
 */
export const findOneByEmail = async (email: string) => {
  const user = users.find((u) => u.email === email)
  if (!user) throw new Error('user not found')
  return user
}

/**
 *
 * @param clearPassword
 * @param hashedPassword
 * @returns
 */
export const verifyPassword = async (
  clearPassword: string,
  hashedPassword: string
) => {
  const _clearPassword = `${clearPassword}CRODE_PWOA`

  if (_clearPassword !== hashedPassword) {
    throw new Error("Password doesn't match")
  }
  return true
}
