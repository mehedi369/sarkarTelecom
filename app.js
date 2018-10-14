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
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//  CRUD operations  
//  Collecting Data

// Register and Login
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);



//  Main traveling routes




const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Boss! Server is running on ${port}`);
});