const express = require('express');
const cors = require('cors');
const app = express();
const authenticate = require('./auth/authenticate');
const {models} = require('./models/init-models');

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
app.use('/api/eventos', require('./routes/eventos'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/createEvent', require('./routes/createEvent'));
app.use('/api/comentarios', require('./routes/comentarios'));
app.use('/api/favoritos', require('./routes/favoritos'));



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});