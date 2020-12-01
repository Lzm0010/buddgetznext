import {table, getMinifiedRecord} from './utils/Airtable';
import OwnsRecord from './middleware/OwnsRecord';
// import auth0 from './utils/auth0';

export default OwnsRecord(async(req, res) => {
  const {id} = req.body;
  // const {user} = await auth0.getSession(req);

  try {
    const records = await table.destroy([id]);
    res.statusCode = 200;
    res.json(getMinifiedRecord(records[0]));
  } catch (err) {
    res.statusCode = 500;
    res.json({msg: 'something went wrrong'});
  }
});