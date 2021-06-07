require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const middlewares = require('./middlewares')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// Basic Configuration
const port = "3000";


app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", (req, res) => {
  
  let url = req.body.url
  let regex = /^(http|https)(:\/\/)/;

  let isValidURL = middlewares.validateUrl(url) && regex.test(url)
  isValidURL
  ? middlewares.shortenUrl(req, res)
  : res.json({ error: 'invalid url' })
})

app.get("/api/shorturl/:short_url", (req, res) => {
  middlewares.redirectToOriginal(req, res)
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
