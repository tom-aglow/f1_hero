import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SearchBar = ({ searchTerm, onChange }) => (
	<div className="SearchBar">
		<input
			type="text"
			placeholder="Search..."
			onChange={onChange}
			value={searchTerm}
			data-test="searchInput"
		/>
		<i className="fa fa-search" aria-hidden="true" />
	</div>
);

SearchBar.propTypes = {
	searchTerm: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default SearchBar;
