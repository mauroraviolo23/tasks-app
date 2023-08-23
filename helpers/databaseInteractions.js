const fs = require('fs');

const file = './database/data.json';

const saveData = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDatabase = () => {
  if (!fs.existsSync(file)) return null;

  const data = fs.readFileSync(file, { encoding: 'utf-8' });
  const parsedData = JSON.parse(data);

  return parsedData;
};

module.exports = {
  saveData,
  readDatabase,
};
