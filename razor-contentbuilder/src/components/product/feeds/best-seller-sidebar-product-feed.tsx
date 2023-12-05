import type { FC } from 'react';
import ProductsListBlock from '../products-list-block';
import { LIMITS } from '@framework/utils/limits';
import {useBestSellerProductsQuery} from "@framework/product/get-all-best-seller-products";

interface ProductFeedProps {
  className?: string;
}

const BestSellerSidebarProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    id: 'pbs1',
  });
  return (
    <ProductsListBlock
      sectionHeading="text-best-sellers"
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_HOME2_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
    />
  );
};
export default BestSellerSidebarProductFeed;
