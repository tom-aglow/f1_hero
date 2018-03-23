import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SubmitButton = ({ onClick }) => (
	<div className="btn SubmitButton" onClick={onClick} role="button" tabIndex="0">
		<i className="fa fa-check" aria-hidden="true" /> Submit
	</div>
);

SubmitButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default SubmitButton;
