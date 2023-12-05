import React, {Component} from "react";
import ContentBuilder from '@innovastudio/contentbuilder';
import "./contentbuilder.css";
import {instanceAxios} from "../../axiosConfig";

class BuilderControl extends Component {
	constructor(props) {
		super(props);

		this.saveContent = this.saveContent.bind(this);
		this.saveContentAndFinish = this.saveContentAndFinish.bind(this);
	}

	componentDidMount() {

		document.querySelector('.container').style.opacity = 0; // optional: hide editable area until content loaded

		// Load language file first
		this.loadLanguageFile('contentbuilder/lang/en.js', () => {

			// Then init the ContentBuilder
			this.obj = new ContentBuilder({
				container: '.container',

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
					this.uploadFile(e, (response) => {
						const uploadedImageUrl = response.data.url; // get saved file url
						this.obj.returnUrl(uploadedImageUrl);
					});
				},
				onVideoUpload: (e) => {
					this.uploadFile(e, (response) => {
						const uploadedFileUrl = response.data.url; // get saved file url
						this.obj.returnUrl(uploadedFileUrl);
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

			this.obj.loadSnippets('assets/minimalist-blocks/content.js'); // Load snippet file
			const {queryPageParam} = this.props;

			instanceAxios.get(queryPageParam !== '' ? `/load?page=${queryPageParam}` : '/load').then((response) => {
				let html;

				if (response.data.html) {
					html = response.data.html;
				}

				document.querySelector('.container').style.opacity = 1;
				this.obj.loadHtml(html);

			}).catch((error) => {
				console.error('error', error);
			});

		});

		// https://stackoverflow.com/questions/37949981/call-child-method-from-parent
		if (this.props.doSave) this.props.doSave(this.saveContent);  // Make it available to be called using doSave
		if (this.props.doSaveAndFinish) this.props.doSaveAndFinish(this.saveContentAndFinish);
	}

	loadLanguageFile = (languageFile, callback) => {
		if (!this.isScriptAlreadyIncluded(languageFile)) {
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

	isScriptAlreadyIncluded = (src) => {
		const scripts = document.getElementsByTagName("script");
		for (let i = 0; i < scripts.length; i++)
			if (scripts[i].getAttribute('src') === src) return true;
		return false;
	};

	uploadFile = (e, callback) => {
		const selectedFile = e.target.files[0];
		const filename = selectedFile.name;
		const reader = new FileReader();
		reader.onload = (e) => {
			let base64 = e.target.result;
			base64 = base64.replace(/^data:(.*?);base64,/, "");
			base64 = base64.replace(/ /g, '+');

			// Upload process
			instanceAxios.post('/upload', {image: base64, filename: filename}).then((response) => {

				callback(response);

			}).catch((err) => {
				console.log(err);
			});
		};
		reader.readAsDataURL(selectedFile);
	};

	save = (callback) => {

		const {queryPageParam} = this.props;
		// Save all embedded base64 images first
		this.obj.saveImages('', () => {

			// Then save the content

			let html = this.obj.html();
			const data = {
				html: html,
				page: queryPageParam
			};

			instanceAxios.post('/save', data).then((response) => {
				// Saved Successfully
				if (callback) callback(html);

			}).catch((err) => {
				console.log(err);
			});

		}, (img, base64, filename) => {

			// Upload image process
			instanceAxios.post('upload/', {image: base64, filename: filename}).then((response) => {

				const uploadedImageUrl = response.data.url; // get saved image url

				img.setAttribute('src', uploadedImageUrl); // set image src

			}).catch((err) => {
				console.log(err);
			});

			/*  try {
						const response =  instanceAxios.post('upload/', { image: base64, filename: filename });
						const uploadedImageUrl = response.data.url; // get saved image url
						img.setAttribute('src', uploadedImageUrl);  // set image src
				} catch (err) {
						console.log(err);
				}*/

		});
	};

	saveContent = () => {
		this.save((html, serverHtml) => {
			this.props.onSave(html, serverHtml);
		});
	};

	saveContentAndFinish = () => {
		this.save((html, serverHtml) => {
			this.props.onSaveAndFinish(html, serverHtml);
		});
	};

	componentWillUnmount() {
		this.obj.destroy();
	}

	render() {
		return (
			<div className="container" style={{width:`${this.props.rangeValue}px`}}></div>
		);
	}
}

BuilderControl.defaultProps = {};

export default BuilderControl;
