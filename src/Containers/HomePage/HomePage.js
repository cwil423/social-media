import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Posts from '../../Components/Posts/Posts';
import Navbar from '../../Components/Navigation/Navbar';
import { authContext } from '../../Context/authContext';


const HomePage = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios.get('https://social-media-d03f3.firebaseio.com/posts.json')
      .then(response => {
        if (response.data === null) {
          return
        }
        setPosts(Object.values(response.data))
      })
  }, []);
  return (
    <div>
      <Navbar />
      <Posts posts={posts} />
    </div>
  );
}

export default HomePage;