import React, {useState} from 'react';

export default function LineItemForm () {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(0);

  return (
    <form>
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
