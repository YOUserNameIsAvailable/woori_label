const {JSDOM} = require('jsdom');

const getProps = (html) => {
	const dom = new JSDOM(html);
	const document = dom.window.document;
	const elements = document.querySelectorAll('[data-component]');
	const customProps = {};

	elements.forEach((element, i) => {
		const componentType = element.getAttribute('data-component') || "type-error";
		customProps[componentType + "" + i] = {};

		const dataProps = element.querySelector('[data-props]')
		if (dataProps) {
			const repeaterNodes = dataProps.querySelectorAll('[data-propsname]');
			repeaterNodes.forEach(props => {
				const propsName = props.getAttribute('data-propsname') || "propsname-error";

				try {
					const fields = JSON.parse(propsName);

					Object.entries(fields).forEach(field => {
						const propsName = field[0];
						const propSource = field[1];

						customProps[componentType + "" + i][propsName] = props[propSource];
					})
				} catch (e) {
					console.log(e);
				}
			})
		}

		const repeaterElements = element.querySelectorAll('[data-repeater]');

		if (repeaterElements.length > 0) {
			const repeaterKey = repeaterElements[0].getAttribute('data-repeater');
			const repeaterArray = [];

			repeaterElements.forEach((repeaterElement, j) => {
				const repeaterProps = {};
				const repeaterNodes = repeaterElement.querySelectorAll('[data-propsname]');
				let imageProps = {};

				repeaterNodes.forEach((node) => {
					const propsName = node.getAttribute('data-propsname') || "propsname-error";
					try {
						const fields = JSON.parse(propsName);
						Object.entries(fields).forEach(field => {
							const propsName = field[0];
							const propSource = field[1];

							if (node.tagName === 'IMG') {
								if (!imageProps.image) {
									imageProps.image = {};
								}
								imageProps.image[propsName] = node[propSource];
							} else {
								repeaterProps[propsName] = node[propSource];
							}
						});

						repeaterProps.image = imageProps.image;
					} catch (e) {
						console.log(e);
					}

				});

				repeaterArray.push(repeaterProps);
			});

			customProps[componentType + "" + i][repeaterKey] = repeaterArray;
		} else {
			const componentProps = customProps[componentType + "" + i];
			const editableNodes = element.querySelectorAll('[data-propsname]');
			// let imageProps = {};

			editableNodes.forEach((node) => {
				const propsName = node.getAttribute('data-propsname') || "propsname-error";
				try {
					const fields = JSON.parse(propsName);
					Object.entries(fields).forEach(field => {
						const propsName = field[0];
						const propSource = field[1];
						componentProps[propsName] = node[propSource];
					});
				} catch (e) {
					console.log(e);
				}

				// for make obj with obj image
				// try {
				// 	const fields = JSON.parse(propsName);
				// 	Object.entries(fields).forEach(field => {
				// 		const propsName = field[0];
				// 		const propSource = field[1];
				//
				// 		if (node.tagName === 'IMG') {
				// 			console.log('propsName', propsName)
				// 			console.log('propSource ', propSource)
				// 			if (!imageProps.image) {
				// 				imageProps.image = {};
				// 			}
				// 			imageProps.image[propsName] = node[propSource];
				// 		} else {
				// 			componentProps[propsName] = node[propSource];
				// 		}
				// 	});
				//
				// 	componentProps.Image = imageProps.image;
				// } catch (e) {
				// 	console.log(e);
				// }
			});
		}
	});

	return JSON.stringify(customProps);
}

module.exports = getProps;
