module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
	// add your custom rules here
	rules: {
		'prefer-promise-reject-errors': 'off',

		// quotes: ['warn', 'single', { avoidEscape: true }],

		// The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
		// does not work with type definitions
		'no-unused-vars': 'off',
		// allow debugger during development only
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/multi-word-component-names': 'off',
		'no-mixed-spaces-and-tabs': 'off',
	},
};
