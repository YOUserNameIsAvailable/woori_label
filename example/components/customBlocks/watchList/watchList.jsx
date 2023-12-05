import {useEffect, useState} from "react";
import { ThreeDots } from "react-loader-spinner";

export const  generateRandomNumber=(min, max, decimalPlaces = 2)=> {
	const randomNumber = Math.random() * (max - min) + min;
	return parseFloat(randomNumber.toFixed(decimalPlaces));
}
export const WatchList = ( ) => {
	const [randomData, setRandomDataWatchList] = useState({
		amountCardOne: 0,
		amountCardTwo: 0,
		percentageOne: 0,
		percentageTwo: 0,
		percentageTree: 0,
		percentageFour: 0
	});

	const intervalGetData = () => {
		setInterval(() => {
			setRandomDataWatchList({
				amountCardOne: generateRandomNumber(14000, 15000),
				amountCardTwo: generateRandomNumber(14000, 15000),
				percentageOne: generateRandomNumber(0, 5),
				percentageTwo: generateRandomNumber(0, 5),
				percentageTree: generateRandomNumber(0, 5),
				percentageFour: generateRandomNumber(0, 5)
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
		<div className=" bg-gray-900 flex flex-col pt-5 px-5 pb-12 ">

			<div style={{ fontSize: '20px' }}
				className=" text-white text-xl font-bold leading-relaxed mb-5 ">Stocks Watchlist</div>

			<div style={{ borderLeft: '3px solid rgb(45 212 191)' }}
				className=" w-100 h-18 border-l-3 border-solid border-teal-400 bg-black rounded-lg flex justify-between py-4 px-5 mb-2 ">
				<div className=" flex flex-col ">
					<div className=" text-white text-base font-bold leading-tight ">Kotak Group</div>
					<div style={{ fontSize: '12px' }}
						className=" text-gray-400 text-xs font-normal leading-tight ">Listed in BSE</div>
				</div>
				<div className=" flex flex-col ">
					<div className=" text-white text-base font-bold leading-tight text-right ">
						{randomData?.amountCardOne === 0 ?
							<ThreeDots
								height="14"
								width="20"
								radius="5"
								color="green"
								ariaLabel="three-dots-loading"
							/> :
							`$${randomData?.amountCardOne}`
						}
					</div>
					<div className=" text-teal-400 text-base font-bold leading-tight  flex gap-5">
						{randomData?.percentageOne === 0 ?
							<ThreeDots
								height="14"
								width="20"
								radius="5"
								color="green"
								ariaLabel="three-dots-loading"
							/> :
							`+${randomData?.percentageOne}`
						}
						{randomData?.percentageTree === 0 ?
							<ThreeDots
								height="14"
								width="20"
								radius="5"
								color="green"
								ariaLabel="three-dots-loading"
							/> :
							`(${randomData?.percentageTree}%)`
						}
					</div>
				</div>
			</div>

			<div style={{ borderLeft: '3px solid rgb(239 68 68)' }}
				className=" w-100 h-18 border-l-3 border-solid border-red-500 bg-black rounded-lg flex justify-between py-4 px-5 mb-2 ">
				<div className=" flex flex-col ">
					<div className=" text-white text-base font-bold leading-tight ">Reliance Industries</div>
					<div style={{ fontSize: '12px' }}
						className=" text-gray-400 text-xs font-normal leading-tight ">Listed in BSE</div>
				</div>
				<div className=" flex flex-col ">
					<div className=" text-white text-base font-bold leading-tight text-right ">
						{randomData?.amountCardTwo === 0 ?
							<ThreeDots
								height="14"
								width="20"
								radius="5"
								color="green"
								ariaLabel="three-dots-loading"
							/> :
							`$${randomData?.amountCardTwo}`
						}
					</div>
					<div className=" text-red-500 text-base font-bold leading-tight flex gap-5">
						{randomData?.percentageTwo === 0 ?
							<ThreeDots
								height="14"
								width="20"
								radius="5"
								color="green"
								ariaLabel="three-dots-loading"
							/> :
							`-${randomData?.percentageTwo}`
						}
						{randomData?.percentageFour === 0 ?
							<ThreeDots
								height="14"
								width="20"
								radius="5"
								color="green"
								ariaLabel="three-dots-loading"
							/> :
							`(${randomData?.percentageFour}%)`
						}
					</div>
				</div>
			</div>

		</div>
	)
}


export const builderWatchList = {
	'thumbnail': 'custom/watchList.png ',
	'category': '120',
	'html':
		`
		<div class=" bg-gray-900 flex flex-col pt-5 px-5 pb-12 " data-custom="watchList">

			<div style="font-size: 20px;"
				class=" text-white text-xl font-bold leading-relaxed mb-5 ">{Stocks Watchlist}</div>

			<div style="border-left: 3px solid rgb(45 212 191);"
				class=" w-100 h-18 border-l-3 border-solid border-teal-400 bg-black rounded-lg flex justify-between py-4 px-5 mb-2 ">
				<div class=" flex flex-col ">
					<div class=" text-white text-base font-bold leading-tight ">{Kotak Group}</div>
					<div style="font-size: 12px;"
						class=" text-gray-400 text-xs font-normal leading-tight ">{Listed in BSE}</div>
				</div>
				<div class=" flex flex-col ">
					<div class=" text-white text-base font-bold leading-tight text-right ">{$14,691.25}</div>
					<div class=" text-teal-400 text-base font-bold leading-tight">{+3.4 (0.91%)}</div>
				</div>
			</div>

			<div style="border-left: 3px solid rgb(239 68 68);"
				class=" w-100 h-18 border-l-3 border-solid border-red-500 bg-black rounded-lg flex justify-between py-4 px-5 mb-2 ">
				<div class=" flex flex-col ">
					<div class=" text-white text-base font-bold leading-tight ">{Reliance Industries}</div>
					<div style="font-size: 12px;"
						class=" text-gray-400 text-xs font-normal leading-tight ">{Listed in BSE}</div>
				</div>
				<div class=" flex flex-col ">
					<div class=" text-white text-base font-bold leading-tight text-right ">{$14,691.25}</div>
					<div class=" text-red-500 text-base font-bold leading-tight">{-4.4 (0.91%)}</div>
				</div>
			</div>

		</div>
	`
}
