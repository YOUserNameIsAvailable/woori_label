import React, {useEffect, useState} from 'react';

import styles from './allPages.module.scss';
import {TableCell} from "../tableCell/tableCell";
import {getAllPagesBuilder} from "../../utils/getAllPagesBuilder";


const AllPages = () => {

	const [allPagesBuilder, setAllPagesBuilder] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const hostName = window.location.hostname
			try {
				const data = await getAllPagesBuilder(hostName);
				setAllPagesBuilder(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchData();
	}, []);


	return (
		<div className={styles.wrapper}>
			<table>
				<thead>
				<tr>
					<th>Page name</th>
					<th>View page</th>
					<th>Source page</th>
				</tr>
				</thead>
				<tbody>
				{allPagesBuilder?.map((page, index) => {
					const pageValue = page.path.slice(1);
					return (
						<React.Fragment key={index}>
							<TableCell namePage={pageValue} />
						</React.Fragment>
					);
				})}
				</tbody>
			</table>
		</div>
	);
};

export default AllPages;
