import pluginVue from 'eslint-plugin-vue'
import {
                    withVueTs,
                    vueTsConfigs,
} from '@vue/eslint-config-typescript'

export default withVueTs(
                    {
                                        ignores: [
                                                            'node_modules/**',
                                                            'dist/**',
                                                            'coverage/**',
                                                            'playwright-report/**',
                                                            'test-results/**',
                                        ],
                    },

                    pluginVue.configs['flat/essential'],

                    vueTsConfigs.recommended,

                    {
                                        rules: {
                                                            'vue/multi-word-component-names': 'off',
                                        },
                    },
)