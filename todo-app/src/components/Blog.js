import React, { useState, useEffect } from 'react';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Blog = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
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
    </div>
  );
};

export default Blog;
