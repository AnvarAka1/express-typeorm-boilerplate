import path from 'path'

import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver
} from 'typeorm-fixtures-cli'

import TestDataSource from 'test/config/test-data-source'

export const baseFixturesPath = path.resolve('test', 'e2e')

export const loadFixtures = async (fixturesPath: string): Promise<void> => {
  const loader = new Loader()
  loader.load(path.resolve(baseFixturesPath, fixturesPath))

  const resolver = new Resolver()
  const fixtures = resolver.resolve(loader.fixtureConfigs)

  const builder = new Builder(TestDataSource, new Parser())

  for (const fixture of fixturesIterator(fixtures)) {
    const repository = TestDataSource.getRepository(fixture.entity)
    const entity = await builder.build(fixture)
    await repository.save(entity)
  }
}
