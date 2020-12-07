import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LineItem from './LineItem';
import LineItemForm from './LineItemForm';
import {Grid, Paper, Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  headers:{
    textAlign: "center"
  },
  deltaContent: {
    display: "flex",
    flexGrow: 1,
    margin: "12px 0",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
  },
  delta: {
    borderRadius: 0,
    display: "flex",
    padding: "0px 16px",
    minHeight: "48px",
  },
}));

export default function Budget({lineItems, categories}) {
  const classes = useStyles();

  const actualLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'actual'
  ));

  const projectedLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'projected'
  ));

  const sum = (cat, filteredLineItems) => filteredLineItems
    .filter(lineItem => lineItem.fields.subcategory === cat.fields.name)
    .reduce((total, lineItem) => total + lineItem.fields.total, 0);



  const displayCategories = (filteredLineItems) => {
    const itemType = (filteredLineItems[0] && filteredLineItems[0].fields.itemType === "projected") ? "projected" : "actual";

    const lineItems = (cat) => filteredLineItems
      .filter(lineItem => lineItem.fields.subcategory === cat.fields.name)
      .map(lineItem => <LineItem key={lineItem.id} lineItem={lineItem} />)

    return categories.map(cat => (
      <Accordion key={cat.id}>

        <AccordionSummary expandIcon={<ExpandMore/>} aria-controls="panel1a-content">
          {cat.fields.name} {sum(cat, filteredLineItems)}
        </AccordionSummary>

        <AccordionDetails>
          <LineItemForm subcategory={cat.fields.name} itemType={itemType}/>
          {lineItems(cat)}
        </AccordionDetails>

      </Accordion>
    ))
  }

  const displayCategoriesDelta = () => {
    
    const projectedSum = (cat) => sum(cat, projectedLineItems);
    const actualSum = (cat) => sum(cat, actualLineItems);
    const delta = (cat) => projectedSum(cat) - actualSum(cat);

    return categories.map(cat => (
      <Paper key={`d-${cat.id}`} className={classes.delta}>
        <Typography className={classes.deltaContent}>
          {cat.fields.name} {delta(cat)}
        </Typography>
      </Paper>
    ));
  }

  return (
    <Paper>
      <Grid 
        container
        >
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.headers}>
              Projected
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.headers}>
              Actual
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.headers}>
              Delta
            </Typography>
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
              {displayCategories(projectedLineItems)}
          </Grid>
          <Grid item xs={4}>
              <div>
                Income
              </div>
              <div>
                Expenses
              </div>
              {displayCategories(actualLineItems)}
          </Grid>
          <Grid item xs={4}>
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