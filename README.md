# Weather and News Dashboard

## Project Description

**ClimeCast** is a web application built with Express.js that allows users to retrieve the current weather and recent news articles for a specified city. The app integrates the OpenWeather API and NewsAPI using Axios to fetch and display real-time data, providing an easy-to-use dashboard.

## Features

- Fetches real-time weather data using the OpenWeather API.
- Displays recent news articles using the NewsAPI.
- Simple and responsive UI built with Bootstrap.
  
## Technologies Used

- **Node.js**
- **Express.js**
- **EJS** for templating
- **Axios** for API requests
- **Bootstrap** for styling

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Arkadipta-Kundu/ClimeCast.git
   ```

2. Navigate to the project folder:

   ```bash
   cd ClimeCast
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file for your API keys:

   ```
   OPENWEATHER_API_KEY=your_openweather_api_key
   NEWSAPI_API_KEY=your_newsapi_key
   ```

5. Start the server:

   ```bash
   node index.js
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## API Integration

1. **OpenWeather API**: Provides real-time weather data for any location.
2. **NewsAPI**: Fetches the latest news articles related to the searched city.
