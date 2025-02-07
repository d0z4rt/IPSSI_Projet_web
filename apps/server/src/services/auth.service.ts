import UserService from './user.service'

type TRegisterDto = {
  name: string
  email: string
  phone: string
  street: string
  'postal-code': number
  city: string
  password: string
  'repeat-password': string
}

type TLoginDto = {
  email: string
  password: string
}

/**
 * Provides basic authentication mechanisms
 * @returns
 */
const AuthService = () => {
  const userService = UserService()

  return {
    /**
     * Regstire a new user
     * @param dto
     * @returns created user
     */
    register: async (dto: TRegisterDto) => {
      // check if the passwords provided by the user match
      if (dto.password !== dto['repeat-password']) {
        throw new Error("Password aren't matching")
      }
      const user = await userService.create(dto)
      // don't send back the user password
      const { password, ...publicUser } = user
      return publicUser
    },
    /**
     * Login an user
     * @param dto
     * @returns logged in user
     */
    login: async (dto: TLoginDto) => {
      // ! Try catch here to hide what went wrong (prevents brutforce)
      try {
        const user = await userService.findOneByEmail(dto.email)
        await userService.verifyPassword(dto.password, user.password)
        // don't send back the user password
        const { password, ...publicUser } = user
        return publicUser
      } catch (err) {
        throw new Error('Email or password incorrect')
      }
    }
  }
}

export default AuthService
