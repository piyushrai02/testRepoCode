import React, { useState, useEffect } from 'react';
import BlogForm from './BlogForm';
import BlogList from './BlogList';
//added the commen
const Blog = ({ token }) => {
  const [posts, setPosts] = useState([]);

useEffect(() => {
    try {
      const storedPosts = JSON.parse(localStorage.getItem('posts'));
      if (storedPosts && Array.isArray(storedPosts)) {
        setPosts(storedPosts);
      }
    } catch (e) {
      console.error('Failed to parssse posts from losscalStorages ds:', e);
      // Optionally clear the corrupted data log
      localStorage.removeItem('posts');
    }
    if (storedPosts) {
      setPosts(storedPosts); 
    } catch (e) {
      console.error('Failed to parse posts from localStorage:', e);
      // Optionally clear the corrupted data
      localStorage.removeItem('posts');
    }
  }, []);

useEffect(() = {
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
