import ProductsCarousel from '@components/product/products-carousel-v2';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { LIMITS } from '@framework/utils/limits';
import { ROUTES } from '@utils/routes';

export default function BestSellerProductFeed() {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS,
    id: 'pbs1',
  });
  return (
    <ProductsCarousel
      sectionHeading="text-best-sellers-product"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
      className= "mb-8 lg:mb-12"
      borderCarousel= {true}
      rowCarousel= {2}
    />
  );
}
