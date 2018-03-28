import React from 'react';
import PropTypes from 'prop-types';

const StatusIcon = ({ iconClass, status }) => (
	<i
		className={`fa ${iconClass}`}
		aria-hidden="true"
		data-test={`race-status-${status}`}
	/>
);

StatusIcon.propTypes = {
	iconClass: PropTypes.string.isRequired,
	status: PropTypes.oneOf(['new', 'submitted', 'passed']).isRequired
};

export default StatusIcon;
