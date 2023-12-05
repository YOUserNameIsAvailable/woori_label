import React  from 'react';
import parse from 'html-react-parser';
import {Converter} from 'components/customBlocks/converter/converter';
import {Request} from 'components/customBlocks/request/request';
import appConfig from 'config/app.config';
import Image from "next/image";
import {UserInfo} from "components/customBlocks/userInfo/userInfo";
import {InviteFriend} from "components/customBlocks/inviteFriendCard/inviteFriendCard";
import {BunkCards} from "components/customBlocks/bunkCards/bunkCards";
import {WatchList} from "components/customBlocks/watchList/watchList";

const formatStyles = (styles) => {
	if (!styles) return

	const stylesArr = styles.split(';')
	const styleObject = {}

	stylesArr.forEach(style => {
		const [propertyName, propertyValue] = style.split(':')
		if (propertyName && propertyValue) styleObject[propertyName.trim()] = propertyValue.trim()
	})

	return styleObject
}



const PageExample = ({dataFromCms}) => {



	const options = {
		replace: ({ attribs, children, name }) => {
			if (!attribs) return

			switch (attribs['data-custom']) {
				case 'converter' : return <Converter data={children}/>
				case 'request' : return <Request data={children}/>
				case 'userInfo' : return <UserInfo data={children}/>
				case 'inviteFriend' : return <InviteFriend   data={children}/>
				case 'bunkCards' : return <BunkCards data={children}/>
				case 'watchList' :   return <WatchList data={children} />
			}

			switch (name) {
				case 'img' : {
					const imgStyles = attribs.style ? formatStyles(attribs.style) : ''
					const width = imgStyles ? +imgStyles?.width.match(/\d+/) : 100
					const height = imgStyles ?  +imgStyles?.height.match(/\d+/) : 100
					const path = attribs.src.split('/')[0]

					return <Image width={width} height={height} src={`${path === 'assets' ? appConfig.imgUrl : ''}${attribs.src}`} alt=''/>
				}
			}
		}
	}

	const jsx = parse(dataFromCms, options);


	return (
		<>{jsx}</>
	)
}

export async function getServerSideProps({ query }) {
	const { slug } = query;

	try {
		const response = await fetch(`${appConfig.baseUrl}load?page=${slug}`)
		const data = await response.json()
		const html = data.html


		return {
			props: {
				dataFromCms: html,
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
