import r from 'Root/jest/utils/renderer';
import MockComponent from 'Root/jest/mocks/component';
import usersSample from 'JestClient/samples/users';

import { Auth } from './requireAuth';

const defaultProps = {
	composedComponent: MockComponent,
	user: usersSample.current,
	getCurrentUser() {}
};

r.init(Auth, defaultProps);

it('renders child if there is a current user', () => {
	const wrapper = r.render();
	const child = wrapper.find(MockComponent);

	expect(child).toHaveLength(1);
});

it('fetches current user if it is not provided', () => {
	const getCurrentUser = jest.fn();
	r.render({ user: {}, getCurrentUser });
	expect(getCurrentUser).toHaveBeenCalledTimes(1);
});

it('redirects to root route if user was successfully fetched and current route is /login', () => {
	const push = jest.fn();
	r.render({ user: {}, history: { push }, location: { pathname: '/login' } });

	expect(push).toHaveBeenCalledTimes(1);
	expect(push).toHaveBeenCalledWith('/');
});

it('redirects to login route if user was not found', () => {
	const push = jest.fn();
	const getCurrentUser = jest.fn();

	r.render({ user: {}, getCurrentUser, history: { push } });

	expect(push).toHaveBeenCalledTimes(1);
	expect(push).toHaveBeenCalledWith('/login');
});
