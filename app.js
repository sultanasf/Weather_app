const express = require('express')
const app = express()
const dotenv = require('dotenv')
const axios = require('axios')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

dotenv.config();

const port = process.env.PORT || 3000

app.get('/weather', async (req, res) => {
    try {
        const { data } = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.key_id}&q=${req.query.city}&aqi=yes`
        );
        res.render('index', { kota: data.location.name, suhu: data.current.temp_c});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server Running at Port ${port}`)
})