import database, { type TUser } from '../database'
import { validateEmail } from '../utils/validateEmail.util'
import { wait } from '../utils/wait.util'

type TCreateUserDto = {
  name: string
  email: string
  phone: string
  street: string
  'postal-code': number
  city: string
  password: string
}

/**
 * Provides methods for manipulating the users database
 * @returns
 */
const UserService = () => {
  return {
    /**
     * Create an user
     * @param dto
     * @returns the created user
     */
    create: async (dto: TCreateUserDto) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      // check email format
      if (!validateEmail(dto.email)) {
        throw new Error('Wrong email format')
      }

      // Check if an user already exists with this email
      const userIndex = database.users.findIndex((u) => u.email === dto.email)
      if (userIndex !== -1) {
        throw new Error('User already exists')
      }

      // hash the password (fake)
      dto.password += 'CRODE_PWOA'

      // ! not using the spread operator to avoid unwanted properties
      const user: TUser = {
        id: database.users.length.toString(),
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password: dto.password,
        street: dto.street,
        'postal-code': dto['postal-code'],
        city: dto.city
      }

      // add the user
      database.users.push(user)
      return user
    },

    /**
     * Find one user by id
     * @param id
     * @returns user
     */
    findOneById: async (id: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      const user = database.users.find((u) => u.id === id)
      if (!user) throw new Error('user not found')
      return user
    },

    /**
     * Find on user by email
     * @param email
     * @returns user
     */
    findOneByEmail: async (email: string) => {
      //! FIXME fake delay DEV ONLY
      await wait()

      const user = database.users.find((u) => u.email === email)
      if (!user) throw new Error('user not found')
      return user
    },

    /**
     * Check a clear password agaisnt a hashed one
     * ! FIXME: need to implement bcrypt or argon2
     * @param clearPassword
     * @param hashedPassword
     * @returns
     */
    verifyPassword: async (clearPassword: string, hashedPassword: string) => {
      const _clearPassword = `${clearPassword}CRODE_PWOA`

      if (_clearPassword !== hashedPassword) {
        throw new Error("Password doesn't match")
      }
      return true
    }
  }
}

export default UserService
