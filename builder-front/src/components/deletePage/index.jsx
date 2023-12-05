import React, {useEffect, useRef, useState} from "react";
import {isLocalhost} from "../../helpers";
import {CONFIG} from "../../config";
import axios from "axios";
import {toast} from "react-toastify";
import {FullScreenLoader} from "../fullScreenLoader";

export const DeletePage = () => {
	const ref = useRef();
	const [hostName, setHostName] = useState('localhost')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const hostName = window.location.hostname
		setHostName(hostName)
	}, []);

	const handleDelete = (e) => {
		e.preventDefault();

		try {
			setIsLoading(true)
			const baseUrl = isLocalhost(hostName) ? CONFIG.serverUrl : CONFIG.serverUrlProd;
			axios.get(`${baseUrl}delete?page=${ref.current.value}`).then(responds => {
				toast.success(responds?.data?.message)
				setIsLoading(false)

				setTimeout(() => {
					window.location.reload();
				}, 1000)
			})
		} catch (e) {
			setIsLoading(false)
			toast.error('error')
			alert(e)
		}
	}


	return (
		<>
			{isLoading && <FullScreenLoader isLoading={isLoading}/>}
			<div className="bg-white p-8 rounded-lg shadow-md w-1/3 m-auto">
				<h2 className="text-2xl font-semibold text-black mb-4">Delete Pages</h2>
				<form onSubmit={handleDelete} className="flex flex-col space-y-4">
					<div className="flex flex-col">
						<label htmlFor="pageName" className="text-sm font-medium cursor-pointer text-black">
							Page Name
						</label>
						<input
							ref={ref}
							type="text"
							id="pageName"
							className="border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 cursor-pointer">
						Delete
					</button>
				</form>
			</div>
		</>
	)
}