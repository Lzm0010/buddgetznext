import {useEffect, useContext} from 'react';
import {table, minifyRecords} from './api/utils/Airtable';
import Navbar from '../components/Navbar';
import LineItemForm from '../components/LineItemForm';
import {LineItemsContext} from '../contexts/lineItemsContext';
import LineItem from '../components/LineItem';


export default function Home({initialLineItems}) {
  const {lineItems, setLineItems} = useContext(LineItemsContext);

  useEffect(() => {
    setLineItems(initialLineItems);
  }, [])

  return (
    <main>
      <Navbar />
      <LineItemForm />
      <ul>
        {lineItems && lineItems.map(lineItem => (
          <LineItem key={lineItem.id} lineItem={lineItem}/>
        ))}
      </ul>
    </main>
  )
}

export async function getServerSideProps(context){
  let lineItems = [];

  try {
    lineItems = await table.select({}).all();

    return {
      props: {
        initialLineItems: minifyRecords(lineItems)
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