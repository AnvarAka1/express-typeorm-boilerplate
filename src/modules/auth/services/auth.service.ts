import { Request } from 'express'
import { compare, hash } from 'bcrypt'
import { validateOrReject } from 'class-validator'

import AppDataSource from 'src/data-source'
import { UserEntity } from 'src/entities/user.entity'
import { generateJwtToken } from 'src/libs/jwt'

export const signUp = async (req: Request<unknown, unknown, UserEntity>) => {
  const userRepository = AppDataSource.getRepository(UserEntity)

  const {
    email,
    password,
    role,
    description,
    firstName,
    lastName,
    phone
  } = req.body

  const existingUser = await userRepository.findOne({ where: { email } })

  if (existingUser) {
    throw Error('User already exists.')
  }

  const hashedPassword = await hash(password, 12)

  const user = userRepository.create({
    email,
    password: hashedPassword,
    role,
    description,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    phone
  })

  await validateOrReject(user)

  await AppDataSource.transaction(async transactionManager => {
    await transactionManager.save(user)
  })

  return {}
}

export const signIn = async (req: Request<unknown, unknown, UserEntity>) => {
  const { email, password } = req.body
  const userRepository = AppDataSource.getRepository(UserEntity)
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password')
    .getOneOrFail()

  const isPasswordMatch = await compare(password, user.password)
  if (!isPasswordMatch) {
    throw Error('Invalid email or password.')
  }

  const payload = { id: user.id, role: user.role }
  const token = generateJwtToken(payload)

  return { token }
}

export default { signUp, signIn }
