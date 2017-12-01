import React from 'react';

const SearchBar = props => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={props.onChange}
        value={props.searchTerm}
      />
      <i className="fa fa-search" aria-hidden="true"></i>
    </div>
  );
};

export default SearchBar;
