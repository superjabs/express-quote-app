const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// import utils / method
const { loadQuote, findQuote, addQuote, deleteQuotes, updateQuote } = require('./utils/quotes')

// use ejs view engine
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);

// Build in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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

// add new quote
app.get('/quote/add', (req, res) => {
  res.render('add-quote', {
    title: 'Add Quote',
    layout: 'layouts/main-layout'
  });
});

// get data from form 
app.post('/quote', (req, res) => {
  addQuote(req.body);
  res.redirect('/quote');
});

// delete quote
app.get('/quote/delete/:author', (req, res) => {
  const quote = findQuote(req.params.author);

  if(!quote){
    res.send('404');
  } else{
    deleteQuotes(req.params.author);
    res.redirect('/quote');
  }

});

// update quote
app.get('/quote/update/:author', (req, res) => {
  const quote = findQuote(req.params.author);

  res.render('Update-quote', {
    title: 'Update Quote',
    layout: 'layouts/main-layout',
    quote
  });
});

// update process
app.post('/quote/update', (req, res) => {
  updateQuote(req.body);
  res.redirect('/quote');
});

// get quote by author
app.get('/quote/:author', (req, res) => {
  const quote = findQuote(req.params.author);
  res.render('detail', {
    title: 'Quotes by ' + quote.author,
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