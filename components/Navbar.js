import React from 'react';
import PLink from './PLink';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core';

export default function Navbar({user, token, month}){

  return (
    <Grid 
      container
      direction="row"
      alignItems="baseline"
      justify="space-around"
    >
      <Grid item xs={1}>
        {user && <PLink token={token} month={month} />}
      </Grid>
      <Grid item xs={1}>
        <h1>
          Buddgetz
        </h1>
      </Grid>
      {
        user && (
        <Grid item xs={1}> 
          <Button
            variant="outlined"
            color="primary"
          >
            <a href="/api/logout">
              Logout
            </a>
          </Button>
        </ Grid>
      )}
      {
        !user && (
          <Grid item xs={1}>
            <Button
              variant="contained"
            >
              <a href="/api/login">
                Login
              </a>
            </Button>
          </Grid>
      )}
    </Grid>
  )
}