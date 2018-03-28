import axios from 'axios';

export default (endPoint, method = 'get', payload = {}) =>
	axios[method.toLowerCase()](endPoint, payload);
