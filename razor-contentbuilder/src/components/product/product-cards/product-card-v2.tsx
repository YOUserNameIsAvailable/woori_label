import cn from 'classnames';
import Image from '@components/ui/image';
import Link from "next/link";
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import SearchIcon from '@components/icons/search-icon';
import { useCart } from '@contexts/cart/cart.context';
import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import {ROUTES} from "@utils/routes";

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation('common');
  // @ts-ignore
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] text-skin-inverted uppercase inline-block bg-skin-red rounded px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="min-w-[150px] px-4 py-2 bg-skin-primary rounded text-skin-inverted text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        {t('text-product-details')}
      </button>
    );
  }
  return <AddToCart data={data} isBorderRounded={true} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  // @ts-ignore
  const { name, image, unit, slug, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const iconSize = width! > 1024 ? '20' : '17';
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

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col product-card-v2 card-image--jump  overflow-hidden  h-full',
        className
      )}
      title={name}
    >
      <div className="relative flex-shrink-0  mt-4">
        <div className="card-img-container flex overflow-hidden max-w-[230px] mx-auto relative">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || 'Product Image'}
            width={230}
            height={200}
            quality={100}
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}
          <button
              className="buttons--quickview px-4 py-2 bg-skin-inverted rounded hover:bg-skin-primary hover:text-skin-inverted"
              aria-label="Quick View Button"
              onClick={handlePopupView}
          >
            <SearchIcon width={iconSize} height={iconSize} opacity="1" />
          </button>
        </div>
      </div>

      <div className="flex flex-col mb-2 h-full overflow-hidden text-center relative">
        <div className="text-sm mt-auto leading-6 text-gray-400 mb-1.5">{unit}</div>
        <Link
            href={`${ROUTES.PRODUCTS}/${slug}`}
            className="text-skin-purple text-sm leading-5  line-clamp-2 mb-2 hover:text-skin-primary"
        >
          {name}
        </Link>
        <div className="space-s-2 mb-4 lg:mb-4">
          <span className="inline-block font-semibold text-15px lg:text-base text-gray-700">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
              <del className="text-sm text-gray-400 text-opacity-70">
                {basePrice}
              </del>
          )}

        </div>
        <div className="inline-block product-cart-button">
          <RenderPopupOrAddToCart data={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
