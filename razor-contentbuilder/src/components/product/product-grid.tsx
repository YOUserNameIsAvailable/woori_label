import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCard from '@components/product/product-cards/product-card';
import ProductList from '@components/product/product-cards/product-list-view';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';

interface ProductGridProps {
  className?: string;
  viewAs: boolean;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = '' ,viewAs}) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: LIMITS.PRODUCTS_LIMITS, ...query });
  return (
    <>
      <div
        className={`${ viewAs ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid grid-cols-1 gap-8'} ${className}`}
      >
        {error ? (
          <div className="col-span-full ">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.pages?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
              <article className={`flex flex-col product-card m-3 h-full`} key={`product--key-${idx}`}>
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              </article>
          ))
        ) : (
          data?.pages?.map((page: any) => {
            if(viewAs) {
              return page?.data?.map((product: Product) => (
                  <ProductCard
                      key={`product--key-${product.id}`}
                      product={product}
                  />
              ));
            }else{
              return page?.data?.map((product: Product) => (
                  <ProductList
                      key={`product--key-${product.id}`}
                      product={product}
                  />
              ));
            }

          })
        )}
        {/* end of error state */}
      </div>
      {hasNextPage && (
        <div className="text-center pt-8 xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            className={"w-60 "}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};
