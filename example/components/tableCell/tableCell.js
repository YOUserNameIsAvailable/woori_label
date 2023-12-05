import React from 'react';
import Link from 'next/link';

export const TableCell = ({ namePage }) => {
	const url = `/pageExample/${namePage}`;
	const urlSource = `/source/${namePage}`;

	return (
		<tr>
			<td>{namePage}</td>
			<td><Link href={url}>View page</Link></td>
			<td><Link href={urlSource}>View source</Link></td>
		</tr>
	);
};
