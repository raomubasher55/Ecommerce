require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser middleware

mongoose.connect("mongodb://localhost:27017/ecommerence")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');

app.use(express.static('public'));
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
  app.use(cors(corsOptions));
  
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);

const port = process.env.SERVER_PORT || 3000;
console.log(process.env.PORT);
app.listen(port, () => {
    console.log("Server is running in " + process.env.DEV_MODE + " mode on port " + port);
});
