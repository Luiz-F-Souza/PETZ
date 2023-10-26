import nextJest from "next/jest"
import "ts-jest"

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/components/$1',
    '^types/(.*)$': '<rootDir>/@types/$1'
  },
  preset: 'ts-jest'
}

module.exports = createJestConfig(customJestConfig)