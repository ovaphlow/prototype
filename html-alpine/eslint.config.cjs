/** @type { import("eslint").Linter.Config } */
module.exports = {
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2021
	},
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	ignorePatterns: ['node_modules', 'dist', '.env', 'package-lock.json']
};
