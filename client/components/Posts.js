import React from 'react';
import { connect } from 'react-redux';
import { loadPosts } from '../store';
import { Avatar } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FlipMove from "react-flip-move";

const Posts = ({ posts }) => {
  return (
    <div>
      <FlipMove>
      {posts.map((post) => {
        return (
          <div key={post.id} className="postOut">
            <div className="post">
              <div className="post_body">
                <Link to={`/profile/${post.userId}`}>
                  <Avatar src={post.avatarUrl} />
                </Link>

                <div className="post_header">
                  <div className="post_headerText">
                    <h3>
                      {post.username}{' '}
                      <span className="postDetail">
                        •{Date(post.createdAt).slice(4, 10)}{' '}
                      </span>
                    </h3>
                  </div>
                  <div className="post_headerDesc">
                    <p>{post.content}</p>
                  </div>
                </div>
              </div>
              <div className="post_footer">
                <ChatBubbleOutlineIcon fontSize="small" />
                <RepeatIcon fontSize="small"/>
                <FavoriteBorderIcon fontSize="small" />
              </div>
            </div>
          </div>
        );
      })}
      </FlipMove>
    </div>
  );
};

const mapState = ({ auth, users, posts }) => {
  return {
    auth,
    users,
    posts,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadPosts: () => {
      dispatch(loadPosts());
    },
  };
};

export default connect(mapState, mapDispatch)(Posts);
