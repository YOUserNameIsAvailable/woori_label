import React, {useEffect, useState} from 'react'
import parse from 'html-react-parser'

import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import Layout from "@components/layout/layout";
import Container from '@components/ui/container';
import {BuilderImage} from "src/builderComponents/builderImage"
import {List_Of_Components} from "@components/list"
import {CONFIG_RAZOR} from "@components/config"
import {isLocalhost} from "../../services/helpers"


const formatStyles = (styles: string | undefined): { [key: string]: string } => {
	if (!styles) return {};


	const stylesArr = styles.split(';')
	const styleObject: { [key: string]: string } = {}

	stylesArr.forEach((style: string) => {
		const [propertyName, propertyValue] = style.split(':')
		if (propertyName && propertyValue) styleObject[propertyName.trim()] = propertyValue.trim()
	})

	return styleObject
}


const PageExample = ({dataFromCms, builderProps}: any) => {
	const [hostName, setHostName] = useState('localhost')
	console.log('PageBuilderProps ', builderProps)

	useEffect(() => {
		const hostName = window.location.hostname
		setHostName(hostName)
	}, [])

	let counter = 0
	const options = {
		replace: ({ attribs, name }: any) => {
			if (!attribs) return;

			const componentName = attribs['data-component'];

			if (componentName) {
				const uniqueComponentName = `${componentName}${counter}`;
				counter += 1;

				const componentProps = builderProps[uniqueComponentName] || {};
				const Component = List_Of_Components[componentName];

				return <Component {...componentProps} />;
			}

			switch (name) {
				case 'img': {
					const imgStyles = attribs.style ? formatStyles(attribs.style) : ''
					const width = imgStyles ? +parseInt(imgStyles.width) : 480
					const height = imgStyles ? +parseInt(imgStyles.height) : 600

					return <BuilderImage
						width={width} height={height}
						src={`${isLocalhost(hostName) ? CONFIG_RAZOR.baseRazorUrl : CONFIG_RAZOR.baseRazorUrlProd}${attribs.src}`}
						alt=''/>
				}
			}
		}
	}

	const jsx = parse(dataFromCms, options)


	return (
		<Container>
			{jsx}
		</Container>
	)
}

PageExample.Layout = Layout


export async function getServerSideProps({query, locale, req}) {
	const {slug} = query;
	const hostname = new URL(`http://${req.headers.host}`).hostname;
	const baseUrl = isLocalhost(hostname) ? `${CONFIG_RAZOR.serverUrl}` : `${CONFIG_RAZOR.serverUrlProd}`


	try {
		const response = await fetch(`${baseUrl}load?page=${slug}`)
		const data = await response.json()
		const html = data.html
		let builderProps = {}
		if (data?.props) {
			try {
				builderProps = JSON.parse(data?.props)
			} catch (e) {
				console.log(e)
			}
		}


		return {
			props: {
				dataFromCms: html, builderProps,
				...(await serverSideTranslations(locale!, [
					'common',
					'forms',
					'menu',
					'footer',
				])),
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error)
		return {
			props: {
				dataFromCms: '',
			},
		};
	}
}

export default PageExample
