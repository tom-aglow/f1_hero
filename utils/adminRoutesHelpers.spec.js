const f = require('./adminRoutesHelpers');
const moxios = require('moxios');

describe('"castCountry" function', () => {
	it('formats UK country code to correct string', () => {
		expect(f.castCountry('UK')).toBe('united-kingdom');
	});

	it('formats USA country code to correct string', () => {
		expect(f.castCountry('USA')).toBe('united-states');
	});

	it('formats UAE country code to correct string', () => {
		expect(f.castCountry('UAE')).toBe('united-arab-emirates');
	});

	it("doesn't modify other codes", () => {
		expect(f.castCountry('RUS')).toBe('RUS');
	});
});

describe('"getForecastScore" function', () => {
	it('calculates correct result for every row in forecast', () => {
		const raceResult = [
			{ number: 5, position: '1' },
			{ number: '44', position: 2 },
			{ number: 77, position: '3' }
		];

		const forecast = [
			{ _driver: { number: '5' }, position: 1 },
			{ _driver: { number: 44 }, position: 5 },
			{ _driver: { number: 99 }, position: '3' }
		];

		const result = f.getForecastScore(raceResult, forecast);

		expect(result[0].score).toBe(25);
		expect(result[1].score).toBe(12);
		expect(result[2].score).toBe(0);
	});
});

describe('"getCountryFlag" function', () => {
	it('fetches country flag url and alpha3code', done => {
		const alpha3code = 'RUS';
		const flagUrl = 'http://flags.com/russia';

		moxios.withMock(() => {
			const promise = f.getCountryFlag('russia');

			moxios.wait(async () => {
				const request = moxios.requests.mostRecent();

				const response = {
					basic: {
						flag: { svg: flagUrl },
						code: { alpha3: alpha3code }
					}
				};

				await request.respondWith({
					status: 200,
					response
				});

				const result = await promise;

				expect(result).toMatchObject({
					alpha3code,
					flagUrl
				});

				done();
			});
		});
	});

	it('returns placeholders if the country is not found', done => {
		moxios.withMock(() => {
			const promise = f.getCountryFlag('unknown');

			moxios.wait(async () => {
				const request = moxios.requests.mostRecent();

				await request.respondWith({
					status: 401,
					response: {}
				});

				const result = await promise;

				expect(result).toMatchObject({
					alpha3code: '---',
					flagUrl: '-'
				});

				done();
			});
		});
	});
});
