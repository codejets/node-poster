"use strict";

const fs = require("fs");
const poster = require('./poster');

function convertAllImagesToThumbnails() {
  const allThumbs = fs.readdirSync(__dirname + '/authors-avatar')
            .map(function(v) { 
              return { file: v, index: Number(v.slice(0, v.indexOf('.'))) }; 
            })
            .sort(function(a, b) { return a.index - b.index; })
            .map(function(v) { return v.file; });
            
  allThumbs.shift()
  allThumbs.forEach((file, index) => {
    poster.createThumbnail(__dirname + "/authors-avatar/" + file, file.slice(0, file.indexOf('.')), 60);
  })
}

convertAllImagesToThumbnails();