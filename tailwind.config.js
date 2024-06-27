/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#ff0000",
        'secondary':"#00ff00",
        'tertiary':"#0000ff",
        'background':"#111111",
        'error':"#fff000"
      },
    },
  },
  plugins: [],
};
