import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

export default function MultilineTextFields(props) {
  const {handleSubmit, postId} = props
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
      <Button onClick={()=>{
        handleSubmit(postId, value)
        setValue('')  
      }}>Submit</Button>
    </form>
  );
}