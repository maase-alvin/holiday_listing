const fs = require('node:fs/promises');

async function getStoredHolidays() {
  const rawFileContent = await fs.readFile('holidays.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedHolidays = data.holidays ?? [];
  return storedHolidays;
}

function storeHolidays(holidays) {
  return fs.writeFile('holidays.json', JSON.stringify({ holidays: holidays || [] }));
}

exports.getStoredHolidays = getStoredHolidays;
exports.storeHolidays = storeHolidays;