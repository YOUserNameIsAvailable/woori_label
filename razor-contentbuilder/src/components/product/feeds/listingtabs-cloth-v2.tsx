import { LIMITS } from '@framework/utils/limits';
import ListingTabsList from "@components/product/listingtabs/listingtabs-list-v2";
import ListingTabsContainer from "@components/product/listingtabs/listingtabs-container-v2";
import { useClothCategoryQuery } from '@framework/product/get-cloth-category';
import {UsefashionProductsQuery} from "@framework/product/get-all-fashion-products";


export default function ListingTabsClothFeed(props: any) {
  const { data: category } = useClothCategoryQuery({
    limit: LIMITS.FASHION_PRODUCTS_LIMITS,
  });
  const { data: data, isLoading, error } = UsefashionProductsQuery({
    limit: LIMITS.FASHION_PRODUCTS_LIMITS,
  });
  const {showBanner} = props;
  const banner_url = '/assets/images/collection/banner_cate_home7_4.jpg';

  return (
      <div className="mb-8 lg:mb-12">
        <div className="listing-tabs" >
          <ListingTabsList className={`ltabs-heading`} data={category}/>
          <ListingTabsContainer data={data} category={category} isLoading={isLoading} error={error} showBanner={showBanner} banner_url={banner_url}/>
        </div>
      </div>
  );
}
