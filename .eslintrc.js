module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        printWidth: 120,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        endOfLine: 'auto',
      },
    ],
    'no-prototype-builtins': 0,
  },
  plugins: ['prettier'],
};
