import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./html/**/*.{html,js}'],
	theme: {
		extend: {}
	},
	plugins: [
		daisyui
	],
	daisyui: {
		themes: ['valentine', 'dracula']
	}
};
