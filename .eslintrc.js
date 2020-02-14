module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    /**
     * @description rules of eslint official
     */
    /**
     * @bug https://github.com/benmosher/eslint-plugin-import/issues/1282
     * "import/named" temporary disable.
     */
    'import/named': 'off',
    'import/export': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'error', // Allow single Named-export
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ], // https://eslint.org/docs/rules/no-unused-expressions

    /**
     * @description rules of @typescript-eslint
     */
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    /**
     * @description rules of eslint-plugin-react
     */
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ], // also want to use with ".tsx"
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/prop-types': 'off', // Is this incompatible with TS props type?

    /**
     * @description rules of eslint-plugin-react-hooks
     */
    'react-hooks/rules-of-hooks': 'error',

    /**
     * @description rules of eslint-plugin-prettier
     */
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
  },
}
