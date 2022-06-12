import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { updateProfile, loadUsers } from '../store';

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.username ? this.props.auth.username : '',
      avatarUrl: this.props.auth.avatarUrl ? this.props.auth.avatarUrl : '',
      bio: this.props.auth.bio ? this.props.auth.bio : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    this.props.updateProfile(this.state);
  }

  render() {
    const { username, avatarUrl, bio } = this.state;
    const {
      auth,
      users,
      match: {
        params: { id },
      },
    } = this.props;
    const user = users?.find((user) => user.id === auth.id);
    const { onChange, onSave } = this;

    const result = (
      <div className="updateProfile">
        <h3>Update Your Info Here!</h3>
        <form onSubmit={onSave}>
          <TextField
            label="Username"
            onChange={onChange}
            name="username"
            value={username}
          />
          <TextField
            label="Profile Pic URL"
            name="avatarUrl"
            value={avatarUrl}
            onChange={onChange}
          />
          <TextField label="Bio" name="bio" value={bio} onChange={onChange} />
          <Button
            onClick={onSave}
            disabled={
              username === this.props.auth.username &&
              avatarUrl === (this.props.auth.avatarUrl || '') &&
              bio === (this.props.auth.bio || '')
            }
          >
            Update
          </Button>
        </form>
      </div>
    );
    return result;
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProfile: (username, avatarUrl, bio) => {
      dispatch(updateProfile(username, avatarUrl, bio));
    },
  };
};

const mapState = (state) => {
  return state;
};

export default connect(mapState, mapDispatch)(ProfileUpdate);
