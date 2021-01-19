import React from 'react';
import Post from './Post/Post';

const Posts = (props) => {
  const posts = props.posts.map((post) => {
    return (
      <Post
        key={Math.random()}
        info={post}
        modal={props.modal}
        deletable={props.deletable}
        onDelete={props.onDelete}
        clickable={props.clickable}
        clicked={props.clicked}
      />
    );
  });

  console.log('[Posts] render');
  return <React.Fragment>{posts}</React.Fragment>;
};

export default Posts;
