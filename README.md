# Weather API Demo (Resume‑Ready)

A small React+Vite application that retrieves current weather and a short forecast from the OpenWeatherMap API. It is intended as a clean, feature‑rich example for showcasing on a portfolio or résumé.

## Features

The interface is organised as a lightweight dashboard:

1. **Header** – application title and subtitle.
2. **Search bar** – city lookup with history and validation.
3. **Main panel** – a Bootstrap row where:
   * left column is the current weather card with key metrics and sun times
   * right column is a line chart showing upcoming temperature trend
4. **Forecast strip** – a horizontally scrollable collection of day cards providing timing, temp, description, humidity and wind.
5. **Feedback elements** – loading spinner, error toast, alerts.

- Modular components and a custom hook (`useWeather`) for data fetching
- Responsive UI built with Bootstrap and simple custom styles
- Search history persisted in `localStorage`
- Loading indicator and error handling with user feedback
- Automatic detection of current location via browser geolocation
- Dashboard-style layout with bold, modern typography (Poppins) and glassmorphic panels inspired by high‑end showcase sites like Pouch
- Temperature forecast chart using Chart.js for visual trends
- Forecast summary cards with date/time, humidity and wind, presented in a horizontally scrollable strip
- API key injected via environment variable

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   npm install dayjs chart.js react-chartjs-2
   # to add optional libraries
   npm install react-toastify
   # unit testing (if you choose to)
   npm install -D jest @testing-library/react @testing-library/jest-dom
   ```

2. **Set the API key**

   Create a `.env` file in the project root containing:

   ```dotenv
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   ```

   Vite only exposes variables prefixed with `VITE_` to the client bundle.

3. **Start dev server**

   ```bash
   npm run dev
   ```

## Suggestions for a Resume Project

- Add visualizations (line/bar charts) to display forecast trends and historical data. A popular choice is [Chart.js](https://www.chartjs.org/) with `react-chartjs-2`.
- Convert to TypeScript and show type definitions for API responses
- Add comprehensive tests (unit + integration) using Jest/RTL
- Improve accessibility (ARIA roles, keyboard navigation)
- Implement geolocation, dark mode, or offline caching
- Deploy to Netlify/Vercel and include a live link in your résumé

---

The original Vite/React boilerplate README has been replaced with this project‑specific documentation.
