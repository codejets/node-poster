
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const dir = args[0];
const files = fs.readdirSync(dir);

files
  .forEach((file, index) => {
    const filePath = path.join(dir, file);
    const newFilePath = path.join(dir, `${index}.jpg`);

    fs.renameSync(filePath, newFilePath);
  });
