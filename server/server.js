const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const {spawn} = require('child_process');
const path = require('path');
const controller = require('./controllers/graph.controller');
const fs = require('fs');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// required routes:

// fossil fuel usage route. querry parameters: country(string, mandatory). Method: get.
// sustainable energy consumptions. querry parameters: year(4 digit integer, mandatory), up to 4 countries(strings, mandatory). method: get.
// Canada and the top 5 countries in terms of greenhouse gas emissions, population or GDP in 2020 and then for the past 10 years. querry parameters: year (int of 4 digits, optional). Method: get.
// meaningful data graph. querry parameters to be determined, if any. Method: get.

app.get('/', function(req, res) {
    res.send('Server is up and running.')
})

app.get('/fossil_fuel', async function(req, res) {
    // get the country
    const country = req.query.country

    // check if the country is entered
    if(!country) {
        res.status(400).send({'message': 'missing country parameter.'});
        return
    }

    try{
        python_output = await controller.get_fossil_fuel_image(country);
        
        const imagePath = path.resolve(__dirname, python_output.slice(0, -2));

        // create new promise and wait for it to end. Await keyword is not enough for some reason.
        await new Promise((resolve, reject) => {
            res.sendFile(imagePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // delete the file
        fs.unlinkSync(imagePath)
    }catch(e) {
        res.send({'message': e});
    }

});

app.get('/sustainable_energy', async function(req, res) {
    // get the year and countries from parameters
    const year = req.query.year
    const countries = req.query.countries

    // checking if the year or countries parameters exists
    if(!year){
        res.status(400).send({'message': 'missing year parameter.'});
        return;
    }
    if(!countries){
        res.status(400).send({'message': 'missing countries parameter.'});
        return;
    }

    // formatting/getting the countries
    const tokens = countries.split(',')
    if(tokens.length > 4){
        res.status(400).send({'message': 'too many countries. Please enter up to 4.'});
        return;
    }

    // checking year format
    regex = /^\d{4}$/
    if(!regex.test(year)){
        res.status(400).send({'message': 'invalid year format: ' + year});
        return;
    }

    

    try{
        python_output = await controller.get_sustainable_energy_image(year, countries);
        
        const imagePath = path.resolve(__dirname, python_output.slice(0, -2));

        // create new promise and wait for it to end. Await keyword is not enough for some reason.
        await new Promise((resolve, reject) => {
            res.sendFile(imagePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // delete the file
        fs.unlinkSync(imagePath)
    }catch(e) {
        res.send({'message': e});
    }
});

app.get('/greenhouse_emisions', async function(req, res) {
    const year = req.query.year; // The end year parameter
    const mode = req.query.mode; // The param parameter ('greenhouse_gas_emissions', 'population', 'gdp', etc.)

    if(!year){
        res.status(400).send({message: 'Missing year parameter'});
        return;
    }

    if(!mode){
        res.status(400).send({message: 'Missing mode parameter'});
        return;
    }

    try{
        python_output = await controller.run_graph3(mode, year)
        const imagePath = path.resolve(__dirname, python_output.slice(0, -2));

        // create new promise and wait for it to end. Await keyword is not enough for some reason.
        await new Promise((resolve, reject) => {
            res.sendFile(imagePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // delete the file
        fs.unlinkSync(imagePath)
    }catch(e){
        res.send({'message': e.toString()});
    }

});

app.get('/per_capita_electricity', async function (req, res) {
    const country = req.query.country;

    if(!country) {
        res.status(404).send({ 'message': 'Missing country parameter'});
    }
    try{
        python_output = await controller.run_graph4(country)
        const imagePath = path.resolve(__dirname, python_output.slice(0, -2));

        // create new promise and wait for it to end. Await keyword is not enough for some reason.
        await new Promise((resolve, reject) => {
            res.sendFile(imagePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // delete the file
        fs.unlinkSync(imagePath)
    }catch(e){
        res.send({'message': e.toString()});
    }
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server listening on port " + port)
});