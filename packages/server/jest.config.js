/** @type {import('ts-jest').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
}
