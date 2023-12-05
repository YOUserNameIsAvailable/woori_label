import React, {useEffect, useRef, useState} from 'react';
import BuilderControl from '../components/contentbuilder/buildercontrol';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {CONFIG} from "../config";
import {isLocalhost} from "../helpers";
import {FullScreenLoader} from "../components/fullScreenLoader";


const Edit = ({queryPageParam, rangeValue}) => {
	const history = useHistory();
	const callSaveRef = useRef();
	const callSaveAndFinishRef = useRef();

	const [finishRender, setFinishRender] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const closeBuilder = () => {
		const answer = window.confirm('Do you really want to leave?');
		if (!answer) return;
		history.push('/');
	};


	const fetchData = async (hostName) => {
		try {
			const {data} = await axios(`${isLocalhost(hostName) ? CONFIG.baseRazorUrl : CONFIG.baseRazorUrlProd}api/custom-builder`)

			window.data_custom = {
				'snippets': data
			}

		} catch (e) {
			console.log(e)
		} finally {
			setFinishRender(true)
		}
	}

	useEffect(() => {
		const hostName = window.location.hostname
		console.log('fetchData ', hostName)
		fetchData(hostName).then()
	}, []);

	const onHandlerSave = (ref) => {
		try {
			ref.current();
		} catch (e) {
			console.log(e)
		}
	}

	const onHandlerSaveAndFinished = (ref) => {
		try {
			ref.current();
		} catch (e) {
			console.log(e)
		}
	}


	return (
		<>
			{isLoading && <FullScreenLoader isLoading={isLoading}/>}

			{finishRender && queryPageParam &&
				<BuilderControl
					rangeValue={rangeValue}
					queryPageParam={queryPageParam}
					doSave={(f) => (callSaveRef.current = f)}
					doSaveAndFinish={(f) => (callSaveAndFinishRef.current = f)}
					setIsLoading={setIsLoading}
				/>}

			<div className="is-ui" style={{position: 'fixed', right: '30px', bottom: '30px', display: 'flex'}}>
				<button disabled={!queryPageParam} type="button" onClick={() => onHandlerSave(callSaveRef)} style={{width: '85px'}}>
					Save
				</button>
				<button disabled={!queryPageParam} type="button" onClick={() => onHandlerSaveAndFinished(callSaveAndFinishRef)}
				        style={{width: '120px'}}>
					Save & Finish
				</button>
				<button type="button" onClick={closeBuilder} style={{width: '85px'}}>
					Close
				</button>
			</div>
		</>
	);
};

export default Edit;
