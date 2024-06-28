const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const UserRouter = require('./routes/user'); 
const PostRouter = require('./routes/post'); 

const app = express();

app.use(express.json());
app.use(cors());

// Rotas sem token
app.post('/api/v1/login', UserApi.login);
app.post('/api/v1/user', UserApi.createUser);

// Rotas com token
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/post', PostRouter);

module.exports = app;
