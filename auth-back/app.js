const express = require('express');
const cors = require('cors');
const app = express();
const authenticate = require('./auth/authenticate');
const sequelize = require('./lib/database');


require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/signup', require('./routes/signup'));
app.use('/api/signout', require('./routes/signout'));
app.use('/api/login', require('./routes/login'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/todos',authenticate, require('./routes/todos'));
app.use('/api/user',authenticate, require('./routes/user'));
app.use('/api/verify', require('./routes/verifyEmail'));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});