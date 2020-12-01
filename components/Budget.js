import React from 'react';
import LineItem from './LineItem';
import BudgetStyles from '../styles/BudgetStyles';

export default function Budget({lineItems}) {
  const actualLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'actual'
  ));

  const projectedLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'projected'
  ));


  return (
    <BudgetStyles>
      <div className="header">
          <div>
            Projected
          </div>
          <div>
            Actual
          </div>
          <div>
            Delta
          </div>
      </div>
      <div className="table-body">
          <div className="projected"> 
              <div>
                {lineItems && projectedLineItems.map(lineItem => (
                  <LineItem key={lineItem.id} lineItem={lineItem}/>
                ))}
              </div>
          </div>
          <div className="actual">
              <div>
                {lineItems && actualLineItems.map(lineItem => (
                  <LineItem key={lineItem.id} lineItem={lineItem}/>
                ))}
              </div>
          </div>
          <div className="delta">

          </div>
      </div>
    </BudgetStyles>
  );
};