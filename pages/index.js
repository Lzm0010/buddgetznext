import {useEffect, useContext} from 'react';
import {table, minifyRecords} from './api/utils/Airtable';
import Navbar from '../components/Navbar';
import LineItemForm from '../components/LineItemForm';
import {LineItemsContext} from '../contexts/lineItemsContext';
import LineItem from '../components/LineItem';
import auth0 from './api/utils/auth0';


export default function Home({initialLineItems, user}) {
  const {lineItems, setLineItems} = useContext(LineItemsContext);

  useEffect(() => {
    setLineItems(initialLineItems);
  }, [])

  return (
    <main>
      <Navbar user={user}/>
      {
        user && (
          <>
            <LineItemForm />
            <ul>
              {lineItems && lineItems.map(lineItem => (
                <LineItem key={lineItem.id} lineItem={lineItem}/>
              ))}
            </ul>
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

  try {
    if (session?.user){
      lineItems = await table.select({
        filterByFormula: `userId = '${session.user.sub}'`
      }).all();
    }

    return {
      props: {
        initialLineItems: minifyRecords(lineItems),
        user: session?.user || null
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