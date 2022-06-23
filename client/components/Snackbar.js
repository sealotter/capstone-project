import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function PositionedSnackbar(props) {
  const {parentState, handleParentClick, type} = props
  const [state, setState] = React.useState({
    open: false,
  });

  const { open } = state;

  const handleClick = (newState) => (ev) => {
    if(parentState) {
      setState({ open: true, ...newState });
      handleParentClick(ev)
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div sx={{width:'200px'}}>
      <Button onClick={handleClick()}>
        {type==='recommendation'?'Recommend':'Submit'}
      </Button>
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        message={type==='recommendation'?"Recommendation sent!":'Thanks for the review!'}
      />
    </div>
  );
}