const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = 3000;

// Use morgan to log requests
app.use(morgan('combined'));

const weatherApiKey = process.env.OPENWEATHER_API_KEY;
const newsApiKey = process.env.NEWSAPI_API_KEY;

if (!weatherApiKey || !newsApiKey) {
    console.error('API keys are missing. Please set OPENWEATHER_API_KEY and NEWSAPI_API_KEY in your .env file.');
    process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Middleware to fetch weather data
const fetchWeather = async (city) => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`);
    return {
        temp: response.data.main.temp,
        condition: response.data.weather[0].description,
    };
};

// Middleware to fetch news data
const fetchNews = async (city) => {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=${newsApiKey}`);
    return response.data.articles.slice(0, 5);
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { weather: undefined, news: undefined });
});

app.post('/', async (req, res) => {
    const city = req.body.cityName;
    try {
        const [weather, news] = await Promise.all([fetchWeather(city), fetchNews(city)]);
        res.render('index', { weather, news });
    } catch (error) {
        console.error(error);
        res.render('index', { weather: null, news: null });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});