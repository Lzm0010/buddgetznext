import {table, minifyRecords} from './utils/Airtable';

export default async(req, res) => {
  try {
    const records = await table.select({}).all();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err){
    res.statusCode = 500;
    res.json({msg: 'something went wrong'})
  }

}