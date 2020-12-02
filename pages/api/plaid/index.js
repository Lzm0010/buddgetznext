import plaid from 'plaid';
import moment from 'moment';
import auth0 from '../utils/auth0';

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

export default auth0.requireAuthentication(async (req, res) => {
  const {user} = await auth0.getSession(req);
  const clientUserId = user.sub;

  try {
    client.createLinkToken({
      user: {
        client_user_id: clientUserId,
      },
      client_name: 'Buddgetz',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    }, function (error, createTokenResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return res.json({
          error: error,
        });
      }
      res.statusCode = 200;
      res.json(createTokenResponse);
    });

  } catch(err) {
    return res.send({error: err.message});
  }
});