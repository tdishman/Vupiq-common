module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    env: {
      es6: true,
      browser: true
    }
  },
  globals: {
    __DEV__: false
  },
  extends: ['prettier', 'prettier/react', 'prettier/standard'],
  plugins: ['react', 'standard', 'prettier'],
  rules: {
    'prettier/prettier': ['error']
  }
};
