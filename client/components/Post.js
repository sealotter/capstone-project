import React, { Component } from "react";

export default class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change)
  }

  onSubmit = (ev) => {
    ev.preventDefault();

  }
 
  render() {
    const { post } = this.state;
    const {onChange, onSubmit} = this;
    return (
      <>
        <form>
          <input
          onChange = {onChange}
            name="post"
            value={post}
            placeholder="what's on your mind?"
          ></input>
          <button onSubmit={()=> onSubmit}>Post</button>
        </form>
      </>
    );
  }
}
