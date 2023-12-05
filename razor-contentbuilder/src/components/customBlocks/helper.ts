import {domToReact} from "html-react-parser";

export const textFromBuilder = ({data, textName}: any) => {
	let foundText = '';

	if (Array.isArray(data)) {
		for (const child of data) {
			if (child?.attribs?.['data-text']) {
				console.log(child?.attribs)
			} else {

			}

			if (child.attribs && child.attribs['data-type'] === textName) {
				return child.children[0].data;
			}
			if (child.children) {
				foundText = textFromBuilder({data: child.children, textName});
				if (foundText) {
					break;
				}
			}
		}
	}

	return foundText;
};


export const propsFromBuilder = (children:any) => {
	let foundText = '';
	console.log(typeof  children)
	console.log(Array.isArray(children)  )

	children?.forEach(node => {
		const { attribs, name, children } = node;

		if (attribs) {
			if (name === 'img' && attribs['data-srcpropsname'] === 'mainImage') {
				console.log('src картинки:', attribs.src);
			}

			if (attribs['data-textpropsname'] === 'mainText') {
				console.log('Текст компонента:', domToReact(children));
			}
		}

		// Рекурсивный вызов для дочерних элементов
		if (children) {
			propsFromBuilder(children);
		}
	});

	return foundText;
};
