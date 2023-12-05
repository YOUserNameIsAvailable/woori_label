import { List_Of_Components } from "@components/list";

export default function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json(Object.keys(List_Of_Components));
	} else {
		res.status(405).end();
	}
}