import AppDataSource from 'src/data-source'
import { UserEntity } from 'src/entities/user.entity'

const key = 'user'
export const getUser = (userId: number, selects: string[] = []) => {
  const newSelect = selects.map(select => `${key}.${select}`)

  return AppDataSource.getRepository(UserEntity)
    .createQueryBuilder(key)
    .where(`${key}.id = :userId`, { userId })
    .addSelect(newSelect)
    .getOneOrFail()
}
