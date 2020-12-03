import React from 'react';

export default function Navbar({user}){
  return (
    <nav>
      <p>
        Buddgetz
      </p>
      {
        user && (
        <a href="/api/logout">
          Logout
        </a>
      )}
      {
        !user && (
        <a href="/api/login">
          Login
        </a>

      )}
    </nav>
  )
}