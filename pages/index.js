import {useEffect, useContext, useState} from 'react';
import {table, minifyRecords} from './api/utils/Airtable';
import Navbar from '../components/Navbar';
import Budget from '../components/Budget';
import LineItemForm from '../components/LineItemForm';
import {LineItemsContext} from '../contexts/lineItemsContext';
import PLink from '../components/PLink';
import auth0 from './api/utils/auth0';
import plaid from 'plaid';


export default function Home({initialLineItems, user, token}) {
  const {lineItems, setLineItems} = useContext(LineItemsContext);
  // const [month, setMonth] = useState(new Date().getMonth() +1)

  useEffect(() => {
    setLineItems(initialLineItems);
  }, [])

  return (
    <main>
      <Navbar user={user}/>
      {
        user && (
          <>
            <PLink token={token}/>
            <LineItemForm />
            <Budget lineItems={lineItems}/>
          </>
        )
      }
      {!user && <p>Login in to save your budgets!</p>}
    </main>
  )
}

export async function getServerSideProps(context){
  const session = await auth0.getSession(context.req);
  let lineItems = [];
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



 
    
