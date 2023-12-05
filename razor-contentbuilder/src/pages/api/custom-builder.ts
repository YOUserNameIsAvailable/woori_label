import React from 'react';

import {renderToString} from "react-dom/server";
import {List_Of_Components} from "@components/list";
import {runMiddleware} from "../../services/helpers";


export default async function handler(req, res) {
	await runMiddleware(req, res)

	try {
		let renderedComponents = [];
		process.env.IN_API_CONTEXT = 'true';
		Object.entries(List_Of_Components).forEach((item) => {
				const componentHTML = renderToString(React.createElement(item[1]));
				renderedComponents.push({fileName: [item[0]], html: componentHTML});
			}
		)
		delete process.env.IN_API_CONTEXT;
		const response = renderedComponents.map(item => {
				return {
					'thumbnail': `preview/customComponents/${item.fileName}.png`,
					'category': '121',
					'html': item.html
				}
			}
		)

		res.status(200).json(response);

	} catch (error) {
		console.error(error);
		res.status(500).send('Ошибка при рендеринге компонентов');
	}
}
