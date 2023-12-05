import Image from '@components/ui/image';
import Link from "next/link";
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';
import usePrice from "@framework/product/use-price";

type SearchProductProps = {
  product: any;
};



const SearchProduct: React.FC<SearchProductProps> = ({ product }) => {
  const { name, image, unit, slug, product_type } = product ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'USD',
  });

  return (
    <Link
      href={`${ROUTES.PRODUCT}/${slug}`}
      className="group w-full h-auto flex justify-start items-center"
    >
      <div className="relative flex w-15 h-15 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
        <Image
          src={image?.thumbnail ?? searchProductPlaceholder}
          width={80}
          height={80}
          loading="eager"
          alt={name || 'Product Image'}
          className="bg-skin-thumbnail object-cover"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-skin-base text-15px  mb-1.5">{name}</h3>
        <div className="space-s-2 mb-4 lg:mb-4">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
              <del className="text-sm text-skin-base text-opacity-70">
                {basePrice}
              </del>
          )}

        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;
