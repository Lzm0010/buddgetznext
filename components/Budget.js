import React from 'react';
import LineItem from './LineItem';
import {Grid, Paper, Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';

export default function Budget({lineItems, categories}) {

  const actualLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'actual'
  ));

  const projectedLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'projected'
  ));

  const displayCategories = () => {
    return categories.map(cat => (
      <Accordion key={cat.id}>
        <AccordionSummary expandIcon={<ExpandMore/>} aria-controls="panel1a-content">
          {cat.fields.name}
        </AccordionSummary>
        <AccordionDetails>
          {lineItems
            .filter(lineItem => lineItem.fields.subcategory === cat.fields.name)
            .map(lineItem => <LineItem key={lineItem.id} lineItem={lineItem} />)
          }
        </AccordionDetails>
      </Accordion>
    ))
  }

  const displayCategoriesDelta = () => {
    return categories.map(cat => <Paper key={`d-${cat.id}`}>{cat.fields.name}</Paper>)
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
              {displayCategoriesDelta()}
          </Grid>
      </Grid>
    </Paper>
  );
};