import React from 'react';
import LineItem from './LineItem';
import {Grid, Paper} from '@material-ui/core';

export default function Budget({lineItems, categories}) {

  const actualLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'actual'
  ));

  const projectedLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'projected'
  ));

  const displayCategories = () => {
    return categories.map(cat => <div key={cat.id}>{cat.fields.name}</div>)
  }

//   <div>
//   {lineItems && projectedLineItems.map(lineItem => (
//     <LineItem key={lineItem.id} lineItem={lineItem}/>
//   ))}
// </div>

  return (
    <Paper>
      <Grid 
        container
        justify="center"
        >
          <Grid item xs={4}>
            Projected
          </Grid>
          <Grid item xs={4}>
            Actual
          </Grid>
          <Grid item xs={2}>
            Delta
          </Grid>
      </Grid>
      <Grid
        container
      >
          <Grid item xs={4}> 
              <div>
                Income
              </div>
              <div>
                Expenses
              </div>
              {displayCategories()}
          </Grid>
          <Grid item xs={4}>
              <div>
                Income
              </div>
              <div>
                Expenses
              </div>
              {displayCategories()}
          </Grid>
          <Grid item xs={2}>
              <div>
                Income
              </div>
              <div>
                Expenses
              </div>
              {displayCategories()}
          </Grid>
      </Grid>
    </Paper>
  );
};