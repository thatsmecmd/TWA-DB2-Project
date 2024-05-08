const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/database');
const {spawn} = require('child_process');
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// required routes:

// fossil fuel usage route. querry parameters: country(string, mandatory). Method: get.
// sustainable energy consumptions. querry parameters: year(4 digit integer, mandatory), up to 4 countries(strings, mandatory). method: get.
// Canada and the top 5 countries in terms of greenhouse gas emissions, population or GDP in 2020 and then for the past 10 years. querry parameters: year (int of 4 digits, optional). Method: get.
// meaningful data graph. querry parameters to be determined, if any. Method: get.

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/python_test_route', async function(req, res) {
    // get the country
    const country = req.query.country

    // spawn new child process to call the python script
    const python = await spawn('python', ['graph1.py', country]);
    
    python.on('close', (code) => {
        if (code === 0) {
            const imagePath = path.resolve(__dirname, 'image.png');
            res.sendFile(imagePath);
        } else {
            res.status(500).send({'error': 'Python script execution failed'});
        }
    });
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect()
    console.log("Server listening on port " + port)
})