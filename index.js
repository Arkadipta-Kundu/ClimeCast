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

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { weather: undefined, news: undefined });
    // res.send("Hello World !");
});


app.post('/', async (req, res) => {
    const city = req.body.cityName ;
    try {
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`);
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=${newsApiKey}`);
        const weather = {
            temp: weatherResponse.data.main.temp,
            condition: weatherResponse.data.weather[0].description,
        };
        const news = newsResponse.data.articles.slice(0, 5);

        res.render('index', { weather, news });
    } catch (error) {
        console.error(error);
        res.render('index', { weather: null, news: null });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
