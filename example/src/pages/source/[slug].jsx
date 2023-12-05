import React from 'react';
import styles from './sourceCode.module.scss';
import appConfig from 'config/app.config';

const Source = ({ dataFromCms }) => {
	return (
		<div className="container">
			<h1>source code</h1>
			<pre className={styles.code}>
        <code>{dataFromCms || ''}</code>
      </pre>
		</div>
	);
};


export async function getServerSideProps({ query }) {
	const { slug } = query;

	try {
		const response = await fetch(`${appConfig.baseUrl}source-code?page=${slug}`);
		const data = await response.json()

		return {
			props: {
				dataFromCms: data?.jsx || null,
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				dataFromCms: null,
			},
		};
	}
}

export default Source
