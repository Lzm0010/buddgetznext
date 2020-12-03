import React from 'react';
import LineItem from './LineItem';

export default function Budget({lineItems}) {
  const actualLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'actual'
  ));

  const projectedLineItems = lineItems.filter(lineItem => (
    lineItem.fields.itemType === 'projected'
  ));

//   <div>
//   {lineItems && projectedLineItems.map(lineItem => (
//     <LineItem key={lineItem.id} lineItem={lineItem}/>
//   ))}
// </div>

  return (
    <div>
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
                Income
              </div>
              <div>
                Expenses
              </div>
          </div>
          <div className="actual">
              <div>
                Income
              </div>
              <div>
                Expenses
              </div>
          </div>
          <div className="delta">
              <div>
                Income
              </div>
              <div>
                Expenses
              </div>
          </div>
      </div>
    </div>
  );
};