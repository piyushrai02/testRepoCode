import React, { useState } from 'react';
import BlogForm from './BlogForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const BlogList = ({ posts, removePost, updatePost }) => {
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

  if (edit.id) {
    return <BlogForm edit={edit} onSubmit={submitUpdate} />;
  }

  return posts.map((post, index) => (
    <div className='blog-row' key={index}>
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p className='blog-author'>- {post.author}</p>
      </div>
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
    </div>
  ));
};

export default BlogList;
