import React from 'react';
import { TableCell } from 'components/tableCell/tableCell';
import styles from './allPages.module.scss';
import appConfig from "config/app.config";

const AllPages = ({ allPagesData }) => {


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
				{allPagesData?.map((page, index) => {
					const pageValue = page.page;
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


export async function getServerSideProps() {
	try {
		const response = await fetch(`${appConfig.baseUrl}all`);
		const data = await response.json();

		return {
			props: {
				allPagesData: data.pages || [],
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				allPagesData: [],
			},
		};
	}
}
