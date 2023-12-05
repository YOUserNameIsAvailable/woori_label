import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {GetStaticProps} from 'next';
import Seo from '@components/seo/seo';
import {QueryClient} from 'react-query';
import {dehydrate} from 'react-query/hydration';
import {API_ENDPOINTS} from '@framework/utils/api-endpoints';
import {fetchCategories} from '@framework/category/get-all-categories';
import {fetchPopularProducts} from '@framework/product/get-all-popular-products';
import {LIMITS} from '@framework/utils/limits';
import {fetchBestSellerProducts} from "@framework/product/get-all-best-seller-products";
import AllPages from "../components/allPages";
import EditLabel from "../components/editLabel";

export default function Home() {


	return (
		<>
			<Seo
				title="Electronics Store Store React Template"
				description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
				path="/"
			/>

			<Container>
				<AllPages />

				
				<h1>라벨편집</h1>
				<EditLabel />
			</Container>

		</>
	);
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({locale}) => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		[API_ENDPOINTS.CATEGORIES, {limit: LIMITS.CATEGORIES_LIMITS}],
		fetchCategories
	);

	await queryClient.prefetchQuery(
		[
			API_ENDPOINTS.BEST_SELLER_PRODUCTS, {limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS},
		],
		fetchBestSellerProducts
	);

	await queryClient.prefetchQuery(
		[API_ENDPOINTS.POPULAR_PRODUCTS, {limit: LIMITS.POPULAR_PRODUCTS_LIMITS}],
		fetchPopularProducts
	);

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale!, [
				'common',
				'forms',
				'menu',
				'footer',
			])),
		},
		revalidate: 60,
	};
};
