import Cors from 'cors';

export const fetcher = url => fetch(url).then(r => r.json())

export const fetcherCategory = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();
		return { categories: { ...data } };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { categories: { data: [] } }; // Возвращайте пустой массив или другое значение по умолчанию при ошибке
	}
};


export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);


const cors = Cors({
	methods: ['GET', 'POST'],
	origin: '*'
});


export function runMiddleware(req, res) {
	return new Promise((resolve, reject) => {
		cors(req, res, (result) => {
			if (result instanceof Error) return reject(result);

			return resolve(result);
		});
	});
}