import React from 'react';

const SearchBar = ({ searchTerm, onChange }) => (
	<div className="search-bar">
		<input
			type="text"
			placeholder="Search..."
			onChange={onChange}
			value={searchTerm}
		/>
		<i className="fa fa-search" aria-hidden="true" />
	</div>
);

export default SearchBar;
