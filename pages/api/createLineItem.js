import {table} from './utils/Airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async(req, res) => {
  const {description, date, total, category, itemType, subcategory, transactionId} = req.body;
  const {user} = await auth0.getSession(req);

  try {
    const records = await table.create([
      {fields: {
        description, 
        date, 
        total, 
        category, 
        itemType, 
        subcategory, 
        userId: user.sub,
        transactionId
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
});