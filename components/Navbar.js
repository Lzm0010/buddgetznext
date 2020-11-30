import React from 'react';
import NavbarStyles from '../styles/NavbarStyles';

export default function Navbar(){
  return (
    <NavbarStyles>
      <a>
        Buddgetz
      </a>
      <a href="/api/login">
        Login
      </a>
      <a href="/api/login">
        Logout
      </a>
    </NavbarStyles>
  )
}