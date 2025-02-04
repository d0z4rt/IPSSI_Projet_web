import UserService from './user.service'

type TRegisterDto = {
  name: string
  email: string
  password: string
}

type TLoginDto = {
  email: string
  password: string
}

const AuthService = () => {
  const userService = UserService()

  return {
    register: async (dto: TRegisterDto) => {
      const user = await userService.create(dto)
      const { password, ...publicUser } = user
      return publicUser
    },
    login: async (dto: TLoginDto) => {
      // ! Try catch here to hide what went wrong (prevents brutforce)
      try {
        const user = await userService.findOneByEmail(dto.email)
        await userService.verifyPassword(dto.password, user.password)
        const { password, ...publicUser } = user
        return publicUser
      } catch (err) {
        throw new Error('Email or password incorrect')
      }
    }
  }
}

export default AuthService
