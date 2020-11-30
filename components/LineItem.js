import React, {useContext} from 'react';
import {LineItemsContext} from '../contexts/lineItemsContext';

export default function LineItem ({lineItem}) {

  const {updateLineItem, deleteLineItem} = useContext(LineItemsContext);

  const handleEdit = () => {

  }

  return (
    <li>
      <div>
        {lineItem.fields.description}
      </div>
      <div>
        {lineItem.fields.date}
      </div>
      <div>
        {lineItem.fields.total}
      </div>
      <button 
        type="button"
        onClick={handleEdit}
      >
        Update
      </button>
      <button
        type="button"
        onClick={() => deleteLineItem(lineItem.id)} 
      >
        Delete
      </button>
    </li>
  )
}