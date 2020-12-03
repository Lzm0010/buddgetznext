import React, {useCallback, useContext} from 'react';
import {usePlaidLink} from 'react-plaid-link';
import LineItemContext, { LineItemsContext } from '../contexts/lineItemsContext';

export default function PLink ({token}) {
  const {lineItems, addLineItem} = useContext(LineItemsContext);

  const onSuccess = useCallback(
     async (token, metadata) => {
        const res = await fetch('api/plaid', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({public_token: token, metadata}),
        })

        const transactionResponse = await res.json();
    
        if (res.ok !== false) {
          transactionResponse.transactions.forEach(trans => {
            if (lineItems.find(li =>  li.transactionId === trans.transaction_id) === undefined) {
              addLineItem({
                transactionId: trans.transaction_id,
                description: trans.name,
                date: trans.date,
                total: trans.amount,
                itemType: 'actual'
              })
            }
          });
        }
    },
    []
  );

  const onEvent = useCallback(
    (eventName, metadata) => console.log('onEvent', eventName, metadata),
    []
  );

  const onExit = useCallback(
    (err, metadata) => console.log('onExit', err, metadata),
    []
  );

  const config = {
    token,
    onEvent,
    onSuccess,
    onExit,
    // –– optional parameters
    // receivedRedirectUri: props.receivedRedirectUri || null,
    // ...
  };

  const {open, ready, error} = usePlaidLink(config);

  return (
    <button
      type="button"
      onClick={() => open()}
      disabled={!ready || error}
    >   
      Upload Transactions from Bank Account
    </button>
  )
}