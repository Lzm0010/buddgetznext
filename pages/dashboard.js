import {useEffect} from 'react';
import {table, minifyRecords} from './api/utils/Airtable';


export default function Dashboard ({initialLineItems}) {
  return (
    <>
      <h1>Dashboard</h1>
      {console.log(initialLineItems)}
    </>
  )
};


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