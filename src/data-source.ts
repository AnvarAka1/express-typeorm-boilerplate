import path from 'path'

import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'course',
  logging: false,
  synchronize: true,
  subscribers: [],
  migrations: [],
  entities: [
    path.resolve(__dirname, 'entities/*.ts')
  ]
})

export default AppDataSource
