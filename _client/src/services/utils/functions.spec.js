import { isObjectEmpty, getNodePaddings } from './functions';

describe('"isObjectEmpty" function', () => {
	it('knows when given object is empty', () => {
		const obj = {};
		expect(isObjectEmpty(obj)).toBe(true);
	});

	it('knows when given object is not empty', () => {
		const obj = { foo: 'bar' };
		expect(isObjectEmpty(obj)).toBe(false);
	});
});

describe('"getNodePaddings" function', () => {
	it("sums node's horizontal padding", () => {
		const node = document.createElement('div');
		const padding = 20;
		node.style.padding = `0px ${padding}px`;

		expect(getNodePaddings(node)).toBe(padding * 2);
	});
});
