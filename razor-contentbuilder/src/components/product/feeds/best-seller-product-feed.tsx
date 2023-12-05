import ProductsCarousel from '@components/product/products-carousel';
import {ROUTES} from '@utils/routes';
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {IsEditable, onlyForBuilder} from "@components/config";
import useSWR from "swr";
import {fetcher} from "../../../services/helpers";

const BestSellerProductFeed = ({limit = 5, idFilter = 'pbs1'}) => {

	console.log('BestSellerProductFeedProps ', {limit, idFilter})


	const {data, isLoading, error} = useSWR(
		`/api${API_ENDPOINTS.BEST_SELLER_PRODUCTS}?limit=${limit}&id=${idFilter}`, fetcher
	)


	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (onlyForBuilder()) {
		return (
			<div data-component="BestSellerProductFeed">
				<div style={{pointerEvents: "none"}}>limit: </div>
				<p {...IsEditable({limit: "textContent"})}>10</p>
				<div style={{pointerEvents: "none"}}>Category:</div>
				<p {...IsEditable({idFilter: "textContent"})}>pbs1</p>
			</div>
		)
	}


	return (
		<div data-component={"BestSellerProductFeed"}>
			<ProductsCarousel
			  sectionHeading="text-best-sellers"
			  categorySlug={ROUTES.PRODUCTS}
			  products={data}
			  loading={isLoading}
			  error={error?.message}
			  limit={limit}
			  uniqueKey="best-sellers"
			  className = "mb-8"
			/>
		</div>
	)
}

export default BestSellerProductFeed