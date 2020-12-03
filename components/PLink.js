import React, {useCallback} from 'react';
import {usePlaidLink} from 'react-plaid-link';

export default function PLink ({token}) {

  const onSuccess = useCallback(
    (token, metadata) => fetch('api/plaid', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({public_token: token, metadata}),
    }),
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
      Connect a bank account
    </button>
  )
}