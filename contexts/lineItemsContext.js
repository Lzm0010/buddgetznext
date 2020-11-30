import {createContext, useState} from 'react';

const LineItemsContext = createContext();

const LineItemsProvider = ({children}) => {
  const [lineItems, setLineItems] = useState([]);

  const addLineItem = async ({description, date, total}) => {
    try {
      const res = await fetch('/api/createLineItem', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({description, date, total})
      });
      const newItem = await res.json();
      setLineItems(prevLineItems => {
        return [newItem, ...prevLineItems];
      });
    } catch (err) {
      console.error(err);
    }
  }

  const updateLineItem = async (updatedLineItem) => {
    try {
      const res = await fetch('/api/updateLineItem', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedLineItem)
      });
      await res.json();
      setLineItems(prevLineItems => {
        const existingItems = [...prevLineItems];
        const existingItem = existingItems.find(lineItem => lineItem.id === updatedLineItem.id);
        existingItem.fields = updatedLineItem.fields;
        return existingItems;
      });
    } catch(err) {
      console.error(err);
    }
  }

  const deleteLineItem = async (id) => {
    try {
      await fetch('/api/deleteLineItem', {
        method: 'Delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
      });

      setLineItems(prevLineItems => {
        return prevLineItems.filter(lineItem => lineItem.id !== id);
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <LineItemsContext.Provider
      value={{
        lineItems,
        setLineItems,
        addLineItem,
        deleteLineItem,
        updateLineItem,
      }}
    >
      {children}
    </LineItemsContext.Provider>
  )

};

export {LineItemsContext, LineItemsProvider};