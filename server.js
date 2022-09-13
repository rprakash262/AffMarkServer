const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use('/uploads', express.static('uploads'));

const api = require('./routes');
const db = require('./config/keys').mongoURI;

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to db
mongoose
  .connect(db)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error while connecting to database', err));

app.use('/', api);

// serve static asset if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
