const f = require('./functions');

describe('"capitalizeFirstLetter" function', () => {
	it('capitalizes first letter of provided string', () => {
		expect(f.capitalizeFirstLetter('foo')).toBe('Foo');
	});

	it('does nothing if first letter is already capitalized', () => {
		expect(f.capitalizeFirstLetter('Foo')).toBe('Foo');
	});
});

describe('"getMaxFiveElements" function', () => {
	const array = [5, 1, 7, 3, 9, 2, 4];

	it('returns five elements of provided array', () => {
		expect(f.getMaxFiveElements(array)).toHaveLength(5);
		expect(array).toEqual(expect.arrayContaining(f.getMaxFiveElements(array)));
	});

	it('sorts result in descending order', () => {
		const result = f.getMaxFiveElements(array);
		const sortedResult = result.sort((a, b) => a < b);
		expect(result).toEqual(sortedResult);
	});

	it('returns result that starts with max element of source array', () => {
		expect(f.getMaxFiveElements(array)[0]).toBe(Math.max(...array));
	});

	it('returns expected result', () => {
		expect(f.getMaxFiveElements(array)).toEqual([9, 7, 5, 4, 3]);
	});
});
