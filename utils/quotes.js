const fs = require('fs');

// membuat folder jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

// membuat  file quotes.json di dalam folder data jika belum ada
const dataPath = './data/quotes.json';
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadQuote = () => {
  const fileBuffer = fs.readFileSync('data/quotes.json', 'utf-8');
  const quotes = JSON.parse(fileBuffer);
  return quotes;
}

const findQuote = (author) => {
  const quotes = loadQuote();
  const quote = quotes.find((quote) => quote.author === author);
  return quote;
};

// menimpa file quotes.js dengan data yang baru
const saveQuotes = (quotes) => {
  fs.writeFileSync('data/quotes.json', JSON.stringify(quotes));
}

// menambahkan data baru
const addQuote = (quote) => {
  const quotes = loadQuote();
  quotes.push(quote);
  saveQuotes(quotes);
}

module.exports = { loadQuote, findQuote, addQuote }