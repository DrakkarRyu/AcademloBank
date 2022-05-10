const express = require('express');
const cors = require('cors');

//Importing global error controller

const { globalErrorHandler } = require('./controllers/errors.controller');

//Routers
const { usersRouter } = require('./routes/users.routes');

//Init express app
const app = express();

//For to enable cors
app.use(cors());

//For to enable incoming JSON data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', usersRouter);

//Global error controller app
app.use('*', globalErrorHandler);

module.exports = { app };
