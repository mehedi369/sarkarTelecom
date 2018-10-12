const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const express = require('express');
const morgan = require('morgan');

// Own modules
const User = require('./models/User');

// Init express
const app = express();

//  Database connectivity
mongoose.connect('mongodb://root:mehedi432@ds125693.mlab.com:25693/sarkartelecom', { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log("Connected to the database.");
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//  CRUD operations  
//  Collecting Data

// Register and Login
app.get('/create-user', (req, res) => {
    res.send('Register Page');
});

app.post('/create-user', (req, res, next) => {
    let user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save((err) => {
        if (err) return next(err);
        res.json("Successfully created a new user.");
    });
});

app.get('/login', (req, res) => {
    res.send("Login page");
});


//  Main traveling routes
app.get('/', (req, res) => {
    res.render('main/home');
});

app.get('/about', (req, res) => {
    res.render('main/about');
});

app.get('/xiaomi', (req, res) => {
    res.send('Xiaomi');
});

app.get('/oppo', (req, res) => {
    res.send('Oppo');
});

app.get('/huawei', (req, res) => {
    res.send('Huawei');
});

app.get('/price-list', (req, res) => {
    res.send('Price List');
});





const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Boss! Server is running on ${port}`);
});