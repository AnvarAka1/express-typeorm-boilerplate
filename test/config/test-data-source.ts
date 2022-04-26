import path from 'path'

import { DataSource } from 'typeorm'

const TestDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.DATABASE_PASSWORD,
  database: 'course-testing',
  logging: false,
  synchronize: true,
  subscribers: [],
  migrations: [],
  entities: [
    path.resolve(__dirname, '..', '..', 'src', 'entities/*.ts')
  ]
})

export default TestDataSource
