const express = require('express');
const cors = require('cors');
const app = express();
const authenticate = require('./auth/authenticate');


require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/*async function main() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  global.db = connection;
}

main().catch(console.error);*/

app.use('/api/signup', require('./routes/signup'));
app.use('/api/signout', require('./routes/signout'));
app.use('/api/login', require('./routes/login'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/todos',authenticate, require('./routes/todos'));
app.use('/api/user',authenticate, require('./routes/user'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});