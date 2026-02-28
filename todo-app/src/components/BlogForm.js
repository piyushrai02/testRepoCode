import React, { useState, useEffect, useRef } from 'react';

function BlogForm(props) {
  const [title, setTitle] = useState(props.edit ? props.edit.title : '');
  const [content, setContent] = useState(props.edit ? props.edit.content : '');
  const [author, setAuthor] = useState(props.edit ? props.edit.author : '');

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  });

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleAuthorChange = e => {
    setAuthor(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: title,
      content: content,
      author: author,
      timestamp: new Date().toISOString()
    });
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className='blog-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update title'
            value={title}
            onChange={handleTitleChange}
            name='title'
            ref={titleRef}
            className='blog-input edit'
          />
          <textarea
            placeholder='Update content'
            value={content}
            onChange={handleContentChange}
            name='content'
            className='blog-textarea edit'
          />
          <input
            placeholder='Update author'
            value={author}
            onChange={handleAuthorChange}
            name='author'
            className='blog-input edit'
          />
          <button onClick={handleSubmit} className='blog-button edit'>
            Update Blog
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Blog Title'
            value={title}
            onChange={handleTitleChange}
            name='title'
            className='blog-input'
            ref={titleRef}
          />
          <textarea
            placeholder='Blog Content'
            value={content}
            onChange={handleContentChange}
            name='content'
            className='blog-textarea'
          />
          <input
            placeholder='Author Name'
            value={author}
            onChange={handleAuthorChange}
            name='author'
            className='blog-input'
          />
          <button onClick={handleSubmit} className='blog-button'>
            Add Blog Post
          </button>
        </>
      )}
    </form>
  );
}

export default BlogForm;
