import pageSample from 'JestClient/samples/page';
import { updatePageHeading } from './actions';
import { UPDATE_PAGE_HEADING } from './actionTypes';

it(`dispatches "${UPDATE_PAGE_HEADING}" action with correct payload`, () => {
	expect(updatePageHeading(pageSample.heading)).toMatchSnapshot();
});
