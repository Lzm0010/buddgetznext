import {table} from './utils/Airtable';

export default async(req, res) => {
  const {description, date, total, category, itemType, subcategory} = req.body;
  try {
    const records = await table.create([
      {fields: {
        description, date, total, category, itemType, subcategory
      }}
    ]);
    const record = {
      id: records[0].id,
      fields: records[0].fields
    }
    res.statusCode = 200;
    res.json(record);
  } catch (err) {
    res.statusCode = 500;
    res.json({msg: 'something went wrrong'});
  }
}