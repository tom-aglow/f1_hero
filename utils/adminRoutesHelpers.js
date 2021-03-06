/* eslint-disable no-prototype-builtins */
const { BASETRIP_SECRET } = require('../config/keys');
const axios = require('axios');

const scoreRules = {
	0: 25,
	1: 18,
	2: 15,
	3: 12,
	4: 10,
	5: 8,
	6: 6,
	7: 4,
	8: 2,
	9: 1
};

const castCountry = country => {
	switch (country) {
		case 'UK':
			return 'united-kingdom';
		case 'USA':
			return 'united-states';
		case 'UAE':
			return 'united-arab-emirates';
		default:
			return country;
	}
};

const getCountryFlag = async country => {
	try {
		const res = await axios({
			url: `https://api.thebasetrip.com/v2/countries/${country}`,
			method: 'get',
			headers: {
				Accept: 'application/json',
				'x-api-key': BASETRIP_SECRET
			}
		});
		return {
			flagUrl: res.data.basic.flag.svg,
			alpha3code: res.data.basic.code.alpha3
		};
	} catch (err) {
		console.log(`no such country: ${country}`);
		return {
			flagUrl: '-',
			alpha3code: '---'
		};
	}
};

const getForecastScore = (results, forecast) =>
	forecast.map(standing => {
		const driverResult = results.find(
			result => Number(result.number) === Number(standing._driver.number)
		);
		const posDifference = driverResult
			? Math.abs(driverResult.position - standing.position)
			: 100;
		const score = scoreRules.hasOwnProperty(posDifference)
			? scoreRules[posDifference]
			: 0;

		return {
			...JSON.parse(JSON.stringify(standing)),
			score
		};
	});

module.exports = {
	castCountry,
	getCountryFlag,
	getForecastScore
};
