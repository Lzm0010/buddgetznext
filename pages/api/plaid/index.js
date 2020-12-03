import plaid from 'plaid';
import moment from 'moment';
import auth0 from '../utils/auth0';

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

export default auth0.requireAuthentication(async (req, res) => {
  const PUBLIC_TOKEN = req.body.public_token;
  try {
    client.exchangePublicToken(PUBLIC_TOKEN,function (error, tokenResponse) {
      if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + JSON.stringify(error));
        return res.json({
          error: msg,
        });
      }
      const ACCESS_TOKEN = tokenResponse.access_token;
      const ITEM_ID = tokenResponse.item_id;
      console.log(tokenResponse);
      let startDate = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
      let endDate = moment().format("YYYY-MM-DD");

      client.getTransactions(
        ACCESS_TOKEN,
        startDate,
        endDate,
        {}, 
        function(error, transactionsResponse) {
          const { transactions } = transactionsResponse;
          // TRANSACTIONS LOGGED BELOW 
          console.log('transactions:', transactions);
          res.json({
            ok: true,
            message: 'Success!',
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID,
            transactions: transactions
          })
          
        })
      // res.json({
      //   access_token: ACCESS_TOKEN,
      //   item_id: ITEM_ID,
      //   error: false,
      // });
    });
  } catch(err) {
    return res.send({error: err.message});
  }
});