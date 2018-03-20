/* eslint-disable import/no-extraneous-dependencies */
import moxios from 'moxios';

function testReduxAction({
	action,
	dispatch,
	apiResponse,
	assertions,
	args = []
}) {
	moxios.withMock(() => {
		action(...args)(dispatch);
		moxios.wait(async () => {
			const request = moxios.requests.mostRecent();
			// console.log(request);
			await request.respondWith({
				status: 200,
				response: apiResponse
			});

			assertions(dispatch, request);
		});
	});
}

export default testReduxAction;
