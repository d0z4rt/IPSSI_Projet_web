import database, { type TUser } from '../database'
import { validateEmail } from '../utils/validateEmail.util'
import { wait } from '../utils/wait.util'

type TCreateUserDto = {
  name: string
  email: string
  password: string
}

const UserService = () => {
  return {
    /**
     *
     * @param dto
     * @returns
     */
    create: async (dto: TCreateUserDto) => {
      //! fake delay
      await wait()

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

      // ! not using spread operator to avoid unwanted properties
      const user: TUser = {
        id: database.users.length.toString(),
        name: dto.name,
        email: dto.email,
        password: dto.password
      }
      database.users.push(user)
      return user
    },

    /**
     *
     * @param id
     * @returns
     */
    findOneById: async (id: string) => {
      //! fake delay
      await wait()

      const user = database.users.find((u) => u.id === id)
      if (!user) throw new Error('user not found')
      return user
    },

    /**
     *
     * @param email
     * @returns
     */
    findOneByEmail: async (email: string) => {
      //! fake delay
      await wait()

      const user = database.users.find((u) => u.email === email)
      if (!user) throw new Error('user not found')
      return user
    },

    /**
     *
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
