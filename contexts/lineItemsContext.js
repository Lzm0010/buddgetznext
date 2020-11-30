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

  return (
    <LineItemsContext.Provider
      value={{
        lineItems,
        setLineItems,
        addLineItem,
      }}
    >
      {children}
    </LineItemsContext.Provider>
  )

};

export {LineItemsContext, LineItemsProvider};