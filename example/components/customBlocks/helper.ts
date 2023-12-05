export  const textFromBuilder = ({data , textName}) => {
	let foundText = '';

	if (Array.isArray(data)) {
		for (const child of data) {
			if(child?.attribs?.['data-type']){

			} else {

			}

			if (child.attribs && child.attribs['data-type'] === textName) {
				return child.children[0].data;
			}
			if (child.children) {
				foundText = textFromBuilder({data:child.children , textName});
				if (foundText) {
					break;
				}
			}
		}
	}

	return foundText;
};
