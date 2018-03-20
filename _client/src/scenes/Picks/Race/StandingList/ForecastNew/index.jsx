import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Item from '../Item';
import { listItemPropTypes } from '../index';

const ForecastNew = ({ items }) => {
	const SortableItem = SortableElement(item => <Item {...item} />);

	return (
		<div className="standings-container">
			{items.map((value, index) => (
				<SortableItem key={`item-${value.position}`} index={index} {...value} />
			))}
		</div>
	);
};

ForecastNew.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape(listItemPropTypes)).isRequired
};

export default SortableContainer(ForecastNew);
