const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require ('mongoose');

const mongoUri = 'mongodb+srv://root:root@cluster0-orodv.gcp.mongodb.net/test?retryWrites=true&w=majority';
const connectDB = () =>
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
        .then(() => console.log('Connected'))
        .catch(() => console.log('Failed to connect DB!!!'));

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const{ 
    userList,
    getUserById,
    addUser,
    editUser,
    deleteUser,
} = require('./modules/users');

const{ 
    login,
} = require('./modules/auth');

app.post('/login',login);

app.get('/users',userList);

app.get('/users/:id',getUserById);

app.put('/users/:id',editUser);

app.post('/users', addUser);

app.delete('/users/:id', deleteUser);

app.listen(4500, () => {
    console.log('Success listened');
});