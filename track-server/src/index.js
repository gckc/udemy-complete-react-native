require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb://localhost:27017/';
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo!');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to Mongo!', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Hi there, your email is: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
