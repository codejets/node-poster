const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const poster = require('./poster');
const async = require('async');

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


function addPosters(from, to, transformedAuthors) {
  console.log('###### '+to+' #######');
  for (let index = from; index < to; index++) {
    const element = quotes[index];
    createPoster(sanitizeQuote(element.quote), element.author, index, transformedAuthors[element.author])
  }
}

function createPoster(quote, author, index, authorId) {
  poster.createPoster({quote: '“ ' + quote + '”.', author:author}, { index: index }, authorId, `${index}-${author.replace(/ /g,"_")}--Customer-service-quotes`);
}

function sanitizeQuote(quote) {
    const lastString = quote.split("")[quote.length-1];
    if(lastString === '.') {
      return quote.substring(0, quote.length - 1) + " ";
    }else {
      return quote;
    }
}

addPosters(2700, 3000, transformedAuthors),
console.log('done till 2400')