import React from 'react';
import PropTypes from 'prop-types';

import Item from '../Item';
import { listItemPropTypes } from '../index';

const ForecastSubmitted = ({ items }) => (
	<div className="standings-container">
		{items.map(item => <Item key={item.position} {...item} />)}
	</div>
);

ForecastSubmitted.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape(listItemPropTypes)).isRequired
};

export default ForecastSubmitted;
