import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import ListPages from "./containers/ListPages";
import Edit from "./containers/Edit";
import Head from "./components/head/head";

export default function Routes() {
	const history = useHistory();
	const location = useLocation();
	const [queryPageParam, setQueryPageParam] = useState(null);
	const [rangeValue, setRangeValue] = useState(360)

	useEffect(() => {
		const queryString = location.search
		const searchParams = new URLSearchParams(queryString);
		const parsedQuery = searchParams.get('page')
		setQueryPageParam(parsedQuery ?? '');
	}, [location]);

	return (
		<>
			<Head queryPageParam={queryPageParam} setRangeValue={setRangeValue} rangeValue={rangeValue}/>
			<Switch>
				<Route path="/edit">
					<Edit queryPageParam={queryPageParam} history={history} rangeValue={rangeValue}/>
				</Route>
				<Route path="/">
					<ListPages />
				</Route>
			</Switch>
		</>
	);
}