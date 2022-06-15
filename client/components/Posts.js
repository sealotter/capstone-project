import React, {useState} from 'react';
import { connect } from 'react-redux';
import { loadPosts, createPost } from '../store';
import { Avatar } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Posts = ({ posts, writeComment }) => {
  return (
    <div>
      {posts.map((post) => {
        if(post.postId) return null 
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
                <button><ChatBubbleOutlineIcon fontSize="small" /></button>


                <FavoriteBorderIcon fontSize="small" />
              </div>
            </div>
          </div>
        );
      })}
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
    writeComment: ()=>{
      dispatch(createPost())
    }
  };
};

export default connect(mapState, mapDispatch)(Posts);
