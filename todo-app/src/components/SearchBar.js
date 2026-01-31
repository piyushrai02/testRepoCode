import React from 'react';

const SearchBar =  => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for the  ..."
        value={value}
        onChange={onChange}
        className="todo-input search-input"
        style={{ marginBottom: '10px', borderRadius: '4px', width: '100%' }}
      />
    </div>
  );
};

export default SearchBar;
