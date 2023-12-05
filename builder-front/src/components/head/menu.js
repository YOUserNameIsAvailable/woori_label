import {ThreeCircles} from "react-loader-spinner";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CONFIG} from "../../config";
import {toast} from "react-toastify";
import {createPortal} from "react-dom";
import {FullScreenLoader} from "../fullScreenLoader";

export const Menu = () => {

	const [lock, setLock] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const closeMenu = (e) => {
			if (isOpen && e.target.closest('.dropdown') === null) {
				setIsOpen(false);
			}
		};

		window.addEventListener('click', closeMenu);

		return () => {
			window.removeEventListener('click', closeMenu);
		};
	}, [isOpen]);

	useEffect(() => {
		const buttonClickTime = localStorage.getItem('clickRebuildTime')
		if (buttonClickTime) {
			const currentTime = new Date().getTime()
			const timeDifference = currentTime - parseInt(buttonClickTime)
			if (timeDifference >= 2 * 60 * 1000) {
				setLock(false)
			} else setLock(true)
		}
	}, []);

	const onHandlerRebuild = async () => {
		try {
			setLock(true)
			const currentTime = new Date().getTime()
			localStorage.setItem('clickRebuildTime', currentTime.toString())
			await fetch('https://api.vercel.com/v1/integrations/deploy/prj_Q3Am2SsoSQDBXLZVEgD4IVnophCS/CM4rH0Qt6I')
			toast.success('rebuild started')
		} catch (e) {
			console.log(e)
			setLock(false)
			toast.error('rebuild error')
		}
	}

	const onHandlerCreatePreviews = async () => {
		try {
			setIsLoading(true)
			await axios.get(`${CONFIG.serverUrlProd}upload-preview`)
				.then(data => {
					setIsLoading(false)
					console.log('response ', data.data)
					toast.success(data.data.message)
			})
		} catch (error) {
			setIsLoading(false)
			toast.error(error.message || 'error')
			console.error("error:", error)
		}
	}

	return (
		<>
			{isLoading && <FullScreenLoader isLoading={isLoading}/>}

			<div className="head-btn-box justify-center items-center flex-wrap gap-2 flex w-1/2 ">
				<a href="/" className="text-center transition-all inline-block cursor-pointer no-underline border-2 border-solid border-transparent mb-2 hover:border-transparent bg-gray-200 hover:bg-gray-300 size-14 tracking-75 uppercase py-2 px-5  font-semibold text-gray-600 rounded-full">
					Home
				</a>
				<a href="/edit" className="text-center transition-all inline-block cursor-pointer no-underline border-2 border-solid mb-2  size-14 tracking-75 uppercase py-2 px-5  border-current text-indigo-500 hover:bg-indigo-500 hover:text-white hover:border-transparent font-semibold rounded-full">
					+ Add new page
				</a>

				<div className="relative group dropdown">
					<button onClick={toggleDropdown} className="text-center transition-all inline-block cursor-pointer no-underline border-2 border-solid border-gray-200 mb-2 hover:border-gray-300 hover:bg-gray-300 size-14 tracking-75 uppercase py-2 px-5  font-semibold text-gray-200 hover:text-gray-600 rounded-full focus:outline-none">
						Options
					</button>
					{isOpen && (
						<ul className="absolute z-10 w-40 rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<li>
								<button disabled={lock} onClick={onHandlerRebuild} className="block px-4 py-2 text-sm bg-red-500 hover:bg-red-700 text-white text-left w-full">
									Rebuild
								</button>
							</li>
							<li>
								<button disabled={isLoading} onClick={onHandlerCreatePreviews} className="block px-4 py-2 text-sm bg-red-500 hover:bg-red-700 text-white text-left w-full">
									Generate Preview
								</button>
							</li>
						</ul>
					)}
				</div>
			</div>
		</>
	)
}