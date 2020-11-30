import React from 'react';

export default function LineItem ({lineItem}) {
  return (
    <>
      <div>
        {lineItem.description}
      </div>
      <div>
        {lineItem.date}
      </div>
      <div>
        {lineItem.total}
      </div>
    </>
  )
}