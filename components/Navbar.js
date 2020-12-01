import React from 'react';
import NavbarStyles from '../styles/NavbarStyles';

export default function Navbar({user}){
  return (
    <NavbarStyles>
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
    </NavbarStyles>
  )
}