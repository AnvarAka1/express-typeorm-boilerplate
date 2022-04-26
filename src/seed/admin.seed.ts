import { hash } from 'bcrypt'

import { UserEntity } from 'src/entities/user.entity'
import { ADMIN_TYPE } from 'src/constants/roles'
import AppDataSource from 'src/data-source'

import adminFixture from './fixtures/admin.fixture.json'

export default async () => {
  const userRepository = AppDataSource.getRepository(UserEntity)

  const adminUser = await userRepository.findOne({ where: { role: ADMIN_TYPE } })
  if (!adminUser) {
    const hashedPassword = await hash(process.env.ADMIN_PASSWORD!, 12)

    const newAdminUser = userRepository.create({
      ...adminFixture,
      password: hashedPassword
    })

    await userRepository.save(newAdminUser)
  }
}
