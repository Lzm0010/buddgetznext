import {useEffect, useContext, useState} from 'react';
import {table, minifyRecords} from './api/utils/Airtable';
import Navbar from '../components/Navbar';
import Budget from '../components/Budget';
import LineItemForm from '../components/LineItemForm';
import {LineItemsContext} from '../contexts/lineItemsContext';
import auth0 from './api/utils/auth0';


export default function Home({initialLineItems, user}) {
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