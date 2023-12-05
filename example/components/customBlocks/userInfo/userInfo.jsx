import Image from "next/image";
import {useEffect, useState} from "react";
import {generateRandomNumber} from "components/customBlocks/watchList/watchList";
import {textFromBuilder} from "components/customBlocks/helper";

const randomNames = [
	"Joi Doo",
	"username1",
	"username2",

]


const mainTextName = "main-text"





export const UserInfo = ({data}) => {
	const mainTextFromBuilder = textFromBuilder({data , textName:mainTextName});

	const [name,setName] = useState("loading")
	useEffect(()=>{
 		const random = 	 generateRandomNumber(0, 2 , 0);
		setName(randomNames[random]||"username")

	},[])
	return (
		<div className="w-100 h-16 flex justify-start px-5 py-4 bg-gray-900 space-x-3 ">
			<Image width={48} height={48} className="w-12 h-12 rounded-full fill-current" src="/assets/minimalist-blocks/images/image-thumbnail.png" alt="" />
			<div>
				<div style={{fontSize: '12px' }}
				 className="text-xs text-gray-400 font-normal leading-none "> {mainTextFromBuilder}</div>
				<div style={{fontSize: '20px' }}
				className="text-white text-xl font-bold leading-relaxed">{name}</div>
			</div>
		</div>
	)
}


export const builderUserInfo = {
	'thumbnail': 'custom/userInfo.png ',
	'category': '120',
	'html':
		`
		<div class="w-100 h-16 flex justify-start px-5 py-4 bg-gray-900 space-x-3 " data-custom="userInfo">
			<img style="width: 48px; height: 48px;"
			 class="w-12 h-12 rounded-full" src="/assets/minimalist-blocks/images/image-thumbnail.png" alt="" />
			<div>
				<div data-type="${mainTextName}"  style="font-size: 12px;"
				 class="text-gray-400 text-xs font-normal leading-none">Welcome back,</div>
				<div style="font-size: 20px;"
				 class="text-white text-xl font-bold leading-relaxed"> {name}</div>
			</div>
		</div>

	`
}


