import React, {useState} from 'react';
import { connect } from 'react-redux';
import { loadPosts, createPost } from '../store';
import { Avatar, Button } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PostComment from './PostComment';

class Posts extends React.Component {
  constructor(){
    super()
    this.state={
      showCommentBox:null
    }
    this.handleShowCommentBox = this.handleShowCommentBox.bind(this)
  }

  handleShowCommentBox(){
    this.setState({showCommentBox:null})
  }

  render(){
    const {posts, users} = this.props
    const {showCommentBox} = this.state
    return (
      <div>
        {posts.map((post) => {
          const comments = []
          const user = users.find(user=> user.id === post.userId)
          if(post.postId || !user) return null
          posts.forEach(item =>{
            if(item.postId === post.id) comments.push(item)
          })
          return (
            <div key={post.id} className="postOut">
              <div className="post">
                <div className="post_body">
                  <Link to={`/profile/${user.id}`}>
                    <Avatar src={user.avatarUrl} />
                  </Link>
  
                  <div className="post_header">
                    <div className="post_headerText">
                      <h3>
                        {user.username}{' '}
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
                  <button onClick={()=>{
                    if(showCommentBox !== post.id) this.setState({showCommentBox:post.id})
                    else this.setState({showCommentBox:null})
                  }}><ChatBubbleOutlineIcon fontSize="small" /></button>
                  <FavoriteBorderIcon fontSize="small" />
                </div>
              </div>
              <PostComment user={user} post={post} showCommentBox={showCommentBox} handleComment={this.handleShowCommentBox}/>
              {comments.map(comment=>{
                const commentUser = users.find(user=> user.id === comment.userId)
                return(
                  <div key={comment.id} className="postOut">
                    <div className="post">
                      <div className="post_body">
                        <Link to={`/profile/${commentUser.id}`}>
                          <Avatar src={commentUser.avatarUrl} />
                        </Link>
        
                        <div className="post_header">
                          <div className="post_headerText">
                            <h3 className="postDetail">replying to {user.username}'s post</h3>
                            <h3>
                              {commentUser.username}{' '}
                              <span className="postDetail">
                                •{Date(comment.createdAt).slice(4, 10)}{' '}
                              </span>
                            </h3>
                          </div>
                          <div className="post_headerDesc">
                            <p>{comment.content} --- THIS IS A COMMENT</p>
                          </div>
                        </div>
                      </div>
                      <div className="post_footer">
                        <FavoriteBorderIcon fontSize="small" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          );
        })}
      </div>
    );
  }
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
    }
  };
};

export default connect(mapState, mapDispatch)(Posts);
