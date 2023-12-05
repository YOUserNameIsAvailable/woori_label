import {List_Of_Components} from "@components/list";
import {capitalizeFirstLetter} from "../../services/helpers";


const PreviewSniped = ({ slug }) => {

	const capitalizedSlug = capitalizeFirstLetter(slug);
	const Component = List_Of_Components[capitalizedSlug]

	return <Component />
}

export async function getServerSideProps({ query }) {
	const { slug } = query;

	try {
		return {
			props: {
				slug: slug
			},
		};
	} catch (error) {
		return {
			props: {
				slug: '',
			},
		};
	}
}

export default PreviewSniped
