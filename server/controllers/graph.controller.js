const {spawn} = require('child_process');

// This is probably the worst code I wrote in a while but I don't care, I gotta be done in a few hours.

// run the python script and return the std output, if there are no errors.
async function get_fossil_fuel_image(country) {
    // executing the python script
    const python = await spawn('python3', ['./Python_Scripts/graph1.py', country]); // execute the python script
    
    let std = ''; // the script's STD output
    let stderr = ''; // the scipt's error output, if there is any.

    // gets the scripts logs
    python.stdout.on('data', function(data) {
        console.log(`Python script output: ${data}`);
        std += data.toString();
    });

    python.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    // return a promise of the python logs, or an error if the python code can't execute properly.
    return new Promise((resolve, reject) => {
        python.on('close', (code) => {
            if (code === 0) {
                resolve(std);
            } else {
                reject('Error while running python code. console output: ' + stderr);
            }
        });
    });
}

async function get_sustainable_energy_image(year, countries){
    // creating the argument array 
    args = ['./Python_Scripts/graph2.py', year].concat(countries);
    // executing the python script
    const python = await spawn('python3', args); // execute the python script
    
    let std = ''; // the script's STD output
    let stderr = ''; // the script's error output, if there are any

    // gets the scripts logs
    python.stdout.on('data', function(data) {
        console.log(`Python script output: ${data}`);
        std += data.toString();
    });

    python.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    // return a promise of the python logs, or an error if the python code can't execute properly.
    return new Promise((resolve, reject) => {
        python.on('close', (code) => {
            if (code === 0) {
                resolve(std);
            } else {
                reject('Error while running python code. console output: ' + stderr);
            }
        });
    });
}

async function run_graph3(param, end_year){
    const python = await spawn('python3', ['./Python_Scripts/graph3.py', param, end_year]); // execute the python script

    let std = ''; // the script's STD output
    let stderr = ''; // the script's stderr output

    // gets the scripts logs
    python.stdout.on('data', function(data) {
        console.log(`Python script output: ${data}`);
        std += data.toString();
        console.log("qytr");
    });

    python.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    // return a promise of the python logs, or an error if the python code can't execute properly.
    return new Promise((resolve, reject) => {
        python.on('close', (code) => {
            if (code === 0) {
                resolve(std);
            } else {
                reject('Error while running python code. console output: ' + stderr);
            }
        });
    });

}

async function run_graph4(country){
    const python = await spawn('python3', ['./Python_Scripts/graph4.py', country]);

    let std = ''; // the script's STD output
    let stderr = ''; // the script's stderr output

    // gets the scripts logs
    python.stdout.on('data', function(data) {
        console.log(`Python script output: ${data}`);
        std += data.toString();
        console.log("qytr");
    });

    python.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    // return a promise of the python logs, or an error if the python code can't execute properly.
    return new Promise((resolve, reject) => {
        python.on('close', (code) => {
            if (code === 0) {
                resolve(std);
            } else {
                reject('Error while running python code. console output: ' + stderr);
            }
        });
    });
}

module.exports = {get_fossil_fuel_image, get_sustainable_energy_image, run_graph3, run_graph4,};