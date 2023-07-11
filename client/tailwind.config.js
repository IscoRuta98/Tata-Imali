/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--ion-color-primary)",
        secondary: "var(--ion-color-secondary)",
        tertiary: "var(--ion-color-tertiary)",
        success: "var(--ion-color-success)",
        warning: "var(--ion-color-warning)",
        danger: "var(--ion-color-danger)",
        dark: "var(--ion-color-dark)",
        medium: "var(--ion-color-medium)",
        light: "var(--ion-color-light)",
        background: "var(--ion-color-background)",
      },
    },
  },
  plugins: [],
}

