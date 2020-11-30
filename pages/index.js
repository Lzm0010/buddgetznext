import {table, minifyRecords} from './api/utils/Airtable';
import Navbar from '../components/Navbar';
import LineItemForm from '../components/LineItemForm';
import LineItem from '../components/LineItem';


export default function Home({initialLineItems}) {
  return (
    <main>
      <h1>Dashboard</h1>
      <Navbar />

      {initialLineItems.map(lineItem => <LineItem key={lineItem.id} lineItem={lineItem.fields}/>)}

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