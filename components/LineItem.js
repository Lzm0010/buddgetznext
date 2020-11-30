import React, {useContext, useState} from 'react';
import {LineItemsContext} from '../contexts/lineItemsContext';

export default function LineItem ({lineItem}) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(lineItem.fields.description);
  const [date, setDate] = useState(lineItem.fields.date);
  const [total, setTotal] = useState(lineItem.fields.total);
  const {updateLineItem, deleteLineItem} = useContext(LineItemsContext);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedFields = {
      ...lineItem.fields,
      description,
      date,
      total: parseFloat(total)
    }
    const updatedLineItem = {id: lineItem.id, fields: updatedFields};
    updateLineItem(updatedLineItem);
    setIsEditing(!isEditing);
  };

  return (
    <li>
      {
        isEditing && (
          <>
          <form onSubmit={handleUpdate}>
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
            <button type="submit">Update</button>
          </form>
            <button 
            type="button"
            onClick={handleEdit}
          >
            Back
          </button>
        </>
        )
      }
      {
        !isEditing && (
          <>
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
              Edit
            </button>
          </>
        )
      }
      <button
        type="button"
        onClick={() => deleteLineItem(lineItem.id)} 
      >
        Delete
      </button>
    </li>
  )
}