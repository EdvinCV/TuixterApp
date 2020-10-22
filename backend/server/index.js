// Express
const express = require('express');
const app = express();
const morgan = require('morgan');
// ENV
require('dotenv').config();
// DB Connection
const {dbconnection} = require('./config/dbconnection');

// Middlewares and routes
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', require('./components/users/userRouter'));


// DB connection
dbconnection();

app.listen(3001, (err) => {
    if(err){
        console.log(err);
        process.exit(1);
    }
    console.log(process.env.DB_PASS);
    console.log(`Server running at port: 3001`);
});