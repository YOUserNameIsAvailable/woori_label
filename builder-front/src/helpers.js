
export const isLocalhost = (hostname) => {
	if (hostname === 'localhost') return true
}

export const addBuilderElem = (btn) => {
	document.querySelector('#divButtonTool').style.display = "none"
	document.querySelector('.is-element-tool').style.display = "none"
	const previousElement = btn.previousElementSibling;
	if (previousElement) {
		const clonedElement = previousElement.cloneNode(true);
		btn.parentNode.insertBefore(clonedElement, btn);
	}
}

export const removeBuilderElem = (btn) => {
	const parent = btn.closest('[data-component]')
	if (parent.children.length > 2) {
		const element = btn.closest('[data-repeater]')
		element.remove();
	}
}

export const collapseBuilderElem = (btn) => {
	const parent = btn.closest('[data-repeater]')
	const collapseElem = parent.querySelector('[data-repeaterbody]')
	const isActive = collapseElem.classList.contains('active')

	btn.textContent = isActive ? 'Expanded' : 'Collapsed';

	collapseElem.classList[isActive ? 'remove' : 'add']('active')
}

export const removeWithEmptyRow = (btn) => {
	const parentRow = btn.closest('.row')
	const hasContentEditableElements = parentRow.querySelector('[contenteditable]');
	if (!hasContentEditableElements) parentRow.remove();
}

const buttonClasses = [
	'transition-all', 'inline-block', 'whitespace-nowrap', 'cursor-pointer', 'no-underline', 'border-2', 'border-solid',
	'mb-3', 'rounded', 'tracking-75', 'uppercase', 'px-6', 'py-2', 'size-12', 'hover:border-transparent', 'font-semibold',
	'bg-gray-200', 'border-transparent', 'hover:bg-gray-300', 'text-gray-800', 'leading-relaxed', 'text-center', 'w-full'
]

const rowClasses = [
	'showComponent', 'row-active', 'row-outline'
]

export const addToggleBtnToRow = (html, componentName) => {
	const parser = new DOMParser()
	const parsedHtml = parser.parseFromString(html, 'text/html')
	const rowElements = parsedHtml.querySelectorAll('.row')

	rowElements.forEach(row => {
		const customComponent = row.querySelector('[data-component]')
		if(!customComponent) return
		row.classList.add('customRow')

		const toggleBtn = row.querySelector('[data-toggle="collapseRow"]')
		if (toggleBtn) {
			toggleBtn.setAttribute('data-click', 'false')
			return
		}

		const btnName = customComponent.getAttribute('data-component');

		if (btnName === componentName) {
			row.classList.add(...rowClasses)
		}

		const columnElement = row.querySelector('.column');
		if (columnElement) {
			const button = document.createElement('button');
			button.setAttribute('data-toggle', 'collapseRow');
			button.setAttribute('data-click', 'false');
			button.classList.add(...buttonClasses);
			button.textContent = btnName;

			columnElement.insertBefore(button, customComponent);
		}
	})

	return parsedHtml.documentElement.innerHTML
}

export const collapseRow = (btn) => {

	const customComponent = btn.closest('.row').querySelector('[data-component]')
	if(!customComponent) return

	document.querySelector('#divButtonTool').style.display = "none"
	document.querySelector('.is-element-tool').style.display = "none"
	const isActive = btn.closest('.row').classList.contains('showComponent')

	btn.closest('.row').classList[isActive ? 'remove' : 'add'](...rowClasses)
	document.body.classList[isActive ? 'remove' : 'add']('content-edit')
	btn.closest('.is-builder').classList[isActive ? 'remove' : 'add']('builder-active')
}
