import React, {useState, useContext} from 'react';
import {LineItemsContext} from '../contexts/lineItemsContext';

export default function LineItemForm ({subcategory, itemType}) {
  const {addLineItem} = useContext(LineItemsContext);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLineItem({subcategory, itemType, description, date, total: Math.round(parseFloat(total) * 100) / 100});
    setDescription('');
    setDate('');
    setTotal('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="description" 
        placeholder="description" 
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <input 
        type="number"
        value={total}
        onChange={e => setTotal(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  )
};
