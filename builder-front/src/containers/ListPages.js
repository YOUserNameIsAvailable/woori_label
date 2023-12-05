import {useEffect, useState} from "react";
import "./ListPages.css";
import axios from "axios";
import {CONFIG} from "../config";
import {isLocalhost} from "../helpers";
import {DeletePage} from "../components/deletePage";

export default function ListPages() {
	const [listPages, setListPages] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hostName, setHostName] = useState('localhost')

	useEffect(() => {
		const hostname = window.location.hostname
		setHostName(hostname)

		setTimeout(() => {
			onLoad().then();
		}, 100)

	}, [hostName]);

	async function onLoad() {
		setIsLoaded(false);

		try {
			const response = await axios.get(`${isLocalhost(hostName) ? CONFIG.serverUrl : CONFIG.serverUrlProd}all`)
			const data = response.data;

			if (data.success) {
				setListPages(data.pages || []);
				setIsLoaded(true);
			} else {
				console.error(data.message);
			}
		} catch (error) {
			console.error("error:", error);
		}
	}

	return (
		<div className="container-box">
			{isLoaded ? (
				listPages.length > 0 ? (
					<ul>
						{listPages.map((page, index) => {
							const url = `edit?page=${page.page}`;
							return (
								<li className="mb-1" key={index}>
									<a className="hover:bg-indigo-50 p-1" href={url}>Edit {page.page}</a>
								</li>
							);
						})}
					</ul>
				) : (
					<p className="px-5 py-3 "> You have no pages created yet</p>
				)
			) : (
				<></>
			)}
			<div className="container">
				<DeletePage />
			</div>
		</div>
	);
}
