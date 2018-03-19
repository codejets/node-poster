const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const poster = require('./create-poster');

const options = { delimiter : ',', quote : '"' };

function getCsvData(filename) {
  return fs.readFileSync(path.join(__dirname, `csv/${filename}.csv`), { encoding : 'utf8'})	
}

const quotes = csvjson.toObject(getCsvData('quotes'), {...options, headers : "quote,author"});
quotes.shift()

const authors = csvjson.toSchemaObject(getCsvData('authors'), {...options, headers : "author,id"});
const transformedAuthors = authors.reduce(function(result, item, index, array) {
  result[item.author] = index;
  return result;
}, {}) 

for (let index = 0; index < 60; index++) {
  const element = quotes[index];
  createPoster(element.quote, element.author, index, transformedAuthors[element.author])
}

function createPoster(quote, author, index, authorId) {
  poster.createPoster({quote: '“ ' + quote + '”.', author:author}, { index: index }, authorId, `${quote.substring(0, 40).replace(/ /g,"_")}-${author.replace(/ /g,"_")}`);
}
