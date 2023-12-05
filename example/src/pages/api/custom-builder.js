import Cors from 'cors';
import {customBlockList} from "components/customBlocks/customBlockList";


const cors = Cors({
	methods: ['GET', 'POST'],
	origin: '*'
});

function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) return reject(result);

			return resolve(result);
		});
	});
}


export default async function handler(req, res) {
	await runMiddleware(req, res, cors);
	res.status(200).json(customBlockList)
}