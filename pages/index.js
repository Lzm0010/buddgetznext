import {useEffect, useContext, useState} from 'react';
import {table, categories_table, minifyRecords} from './api/utils/Airtable';
import Navbar from '../components/Navbar';
import Budget from '../components/Budget';
import {LineItemsContext} from '../contexts/lineItemsContext';
import auth0 from './api/utils/auth0';
import plaid from 'plaid';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


export default function Home({initialLineItems, user, token, categories}) {
  const {lineItems, setLineItems} = useContext(LineItemsContext);
  // const [month, setMonth] = useState(new Date().getMonth() +1)

  useEffect(() => {
    setLineItems(initialLineItems);
  }, [])

  return (
    <main>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Navbar user={user} token={token}/>
          </Grid>
          <Grid item xs={12}>
            {
              user && (
                <Grid>
                  <Budget lineItems={lineItems} categories={categories} />
                </Grid>
              )
            }
            {!user && <p>Login in to save your budgets!</p>}
          </Grid>

        </Grid>
      </Container>
    </main>
  )
}

export async function getServerSideProps(context){
  const session = await auth0.getSession(context.req);
  let lineItems = [];
  let categories = [];
  const client = new plaid.Client({
    clientID: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: plaid.environments.sandbox,
  });
  let link_token = null;

  try {
    if (session?.user){
      lineItems = await table.select({
        filterByFormula: `userId = '${session.user.sub}'`
      }).all();

      categories = await categories_table.select({}).all();

      const linkTokenResponse = await client.createLinkToken({
        user: {
          client_user_id: session?.user.sub,
        },
        client_name: 'Buddgetz',
        products: ['transactions'],
        country_codes: ['US'],
        language: 'en',
      });
  
      link_token = linkTokenResponse.link_token;
    }

    return {
      props: {
        initialLineItems: minifyRecords(lineItems),
        categories: minifyRecords(categories),
        user: session?.user || null,
        token: link_token
      }
    }
  } catch (err){
    console.error(err);
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
}



 
    
