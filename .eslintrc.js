module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: ['./**/tsconfig.json']
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  plugins: [
    'react-hooks'
  ],
  extends: [
    'standard-with-typescript'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^jsx$'
      }
    ],
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typesript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/promise-function-async': 'off',

    'node/handle-callback-err': 'off',
    'node/no-callback-literal': 'off',

    'no-return-await': 'off',
    'no-case-declarations': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-optional-chain': 'off',
    'symbol-description': 'off',
    'no-template-curly-in-string': 'off',
    'spaced-comment': 'off',
    'no-fallthrough': 'off',
    'no-useless-escape': 'off'
  },
  overrides: [
    {
      files: ['**/translations/*.js'],
      extends: ['eslint:recommended'],
      env: {
        amd: true
      },
      plugins: ['import'],
      rules: {
        camelcase: 'off',
        'max-len': 'off',
        'quote-props': 'off',
        quotes: 'off',
        'no-useless-escape': 'off',
        semi: 'off',
        'eol-last': 'off',
        'comma-dangle': 'off',
        'key-spacing': 'off',
        'import/no-default-export': 'error',
        'import/no-named-export': 'error'
      }
    },
    {
      files: ['**/translations/default.ts'],
      extends: ['eslint:recommended'],
      rules: {
        camelcase: 'off',
        'max-len': 'off',
        'quote-props': 'off',
        quotes: 'off',
        'comma-dangle': 'off',
        'no-useless-escape': 'off'
      }
    }
  ]
}
