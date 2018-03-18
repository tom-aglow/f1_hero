import React from 'react';

import './styles.scss';

const Login = () => (
	<div className="Login">
		<h1>F1 Hero</h1>
		<p>be number 1 in formula 1 world</p>
		<a href="/auth/twitter" className="btn">
			Login <i className="fa fa-twitter" aria-hidden="true" />
		</a>
	</div>
);

export default Login;
