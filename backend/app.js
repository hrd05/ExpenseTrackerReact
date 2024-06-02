const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const purchaseRoute = require('./routes/order');
const resetRoute = require('./routes/reset');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use(userRoute);
app.use(expenseRoute);
app.use(purchaseRoute);
app.use(resetRoute);


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('db connected');
        app.listen(3000);
    })
    .catch(err => console.log(err));





