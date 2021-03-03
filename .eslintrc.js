module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parserOptions: { ecmaVersion: 8 },
    ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '*.js'],
    extends: ['eslint:recommended'],
    overrides: [
        // This configuration will apply only to TypeScript files
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            settings: { react: { version: 'detect' } },
            env: {
                browser: true,
                node: true,
                es6: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended', // TypeScript rules
                'plugin:react/recommended', // React rules
                'plugin:react-hooks/recommended', // React hooks rules
                'plugin:jsx-a11y/recommended', // Accessibility rules
                'plugin:prettier/recommended', // Prettier plugin
            ],
            rules: {
                'no-empty': [ // allow empty catch{} blocks
                    'error',
                    {
                        'allowEmptyCatch': true,
                    }
                ],
                'no-empty-pattern': 'off', // allow empty destructuring

                'react/prop-types': 'off', // no prop-types, use typescript instead
                'react/react-in-jsx-scope': 'off', // don't need to import "React"

                'jsx-a11y/anchor-is-valid': 'off', // incompatible with <Link />
                'jsx-a11y/click-events-have-key-events': 'off', // not compatible with semantic ui things
                'jsx-a11y/no-static-element-interactions': 'off', //
                
                '@typescript-eslint/explicit-function-return-type': 'off', // don't require an explitit return type
                '@typescript-eslint/explicit-module-boundary-types': [
                    'error',
                    {
                        'allowedNames': [
                            'render',
                            'componentDidMount', 'componentWillUnmount', 'componentDidUpdate',
                            'getInitialProps', 'getPageProps',
                        ],
                    },
                ],

                // use prettier from .prettierrc
                'prettier/prettier': [
                    'error',
                    {},
                    {
                        usePrettierrc: true
                    }
                ],
            },
        },
    ],
}
