const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


require('dotenv').config();

// connection
const key = process.env.MONGO_URI;
mongoose.connect(key, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database connected');
})

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})