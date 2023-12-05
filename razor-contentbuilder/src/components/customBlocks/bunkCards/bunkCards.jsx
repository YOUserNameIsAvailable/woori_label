import Image from "next/image"
import {useEffect, useState} from "react";
import { ThreeDots } from "react-loader-spinner";

export const  generateRandomNumber=(min, max, decimalPlaces = 2)=> {
	const randomNumber = Math.random() * (max - min) + min;
	return parseFloat(randomNumber.toFixed(decimalPlaces));
}


export const BunkCards = () => {

	const [randomData, setRandomData] = useState({
		amountCardOne: 0,
		amountCardTwo: 0,
		percentageOne: 0,
		percentageTwo: 0,
		percentageTree: 0,
		percentageFour: 0
	});

	const intervalGetData = () => {
		setInterval(() => {
			setRandomData({
				amountCardOne: generateRandomNumber(17000, 18000),
				amountCardTwo: generateRandomNumber(59000, 60000),
				percentageOne: generateRandomNumber(100, 200),
				percentageTwo: generateRandomNumber(0, 1),
				percentageTree: generateRandomNumber(500, 600),
				percentageFour: generateRandomNumber(0, 1)
			})
		}, 2000)
	}

	useEffect(() => {
		intervalGetData()

		return () => {
			clearInterval(intervalGetData)
		};
	}, []);

	return (
		<div className="flex flex-row py-2 px-6 justify-around bg-gray-900 space-x-2" data-custom="bunkCards">
			<div style={{ position: 'relative', overflow: 'hidden' }}
				className="flex flex-col px-3 py-4 items-start rounded-lg w-1/2">
				<Image width={160} height={180} src="/assets/minimalist-blocks/images/Rectangle-bank-card-1.png"
					style={{
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center'
					}} alt="" />

				<Image width={40} height={40}  style={{ width: '40px', height: '40px', zIndex: '2' }}
					className="w-10 h-10 rounded-full mb-2"
					src="/assets/minimalist-blocks/images/image-thumbnail-1.png"
					alt="" />
				<div style={{ fontSize: '18px', zIndex: '2' }}
					className="text-white text-lg font-bold leading-tight mb-1">HDFC Fund</div>
				<div style={{ fontSize: '12px', zIndex: '2' }}
					className="text-gray-400 text-xs font-normal leading-tight mb-3">NSE</div>
				<div style={{ fontSize: '14px', zIndex: '2' }}
				     className="text-white text-sm font-bold leading-none mb-1">
					{randomData.amountCardOne === 0 ?
						<ThreeDots
							height="14"
							width="20"
							radius="5"
							color="green"
							ariaLabel="three-dots-loading"
						/> :
						randomData.amountCardOne
					}
				</div>
				<div style={{fontSize: '12px', zIndex: '2'}}
				     className="text-teal-400 text-xs font-bold leading-tight flex gap-5">
					{randomData.percentageOne === 0 ?
						<ThreeDots
							height="14"
							width="20"
							radius="5"
							color="green"
							ariaLabel="three-dots-loading"
						/> :
						`+${randomData.percentageOne}`
					}
					{randomData.percentageTwo === 0 ?
						<ThreeDots
							height="14"
							width="20"
							radius="5"
							color="green"
							ariaLabel="three-dots-loading"
						/> :
						`(${randomData.percentageTwo}%)`
					}
				</div>
			</div>

			<div style={{ position: 'relative', overflow: 'hidden' }} className="flex flex-col pl-4 pr-3 pt-4 pb-6 items-start rounded-lg w-1/2">

				<Image width={160} height={180} src="/assets/minimalist-blocks/images/Rectangle-bank-card-2.png"
					style={{
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center'
					}} alt="" />

				<Image width={40} height={40} style={{ width: '40px', height: '40px', zIndex: '2' }}
					className="w-10 h-10 rounded-full mb-2"
					src="/assets/minimalist-blocks/images/image-thumbnail-2.png"
					alt="" />
				<div style={{ fontSize: '18px', zIndex: '2' }}
					className="text-white text-lg font-bold leading-tight mb-1">Axis Bank</div>
				<div style={{ fontSize: '12px', zIndex: '2' }}
					className="text-gray-400 text-xs font-normal leading-tight mb-3">BSE</div>
				<div style={{ fontSize: '14px', zIndex: '2' }}
					className="text-white text-sm font-bold leading-none mb-1">
					{randomData.amountCardTwo === 0 ?
						<ThreeDots
							height="14"
							width="20"
							radius="5"
							color="green"
							ariaLabel="three-dots-loading"
						/> :
						randomData.amountCardTwo
					}
				</div>
				<div style={{ fontSize: '12px', zIndex: '2' }}
					className="text-teal-400 text-xs font-bold leading-tight flex gap-5">
					{randomData.percentageTree === 0 ?
					<ThreeDots
						height="14"
						width="20"
						radius="5"
						color="green"
						display="inline-block"
						ariaLabel="three-dots-loading"
					/> :
					`+${randomData.percentageTree}`
				}
					{randomData.percentageFour === 0 ?
					<ThreeDots
						height="14"
						width="20"
						radius="5"
						color="green"
						ariaLabel="three-dots-loading"
					/> :
						`(${randomData.percentageFour}%)`
				}</div>
			</div>
		</div>
	)
}

export const builderBunkCards = {
	'thumbnail': 'custom/bunkCards.png ',
	'category': '120',
	'html':
		`
		<div class=" flex flex-row py-2 px-6 justify-around bg-gray-900 space-x-2 " data-custom="bunkCards">

			<div style=" position: relative; overflow: hidden;"
				class=" flex flex-col px-3 py-4 items-start rounded-lg w-1/2">
				<img src="assets/minimalist-blocks/images/Rectangle-bank-card-1.png"
				 style="
					position: absolute;
					top: 0; left: 0; 
					width: 100%; height: 100%;
					object-fit: cover; object-position: center; "/>

				<img style="width: 40px; height: 40px; z-index:2"
					class=" w-12 h-12 rounded-full mb-2 " src="assets/minimalist-blocks/images/image-thumbnail-1.png" alt="" />
				<div style="font-size: 18px; z-index:2"
					class=" text-white text-lg font-bold leading-tight mb-1 ">HDFC Fund</div>
				<div style="font-size: 12px; z-index:2;"
					class=" text-gray-400 text-xs font-normal leading-tight mb-3 ">NSE</div>
				<div style="font-size: 14px; z-index:2;"
					class=" text-white text-sm font-bold leading-none mb-1 ">{17,691.25}</div>
				<div style="font-size: 12px; z-index:2;"
					class=" text-teal-400 text-xs font-bold leading-tight ">+{159.20 (0.91%)}</div>
			</div>

			
			<div style=" position: relative; overflow: hidden;"
				class=" flex flex-col px-3 py-4 items-start rounded-lg w-1/2">

				<img src="assets/minimalist-blocks/images/Rectangle-bank-card-2.png"
				style="
					position: absolute;
					top: 0; left: 0; 
					width: 100%; height: 100%;
					object-fit: cover; object-position: center; "/>

				<img style="width: 40px; height: 40px; z-index:2"
					class=" w-12 h-12 rounded-full mb-2 " src="assets/minimalist-blocks/images/image-thumbnail-2.png" alt="" />
				<div style="font-size: 18px; z-index:2"
					class=" text-white text-lg font-bold leading-tight mb-1 ">Axis Bank</div>
				<div style="font-size: 12px; z-index:2"
					class=" text-gray-400 text-xs font-normal leading-tight mb-3 ">BSE</div>
				<div style="font-size: 14px; z-index:2"
					class=" text-white text-sm font-bold leading-none mb-1 ">{59,299.32}</div>
				<div style="font-size: 12px; z-index:2"
					class=" text-teal-400 text-xs font-bold leading-tight ">+{533.74 (0.91%)}</div>
					
			</div>

		</div>
	`
}
