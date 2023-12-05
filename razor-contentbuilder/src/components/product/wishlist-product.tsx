import WishlistProductCard from '@components/product/wishlist-product-card';
import type { FC } from 'react';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
interface ProductWishlistProps {
  element?: any;
  className?: string;
}
const ProductWishlistGrid: FC<ProductWishlistProps> = ({
  element,
  className = '',
}) => {
  const limit = 35;
  const { data, isLoading, error } = useWishlistProductsQuery({
    limit: limit,
  });
  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col w-full">
          {!isLoading && !data?.length
            ? Array.from({ length: 5 }).map((_, idx) => (
                <CategoryListCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : data?.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.id}`}
                  product={product}
                />
              ))}
        </div>
      )}
    </div>
  );
};
export default ProductWishlistGrid;
