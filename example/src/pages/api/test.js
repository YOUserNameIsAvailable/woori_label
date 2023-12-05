import fs from 'fs';
import path from 'path';

import { renderToString } from 'react-dom/server';
import React from 'react';
import {toCamelCase} from "@/pages/test";
import {List} from "../../../auto";

export default async function handler(req, res) {
    try {
        const templateFolder = "auto/"
        const folderPath = path.join(process.cwd(), templateFolder);
        const fileNames = fs.readdirSync(folderPath);

        let renderedComponents = [];

      Object.entries(List).forEach((item)=>{

            const componentHTML = renderToString(React.createElement(item[1]));
            console.log(componentHTML)
            renderedComponents.push({ fileName:[item[0]], html: componentHTML });
        }
)
        res.status(200).json(renderedComponents);

    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при рендеринге компонентов');
    }
}
