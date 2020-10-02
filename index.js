// import header from 'views/header.js';
const express = require('express');

const app = express();

// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const e = require('express');
const { strict } = require('assert');
const path = require('path');
const {google} = require('googleapis');



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views/static"));


// go below for writing the data

// Writing the data into the spreadsheets

let count = 2;

let register = 2;

async function writeData(arr){
    const auth = await new google.auth.GoogleAuth({
        keyFile: './key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    const sheets = await google.sheets({version: 'v4', auth: auth});

    await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: '1pK1VKKGF7pGbhPzDZnh39nEDGylWZ5zxEduha1xtzIM',

            requestBody: {
                data: [
                    {
                        range: `Sheet1!A${count}:D${count}`,
                        majorDimension: "COLUMNS",
                        values: arr
                    }
                ],
                valueInputOption: "USER_ENTERED"
            }
    }
    );
            count += 1;
}


// Below is for updating the registartions data 

async function registerData(arr){
    const auth = await new google.auth.GoogleAuth({
        keyFile: './key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    const sheets = await google.sheets({version: 'v4', auth: auth});

    await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: '1lIjJeKrZaM2fuv_hJIZfjbtiCBw5qjSxpfRx98Gya20',

            requestBody: {
                data: [
                    {
                        range: `Sheet1!A${register}:D${register}`,
                        majorDimension: "COLUMNS",
                        values: arr
                    }
                ],
                valueInputOption: "USER_ENTERED"
            }
    }
    );
            register += 1;
}

app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req, res){
    res.render('index');
});

app.get("/contact", (req, res)=>{
    // res.sendFile(path.join(__dirname, "/views/static/main.html"))
    res.render('contact')
})

app.post('/', (req, res) => {
    console.log(req.body);

    let UserData = [[req.body.email], [req.body.firstname], [req.body.from], [req.body.msg]];
    writeData(UserData);
    res.render('index');
});

app.post('/register', (req,res)=>{
    console.log(req.body);

    let UserData = [/*  pass the request body parameters in each inside the array */];
    registerData(UserData);
    res.render('index');
})

app.listen(3000)





