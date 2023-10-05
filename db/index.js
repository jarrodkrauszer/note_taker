const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, './db.json')

function getData() {
  const json = fs.readFileSync(dbPath,'utf-8');

  return JSON.parse(json);
}

function writeData(data) {
  fs.writeFile(dbPath, JSON.stringify(data, null, 2), () => {
    console.log('DB updated successfully');
  });
}

module.exports = { getData, writeData }