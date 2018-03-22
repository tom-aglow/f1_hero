import {
	isObjectEmpty,
	getNodeHorPadding,
	calculatePickAndStemLeftPosition
} from './functions';

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

describe('"getNodePadding" function', () => {
	it("sums node's horizontal padding", () => {
		const node = document.createElement('div');
		const padding = 20;
		node.style.padding = `0px ${padding}px`;

		expect(getNodeHorPadding(node)).toBe(padding * 2);
	});
});

describe('"calculatePickAndStemLeftPosition" function', () => {
	let nodes;
	const racesNum = 20;

	beforeAll(() => {
		const picksNode = document.createElement('div');
		picksNode.style.width = '350px';

		// const stemNode = document.createElement('div');
		const stemNode = document.createElement('div');
		stemNode.style.width = '20px';

		const raceNode = document.createElement('div');
		raceNode.style.width = '50px';

		const raceHolderNode = document.createElement('div');
		raceHolderNode.style.width = '1340px';
		raceHolderNode.style.padding = '0px 20px';

		nodes = { picksNode, stemNode, raceNode, raceHolderNode };
	});

	it("doesn't allow pick element go outside the left side of the race container", () => {
		expect(calculatePickAndStemLeftPosition(nodes, racesNum, 1)).toMatchObject({
			pickPos: 0,
			stemPos: 35
		});
	});

	it('aligns pick element to the center axis of selected race node', () => {
		expect(calculatePickAndStemLeftPosition(nodes, racesNum, 5)).toMatchObject({
			pickPos: 142,
			stemPos: 165
		});
	});

	it("doesn't allow pick element go outside the right side of the race container", () => {
		expect(calculatePickAndStemLeftPosition(nodes, racesNum, 19)).toMatchObject(
			{
				pickPos: 1030,
				stemPos: 227
			}
		);
	});
});
