const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// import utils / method
const { loadQuote, findQuote } = require('./utils/quotes')

// use ejs view engine
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);

// Build in Middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
  const nama = 'alfian';
  res.render('index', {
    nama,
    title: 'Home',
    layout: 'layouts/main-layout'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    layout: 'layouts/main-layout'
  });
});

app.get('/quote', (req, res) => {
  const quotes = loadQuote();
  res.render('quotes', {
    quotes,
    title: 'Quotes',
    layout: 'layouts/main-layout',
  });
});

app.get('/quote/:author', (req, res) => {
  const quote = findQuote(req.params.author);
  res.render('detail', {
    title: 'Quotes',
    layout: 'layouts/main-layout',
    quote
  });
});


app.use((req, res) => {
  res.status(404);
  res.send('Page Not Found :(');
});

app.listen(port, () => {
  console.log(`server running in port ${port} . . .`);
});