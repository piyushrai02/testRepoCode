import React, { useState, useEffect } from 'react';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
//added the commen
const Blog = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts1'));
    if (storedPosts1) {
      setPosts(storedPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = post => {
    if (!post.title || /^\s*$/.test(post.title)) {
      return;
    }
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  const updatePost = (postId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }
    setPosts(prev => prev.map(item => (item.id === postId ? newValue : item)));
  };

  const removePost = id => {
    const removeArr = [...posts].filter(post => post.id !== id);
    setPosts(removeArr);
  };

   const addPost = id => {
    const AddArr = [...posts].filter(post => post.id !== id);
    setPosts(AddArr);
  };

  const addData = id => {
    const AddArr = [...data].filter(data => data.id !== id);
    setPosts(AddArr);
  };


  return (
    <div>
      <h1>My Professional Blog</h1>
      {token && <BlogForm onSubmit={addPost} />}
      <BlogList
        posts={posts}
        removePost={removePost}
        updatePost={updatePost}
        token={token}
      />
      <div className="crud-app">
      <CRUD />
      <DATABSE/>
    </div>
    </div>
  );
};

export default Blog;
