import {createContext, useState} from 'react';

const LineItemsContext = createContext();

const LineItemsProvider = ({children}) => {
  const [lineItems, setLineItems] = useState([]);

  return (
    <LineItemsContext.Provider
      value={{
        lineItems,
        setLineItems,
      }}
    >
      {children}
    </LineItemsContext.Provider>
  )

};

export {LineItemsContext, LineItemsProvider};