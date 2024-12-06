module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',  
    '^.+\\.css$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!whatwg-fetch)" 
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'jest-transform-stub',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
}
