import React, { useState } from 'react';
import BlogForm from './BlogForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const BlogList = ({ posts, removePost, updatePost, token }) => {
  const [edit, setEdit] = useState({
    id: null,
    title: '',
    content: '',
    author: ''
  });

  const submitUpdate = value => {
    updatePost(edit.id, value);
    setEdit({
      id: null,
      title: '',
      content: '',
      author: ''
    });
  };

  if (edit.id && token) { // Only allow editing if token is present ds
    return <BlogForm edit={edit} onSubmit={submitUpdate} />;
  }

  return posts.map((post) => (
    <div className='blog-row' key={post.id}> // Use unique post.id instead of index for stable keys added
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p className='blog-author'>- {post.author}</p>
      </div>
      {token && ( // Conditionally render icons based on token
        <div className='icons'>
          <RiCloseCircleLine
            onClick={() => removePost(post.id)}
            className='delete-icon'
          />
          <TiEdit
            onClick={() => setEdit({ id: post.id, title: post.title, content: post.content, author: post.author })}
            className='edit-icon'
          />
        </div>
      )}
    </div>
  ));
};

export default BlogList;
