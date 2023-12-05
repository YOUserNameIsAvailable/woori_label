import puppeteer from 'puppeteer';
import { runMiddleware } from "../../services/helpers";
import axios from "axios";
import { CONFIG_RAZOR } from "@components/config";
import { List_Of_Components } from "@components/list";

async function handler(req, res) {
	await runMiddleware(req, res)

	try {
		const results = []

		for (const componentName in List_Of_Components) {
			if (Object.prototype.hasOwnProperty.call(List_Of_Components, componentName)) {
				const componentUrl = `${CONFIG_RAZOR.baseRazorUrlProd}/preview/${componentName}`
				const browser = await puppeteer.launch({ headless: true })
				const page = await browser.newPage()

				try {
					await page.setViewport({ width: 1920, height: 1080 });
					await page.goto(componentUrl, { waitUntil: 'networkidle0' });

					const componentBoundingBox = await page.$eval(`[data-component="${componentName}"]`, (component) => {
						const boundingBox = component.getBoundingClientRect();
						return {
							x: boundingBox.x,
							y: boundingBox.y,
							width: boundingBox.width,
							height: boundingBox.height,
						}
					})

					const screenshot = await page.screenshot({
						clip: {
							x: componentBoundingBox.x,
							y: componentBoundingBox.y,
							width: componentBoundingBox.width,
							height: componentBoundingBox.height,
						},
					})

					const uploadResponse = await axios.post(`${CONFIG_RAZOR.serverUrlProd}upload-preview`, {
						image: screenshot.toString('base64'),
						filename: componentName,
					})

					results.push({
						componentName,
						success: uploadResponse.status === 200
					});
				} catch (error) {
					console.error('Error when creating a screenshot for a component', componentName, error)
				} finally {
					await browser.close();
				}
			}
		}

		res.status(200).json({ success: true, message: 'Previews generated successfully', results })
	} catch (error) {
		console.error('Error when generating screenshots:', error)
		res.status(500).json({ success: false, message: 'Internal Server Error' })
	}
}


export default handler
