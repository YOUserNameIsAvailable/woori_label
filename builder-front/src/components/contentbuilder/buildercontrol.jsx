import React, {useEffect, useState} from "react";
import ContentBuilder from '@innovastudio/contentbuilder';
import "./contentbuilder.css";
import {
	addBuilderElem,
	addToggleBtnToRow, collapseBuilderElem,
	collapseRow,
	isLocalhost,
	removeBuilderElem,
	removeWithEmptyRow
} from "../../helpers";
import {CONFIG} from "../../config";
import axios from "axios";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const BuilderControl = ({rangeValue, queryPageParam, doSave, doSaveAndFinish, setIsLoading}) => {
	const [obj, setObj] = useState(null);
	const history = useHistory();

	useEffect(() => {
		const hostName = window.location.hostname

		document.addEventListener('click', function (event) {
			if (event.target && event.target.getAttribute('data-repeaterbtn') === 'addElem') {
				event.preventDefault()
				addBuilderElem(event.target);
			}

			if (event.target && event.target.getAttribute('data-repeaterbtn') === 'removeElem') {
				event.preventDefault()
				removeBuilderElem(event.target)
			}

			if (event.target && event.target.getAttribute('data-repeaterbtn') === 'collapseElem') {
				event.preventDefault()
				collapseBuilderElem(event.target)
			}

			//delete element with parent .row
			if (event.target && event.target.getAttribute('data-title') === 'Delete') {
				event.preventDefault()
				removeWithEmptyRow(event.target)
			}


			if (event.target && event.target.getAttribute('data-toggle') === 'collapseRow') {
				event.preventDefault()
				collapseRow(event.target)
			}
		})

		const containerElement = document.querySelector('.container');
		if (containerElement) {
			document.querySelector('.container').style.opacity = 0; // optional: hide editable area until content loaded
		}

		// Load language file first
		loadLanguageFile('contentbuilder/lang/en.js', () => {

			// Then init the ContentBuilder
			const contentBuilder = new ContentBuilder({
				container: '.container',
				snippetPath: `${CONFIG.serverUrlProd}files/`,  // Location of snippets' assets


				snippetCategories: [[121, "Custom"], [120, "Basic"], [118, "Article"], [101, "Headline"], [119, "Buttons"], [102, "Photos"], [103, "Profile"], [116, "Contact"], [104, "Products, Services"], [105, "Features"], [108, "Skills"], [109, "Achievements"], [106, "Process"], [107, "Pricing"], [110, "Quotes"], [111, "Partners"], [112, "As Featured On"], [113, "Page Not Found"], [114, "Coming Soon"], [115, "Help, FAQ"]],
				defaultSnippetCategory: 121,

				// OPTIONAL:
				// If you need to change some paths:
				// snippetUrl: 'assets/minimalist-blocks/content.js', // Snippet file
				// snippetPath: 'assets/minimalist-blocks/',  // Location of snippets' assets
				// modulePath: 'assets/modules/',
				// assetPath: 'assets/',
				// fontAssetPath: 'assets/fonts/',

				// Load plugins (without using config.js file)
				plugins: [
					{name: 'preview', showInMainToolbar: true, showInElementToolbar: true},
					{name: 'wordcount', showInMainToolbar: true, showInElementToolbar: true},
					{name: 'symbols', showInMainToolbar: true, showInElementToolbar: false},
					{name: 'buttoneditor', showInMainToolbar: false, showInElementToolbar: false},
				],
				pluginPath: 'contentbuilder/', // Location of the plugin scripts

				// Can be replaced with your own file/asset manager application
				imageSelect: 'assets.html',
				fileSelect: 'assets.html',
				videoSelect: 'assets.html',

				onMediaUpload: (e) => {
					uploadFile(e, (response) => {
						const uploadedImageUrl = response.data.url; // get saved file url
						contentBuilder.returnUrl(uploadedImageUrl);
					});
				},
				onVideoUpload: (e) => {
					uploadFile(e, (response) => {
						const uploadedFileUrl = response.data.url; // get saved file url
						contentBuilder.returnUrl(uploadedFileUrl);
					});
				},

				useLightbox: true,
				themes: [
					['#ffffff', '', ''],
					['#282828', 'dark', 'contentbuilder/themes/dark.css'],
					['#0088dc', 'colored', 'contentbuilder/themes/colored-blue.css'],
					['#006add', 'colored', 'contentbuilder/themes/colored-blue6.css'],
					['#0a4d92', 'colored', 'contentbuilder/themes/colored-darkblue.css'],
					['#96af16', 'colored', 'contentbuilder/themes/colored-green.css'],
					['#f3522b', 'colored', 'contentbuilder/themes/colored-orange.css'],

					['#b92ea6', 'colored', 'contentbuilder/themes/colored-magenta.css'],
					['#e73171', 'colored', 'contentbuilder/themes/colored-pink.css'],
					['#782ec5', 'colored', 'contentbuilder/themes/colored-purple.css'],
					['#ed2828', 'colored', 'contentbuilder/themes/colored-red.css'],
					['#f9930f', 'colored', 'contentbuilder/themes/colored-yellow.css'],
					['#13b34b', 'colored', 'contentbuilder/themes/colored-green4.css'],
					['#333333', 'colored-dark', 'contentbuilder/themes/colored-dark.css'],

					['#dbe5f5', 'light', 'contentbuilder/themes/light-blue.css'],
					['#fbe6f2', 'light', 'contentbuilder/themes/light-pink.css'],
					['#dcdaf3', 'light', 'contentbuilder/themes/light-purple.css'],
					['#ffe9e0', 'light', 'contentbuilder/themes/light-red.css'],
					['#fffae5', 'light', 'contentbuilder/themes/light-yellow.css'],
					['#ddf3dc', 'light', 'contentbuilder/themes/light-green.css'],
					['#c7ebfd', 'light', 'contentbuilder/themes/light-blue2.css'],

					['#ffd5f2', 'light', 'contentbuilder/themes/light-pink2.css'],
					['#eadafb', 'light', 'contentbuilder/themes/light-purple2.css'],
					['#c5d4ff', 'light', 'contentbuilder/themes/light-blue3.css'],
					['#ffefb1', 'light', 'contentbuilder/themes/light-yellow2.css'],
					['#fefefe', 'light', 'contentbuilder/themes/light-gray3.css'],
					['#e5e5e5', 'light', 'contentbuilder/themes/light-gray2.css'],
					['#dadada', 'light', 'contentbuilder/themes/light-gray.css'],

					['#3f4ec9', 'colored', 'contentbuilder/themes/colored-blue2.css'],
					['#6779d9', 'colored', 'contentbuilder/themes/colored-blue4.css'],
					['#10b9d7', 'colored', 'contentbuilder/themes/colored-blue3.css'],
					['#006add', 'colored', 'contentbuilder/themes/colored-blue5.css'],
					['#e92f94', 'colored', 'contentbuilder/themes/colored-pink3.css'],
					['#a761d9', 'colored', 'contentbuilder/themes/colored-purple2.css'],
					['#f9930f', 'colored', 'contentbuilder/themes/colored-yellow2.css'],

					['#f3522b', 'colored', 'contentbuilder/themes/colored-red3.css'],
					['#36b741', 'colored', 'contentbuilder/themes/colored-green2.css'],
					['#00c17c', 'colored', 'contentbuilder/themes/colored-green3.css'],
					['#fb3279', 'colored', 'contentbuilder/themes/colored-pink2.css'],
					['#ff6d13', 'colored', 'contentbuilder/themes/colored-orange2.css'],
					['#f13535', 'colored', 'contentbuilder/themes/colored-red2.css'],
					['#646464', 'colored', 'contentbuilder/themes/colored-gray.css'],

					['#3f4ec9', 'dark', 'contentbuilder/themes/dark-blue.css'],
					['#0b4d92', 'dark', 'contentbuilder/themes/dark-blue2.css'],
					['#006add', 'dark', 'contentbuilder/themes/dark-blue3.css'],
					['#5f3ebf', 'dark', 'contentbuilder/themes/dark-purple.css'],
					['#e92f69', 'dark', 'contentbuilder/themes/dark-pink.css'],
					['#4c4c4c', 'dark', 'contentbuilder/themes/dark-gray.css'],
					['#ed2828', 'dark', 'contentbuilder/themes/dark-red.css'],

					['#006add', 'colored', 'contentbuilder/themes/colored-blue8.css'],
					['#ff7723', 'colored', 'contentbuilder/themes/colored-orange3.css'],
					['#ff5722', 'colored', 'contentbuilder/themes/colored-red5.css'],
					['#f13535', 'colored', 'contentbuilder/themes/colored-red4.css'],
					['#00bd79', 'colored', 'contentbuilder/themes/colored-green5.css'],
					['#557ae9', 'colored', 'contentbuilder/themes/colored-blue7.css'],
					['#fb3279', 'colored', 'contentbuilder/themes/colored-pink4.css'],
				],
			});

			contentBuilder.loadSnippets('assets/minimalist-blocks/content.js'); // Load snippet file

			document.addEventListener('dragstart', function (event) {
				if (!event.target.querySelector('img')) return
				const imgSrc = event.target.querySelector('img').getAttribute('src').split('/')
				const componentNameParts = imgSrc[imgSrc.length - 1].split('.')[0];
				event.dataTransfer.setData('text/plain', componentNameParts);
			})


			document.addEventListener('drop', function (event) {
				const componentName = event.dataTransfer.getData('text/plain');

				if (!componentName) return
				setTimeout(() => {
					const html = contentBuilder.html()
					if (html) {
						const tempHtml = addToggleBtnToRow(html, componentName)
						contentBuilder.loadHtml(tempHtml)
					}
				}, 0)
			})

			const currentHost = `${isLocalhost(hostName) ? CONFIG.serverUrl : CONFIG.serverUrlProd}`

			axios.get(
				`${currentHost}${queryPageParam !== '' ? `load?page=${queryPageParam}` : 'load'}`,
			).then((response) => {
				let html;

				if (response.data.html) {
					html = addToggleBtnToRow(response.data.html);
				}

				document.querySelector('.container').style.opacity = 1;
				contentBuilder.loadHtml(html);
				setObj(contentBuilder);
			}).catch((error) => {
				console.error('error', error);
			});

			// https://stackoverflow.com/questions/37949981/call-child-method-from-parent
			if (doSave) doSave(() => saveContent(contentBuilder, 'doSave'))
			if (doSaveAndFinish) doSaveAndFinish(() => saveContentAndFinish(contentBuilder, 'doSaveAndFinish'))
		})

		return () => {
			obj?.destroy();
		};
	}, []);


	const loadLanguageFile = (languageFile, callback) => {
		if (!isScriptAlreadyIncluded(languageFile)) {
			const script = document.createElement("script");
			script.src = languageFile;
			script.async = true;
			script.onload = () => {
				if (callback) callback();
			};
			document.body.appendChild(script);
		} else {
			if (callback) callback();
		}
	};

	const isScriptAlreadyIncluded = (src) => {
		const scripts = document.getElementsByTagName("script");
		for (let i = 0; i < scripts.length; i++)
			if (scripts[i].getAttribute('src') === src) return true;
		return false;
	};

	const uploadFile = (e, callback) => {
		const selectedFile = e.target.files[0];
		const filename = selectedFile.name;
		const reader = new FileReader();
		reader.onload = (e) => {
			let base64 = e.target.result;
			base64 = base64.replace(/^data:(.*?);base64,/, "");
			base64 = base64.replace(/ /g, '+');

			// Upload process (need only prod)
			axios.post(
				`${CONFIG.serverUrlProd}upload`,
				{image: base64, filename: filename}
			).then((response) => {

				callback(response);

			}).catch((err) => {
				console.log(err);
			});
		};
		reader.readAsDataURL(selectedFile);
	};

	const save = (contentBuilder, callback) => {
		// Save all embedded base64 images first
		setIsLoading(true)
		contentBuilder.saveImages('', () => {
			const hostName = window.location.hostname

			// Then save the content
			let html = contentBuilder.html();
			const data = {
				html: html,
				page: queryPageParam
			};

			axios.post(
				`${isLocalhost(hostName) ? CONFIG.serverUrl : CONFIG.serverUrlProd}save`,
				data
			).then((response) => {
				// Saved Successfully
				if (callback === 'doSaveAndFinish') {
					toast.success('Page saved')
					history.push('/');
				} else toast.success('Page saved')

				// if (callback) callback(html);

			}).catch((err) => {
				console.log(err);
				setIsLoading(false)
			}).finally(() => {
				setIsLoading(false)
			});

		}, (img, base64, filename) => {
			// Upload image process (need only prod)
			axios.post(
				`${CONFIG.serverUrlProd}upload`,
				{image: base64, filename: filename}
			).then((response) => {

				const uploadedImageUrl = response.data.url; // get saved image url

				img.setAttribute('src', uploadedImageUrl); // set image src

			}).catch((err) => {
				console.error('Image upload error:', err); // Log the image upload error
			});

		});
	};

	const saveContent = (contentBuilder, callback) => {
		save(contentBuilder, callback);
	};

	const saveContentAndFinish = (contentBuilder, callback) => {
		save(contentBuilder, callback);
	};


	return (
		<div className="container" style={{width: `${rangeValue}px`}}></div>
	);
}


export default BuilderControl;
