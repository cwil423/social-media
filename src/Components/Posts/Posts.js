import React, { useEffect, useState } from 'react';
import Post from './Post/Post';


const Posts = (props) => {
  const posts = props.posts.map(post => {
    return <Post key={Math.random()} info={post} />
  })
  return (
    <React.Fragment>
      {posts}
    </React.Fragment>
  );
}

export default Posts;