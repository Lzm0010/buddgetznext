import {useEffect, useContext, useState} from 'react';
import {table, categories_table, minifyRecords} from './api/utils/Airtable';
import Navbar from '../components/Navbar';
import Budget from '../components/Budget';
import {LineItemsContext} from '../contexts/lineItemsContext';
import auth0 from './api/utils/auth0';
import plaid from 'plaid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  month: {
    textAlign: "center"
  },
}));


export default function Home({initialLineItems, user, token, categories, currentMonth}) {
  const classes = useStyles();
  const {lineItems, setLineItems} = useContext(LineItemsContext);
  const [month, setMonth] = useState(currentMonth);
 

  useEffect(() => {
    setLineItems(initialLineItems);
  }, [])

  const numToMonth = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }

  const prevMonth = () => {
    const newMonth = month !== 1 ? month - 1 : 12;
    setMonth(newMonth);
  }

  const nextMonth = () => {
    const newMonth = month !== 12 ? month + 1 : 1;
    setMonth(newMonth);
  }


  return (
    <main>
      <Container>
        <Grid container spacing={3} alignItems="center">

          {/* FIRST ROW - NAVBAR */}
          <Grid item xs={12}>
            <Navbar user={user} token={token}/>
          </Grid>

          {/* SECOND ROW - MONTH */}
          <Grid item xs={12} className={classes.month}>
            <Typography variant="h2">
              {numToMonth[month]}
            </Typography>
          </Grid>

          {/* THIRD ROW - MAIN CONTENT */}
          <Grid item xs={1}>
            <IconButton onClick={prevMonth}>
              <ArrowBackIosIcon fontSize="large"/>
            </IconButton>
          </Grid>

          <Grid item xs={10}>
            {
              user && (
              
                <Grid>
                  <Budget lineItems={lineItems} categories={categories} />
                </Grid>
              )
            }
            {!user && <p>Login in to save your budgets!</p>}
          </Grid>

          <Grid item xs={1}>
            <IconButton onClick={nextMonth}>
              <ArrowForwardIosIcon fontSize="large"/>
            </IconButton>
          </Grid>
          {/* END SECOND ROW - MAIN CONTENT */}

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
        token: link_token,
        currentMonth: new Date().getMonth() + 1,
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



 
    
