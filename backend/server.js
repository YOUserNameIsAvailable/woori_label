const express = require('express');
const app = express();

const cors = require('cors');
const serveStatic = require('serve-static');
const session = require('express-session');
const fs = require('fs').promises;
const getProps = require("./getProps");
const jsxTransform = require("html-to-jsx-transform")
const {JSDOM} = require("jsdom");
const {CONFIG} = require("./config");

//Specify url path
const $path = 'uploads'; // Physical path
const $urlpath = 'files'; // URL path

const isLocalhost = (hostname) => {
	if (hostname === 'localhost') return true
}

const mongoose = require('mongoose');
const {launch} = require("puppeteer");

mongoose.connect('mongodb://127.0.0.1:27017/nextBuilder',
	{useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const HtmlContentSchema = new mongoose.Schema({
	content: String,
	page: {
		type: String,
		required: true,
		unique: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	props: {
		type: String,
	}
});

mongoose.model('htmlContent', HtmlContentSchema);

const routeModel = mongoose.model('htmlContent');

app.use('/uploads', express.static('uploads'))

app.use(cors());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json({limit: '50mb'}));
app.use($urlpath, serveStatic($path));

app.use(session({
	secret: 'Your_Secret_Key',
	resave: true,
	saveUninitialized: true,
	rolling: true,
	cookie: {
		httpOnly: true,
		maxAge: 1 * 60 * 60 * 1000
	}
}));

app.options('/upload', cors());

app.post('/upload', async (req, res) => {
	const base64Data = req.body.image;
	const filename = req.body.filename;

	console.log(base64Data)
	console.log(`${$path}/${filename}`)

	try {
		await fs.writeFile(`${$path}/${filename}`, base64Data, 'base64')
	} catch (err) {

		return res.status(500).json({
			success: false,
			message: `Failed to save file: ${err.message}`
		});
	}

	res.status(200).json({
		success: true,
		url: `${CONFIG.serverUrlProd}${$urlpath}/${filename}`
	});
});


app.get('/upload-preview', async (req, res) => {
	const response = await fetch(`${CONFIG.baseRazorUrlProd}api/components`)
	const data = await response.json()

	try {
		const browser = await launch({
			headless: 'new',
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			defaultViewport: {width: 480, height: 300}
		})

		const page = await browser.newPage()
		const results = []

		for (const componentName of data) {
			const componentUrl = `${CONFIG.baseRazorUrlProd}preview/${componentName}`

			console.log(`${CONFIG.baseRazorUrlProd}preview/${componentName}`)

			try {
				await page.goto(componentUrl, { waitUntil: 'networkidle0' })

				const componentBoundingBox = await page.$eval(`[data-component="${componentName}"]`, (component) => {
					const boundingBox = component.getBoundingClientRect()
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

				await fs.writeFile(`${$path}/preview/customComponents/${componentName}.png`, screenshot.toString('base64'), 'base64')

				results.push({
					componentName,
					success: true
				})
			} catch (err) {
				console.error('Error when creating a screenshot for a component', componentName, err)
				results.push({
					componentName,
					success: false,
					error: err.message
				})
			}

			await new Promise(resolve => setTimeout(resolve, 1000))
		}

		await browser.close()

		res.status(200).json({ success: true, message: 'Previews generated successfully', results })
	} catch (error) {
		console.error('Error when generating screenshots:', error)
		res.status(500).json({ success: false, message: 'Internal Server Error' })
	}
})

// const imageBuffer = req.body.image
// const filename = req.body.filename;
//
// try {
// 	await fs.writeFile(`${$path}/preview/customComponents/${filename}.png`, imageBuffer, 'base64')
//
// 	res.status(200).json({
// 		success: true,
// 		message: 'Preview generated successfully',
// 	})
//
// } catch (err) {
// 	console.error('Error saving file:', err);
//
// 	return res.status(500).json({
// 		success: false,
// 		message: `Failed to save file: ${err.message}`,
// 		filename: filename
// 	});
// }

app.post('/save', async (req, res) => {
	try {
		const newPageValue = req.body.page;
		const content = req.body.html;


		if (!newPageValue || !content) {
			return res.status(500).json({
				success: false,
				message: 'forgot to send page or content'
			});
		}
		let props = {}

		try {
			props = getProps(req.body.html)
		} catch (e) {
			console.log(e)
		}


		const data = {
			content,
			props,
			date: new Date(),
			page: newPageValue
		};


		const result = await routeModel.findOneAndUpdate(
			{page: newPageValue},
			data,
			{upsert: true, new: true, lean: true}
		);
		res.status(200).json({
			success: true,
			result, data
		});

	} catch {
		res.status(500).json({
			success: false,
			message: 'Failed to save content to the database.'
		});
	}
});

app.get('/load', async (req, res) => {
	try {
		const pageValue = req.query.page || '/';
		const result = await routeModel.findOne({page: pageValue});

		if (!result) {
			return res.status(200).json({
				success: true,
				message: 'page not found'
			});
		}

		res.status(200).json({
			success: true,
			html: result?.content,
			props: result?.props
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to load HTML from database.'
		});
	}
});

app.get('/source-code', async (req, res) => {
	try {
		const pageValue = req.query.page || '/';
		console.log(pageValue)
		const result = await routeModel.findOne({page: pageValue});

		if (!result) {
			return res.status(200).json({
				success: true,
				message: "err"
			});
		}

		res.status(200).json({
			success: true,
			jsx: jsxTransform.htmlToJsx(result.content)
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to load jsx  from database.'
		});
	}
});

app.get('/delete', async (req, res) => {
	try {
		const pageValue = req.query.page;

		const result = await routeModel.deleteOne({page: pageValue});

		if (!result) {
			return res.status(200).json({
				success: true,
				message: "err"
			});
		}

		res.status(200).json({
			success: true,
			message: "page deleted"
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error
		});
	}
});

app.get('/all', async (req, res) => {
	try {
		const results = await routeModel.find();

		if (!results || results.length === 0) {
			return res.status(200).json({
				success: true,
				message: 'Pages not found'
			});
		}

		const pages = results.map(result => ({
			page: result.page,
			content: result.content
		}));

		res.status(200).json({
			success: true,
			pages
		});

	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error loading pages from database.'
		});
	}
});

app.get('/generate-preview', async (req, res) => {
	try {
		const response = await fetch(
			`${CONFIG.baseRazorUrlProd}api/custom-builder`
		)
		const data = await response.json()

		data?.forEach((component) => {
			const html = component.html
			const dom = new JSDOM(html)
			const document = dom.window.document
			const element = document.querySelector('[data-component]')

			if (!element) return
			const componentName = element.getAttribute('data-component')
			const textSVG = `${componentName} component`

			const svgData = `
        <svg width="170" height="53" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="20">${textSVG}</text>
        </svg>
      `

			fs.writeFile(`${$path}/preview/${componentName}.svg`, svgData)
		})

		res.status(200).json({success: true, message: 'Preview generated successfully'})
	} catch (error) {
		console.error(error);
		res.status(500).json({success: false, message: 'Error generating preview'})
	}
});


app.listen(8081, function () {
	console.log('App running on port 8081');
});
