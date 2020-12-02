import React from 'react';

export default function PLink () {
  const handleClick = async () => {
    try {
      const res = await fetch('/api/plaid', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
      const link = await res.json();
      console.log(link);
      return link;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button onClick={handleClick}>
      Connect Bank Account
    </button>
  )
}