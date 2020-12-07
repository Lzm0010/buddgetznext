var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const table = base(process.env.AIRTABLE_TABLE_NAME);
const categories_table = base(process.env.AIRTABLE_TABLE2_NAME);

const getMinifiedRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields
  }
}

const minifyRecords = (records) => {
  return records.map(record => getMinifiedRecord(record));
}

export {table, categories_table, minifyRecords, getMinifiedRecord};