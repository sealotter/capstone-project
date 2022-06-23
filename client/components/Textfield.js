import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core/';
import PositionedSnackbar from './Snackbar'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

export default function MultilineTextFields(props) {
  const {handleSubmitValue, postId} = props
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit=()=>{
    handleSubmitValue(postId, value)
    setValue('')
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Leave a review!"
          multiline
          minRows={4}
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
      </div>
      <PositionedSnackbar handleParentClick={handleSubmit} parentState={value} type={'review'}/>
    </form>
  );
}