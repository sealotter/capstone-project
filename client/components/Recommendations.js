import React from 'react';
import { connect } from 'react-redux';
import { sendRec } from '../store';

const Recommendations = (props) => {
  const { sendRec } = props;
  console.log(props);
  // const friends =
  return (
    <div>
      <form>
        <select></select>
        <button onClick={() => sendRec()}> Reccomend</button>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    sendRec: () => dispatch(sendRec()),
  };
};

export default connect((state) => state, mapDispatch)(Recommendations);
