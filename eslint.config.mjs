import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default createConfigForNuxt()
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  })
  .append({
    name: 'prettier',
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierRecommended.rules,
    },
  })
