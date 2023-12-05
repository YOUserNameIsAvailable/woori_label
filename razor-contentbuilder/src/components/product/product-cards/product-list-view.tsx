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
      <span className="text-[11px] text-skin-inverted uppercase inline-block bg-skin-red rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="min-w-[150px] px-4 py-2 bg-skin-primary rounded-full  text-skin-inverted text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        {t('text-product-details')}
      </button>
    );
  }
  return <AddToCart data={data} />;
}
const ProductList: React.FC<ProductProps> = ({ product, className }) => {
  // @ts-ignore
  const { name, image, unit, slug, product_type, description } = product ?? {};
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
        ' product-list-view card-image--jump  overflow-hidden relative  grid grid-cols-4  gap-8',
        className
      )}
      title={name}
    >
      <div className="col-span-1 ">
        <Link
            href={`${ROUTES.PRODUCTS}/${slug}`}
            className="block border border-skin-base hover:border-skin-primary"
        >
        <div className="max-w-[270px] mx-auto relative ">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || 'Product Image'}
            width={270}
            height={270}
            quality={100}
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        </Link>
      </div>

      <div className="col-span-3">
        <div className="text-12px sm:text-sm mt-auto text-gray-400 mb-2">{unit}</div>
        <Link
            href={`${ROUTES.PRODUCTS}/${slug}`}
            className="text-skin-base text-base font-semibold leading-5 min-h-[30px] line-clamp-2 mb-1.5 hover:text-skin-primary"
        >
          {name}
        </Link>

        <div className="space-s-2 mb-2">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
              <del className="text-sm text-gray-400 text-opacity-70">
                {basePrice}
              </del>
          )}
        </div>
        <p  className="text-sm text-skin-base line-clamp-3 leading-6 text-opacity-80">
          {description}
        </p>
        <div className="inline-block product-cart-button mt-6">
          <RenderPopupOrAddToCart data={product} />
        </div>

      </div>
    </article>
  );
};

export default ProductList;
