/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  setupFilesAfterEnv: ['<rootDir>/test/unit/jest-setup.ts'],
};