import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'next-i18next';
interface Props {
  data: any;
  variation?: any;
  disabled?: boolean;
  isBorderRounded?: boolean;
}

export const AddToCart = ({ data, variation, disabled,isBorderRounded }: Props) => {
  const { width } = useWindowSize();
  const { t } = useTranslation('common');
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const item = generateCartItem(data!, variation);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    addItemToCart(item, 1);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  const iconSize = width! > 480 ? '19' : '17';
  return !isInCart(item?.id) ? (
    <button
        className={`min-w-[150px] px-4 py-2 bg-skin-primary text-skin-inverted text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none ${isBorderRounded ? 'rounded': 'rounded-full'}`}
      aria-label="Count Button"
      onClick={handleAddClick}
      disabled={disabled || outOfStock}
    >
      {t('text-add-to-cart')}
    </button>
  ) : (
    <Counter
      value={getItemFromCart(item.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
    />
  );
};
