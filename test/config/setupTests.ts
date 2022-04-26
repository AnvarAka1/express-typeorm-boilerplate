import { QueryRunner } from 'typeorm'

import seeds from 'src/seed'

import TestDataSource from '../config/test-data-source'

let queryRunner: QueryRunner

beforeAll(async () => {
  await TestDataSource.initialize()
  await seeds()
})

beforeEach(async () => {
  await seeds()
})

afterAll(async () => {
  await queryRunner.clearDatabase()
  await new Promise(resolve => setTimeout(() => resolve(''), 500))
})
