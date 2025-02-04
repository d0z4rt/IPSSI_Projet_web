import { create, findOneByEmail, verifyPassword } from './user.service'

type TRegisterDto = {
  name: string
  email: string
  password: string
}

type TLoginDto = {
  email: string
  password: string
}

export const register = async (dto: TRegisterDto) => {
  const user = await create(dto)
  const { password, ...publicUser } = user
  return publicUser
}

export const login = async (dto: TLoginDto) => {
  // ! Try catch here to hide what went wrong (prevents brutforce)
  try {
    const user = await findOneByEmail(dto.email)
    await verifyPassword(dto.password, user.password)
    const { password, ...publicUser } = user
    return publicUser
  } catch (err) {
    throw new Error('Email or password incorrect')
  }
}
