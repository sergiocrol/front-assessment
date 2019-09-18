module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    "indent": [
      2,
      2
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
}
