import usersSample from 'JestClient/samples/users';
import pageSample from 'JestClient/samples/page';
import { mapStateToProps } from './container';

const initialState = {
	data: { users: usersSample },
	services: { page: pageSample }
};

it('maps redux state to component props', () => {
	const props = mapStateToProps(initialState);

	expect(props).toMatchObject({
		user: usersSample.current,
		heading: pageSample.heading
	});
});
