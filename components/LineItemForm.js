import 'date-fns'
import React, {useState, useContext} from 'react';
import {LineItemsContext} from '../contexts/lineItemsContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

export default function LineItemForm ({category, subcategory, itemType}) {
  const {addLineItem} = useContext(LineItemsContext);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLineItem({category, subcategory, itemType, description, date, total: Math.round(parseFloat(total) * 100) / 100});
    setDescription('');
    setDate('');
    setTotal('');
  }

  const handleDateChange = (date) => {
    setDate(date);
  }

  return (
    <form onSubmit={handleSubmit}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Description" 
              name="description" 
              size="small"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Date"
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              label="Amount"
              type="number"
              value={total}
              onChange={e => setTotal(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton type="submit">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </form>
  )
};
