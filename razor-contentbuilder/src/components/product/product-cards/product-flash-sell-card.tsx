import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import {Product} from '@framework/types';
import {useModalAction} from '@components/common/modal/modal.context';
import Countdown, {zeroPad} from 'react-countdown';
import {productPlaceholder} from '@assets/placeholders';
import ProgressCard from '@components/ui/progress-card';
import {useTranslation} from 'react-i18next';

interface ProductProps {
    product: Product;
    className?: string;
    date?: string | number | Date | undefined;
}

const renderer = ({days, hours, minutes, seconds, completed}: any) => {
    if (completed) {
        return null;
    } else {
        return (
            <div
                className="flex  text-base xl:text-lg text-skin-base text-opacity-50 font-semibold -mx-2.5">
                <span
                    className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
                  {zeroPad(days)}
                </span>
                :
                <span
                    className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(hours)}
        </span>
                :
                <span
                    className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(minutes)}
        </span>
                :
                <span
                    className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(seconds)}
        </span>
            </div>
        );
    }
};

const ProductFlashSellCard: React.FC<ProductProps> = ({
                                                          product,
                                                          className,
                                                          date,
                                                      }) => {
  // @ts-ignore
    const {name, image, quantity, sold, product_type} = product ?? {};
    const {openModal} = useModalAction();
    const {t} = useTranslation('common');
    const {price, basePrice} = usePrice({
        amount: product?.sale_price ? product?.sale_price : product?.price,
        baseAmount: product?.price,
        currencyCode: 'USD',
    });
    const {price: minPrice} = usePrice({
        amount: product?.min_price ?? 0,
        currencyCode: 'USD',
    });
    const {price: maxPrice} = usePrice({
        amount: product?.max_price ?? 0,
        currencyCode: 'USD',
    });

    function handlePopupView() {
        openModal('PRODUCT_VIEW', product);
    }

    return (
        <article
            className={cn(
                'flex flex-col justify-between group cursor-pointer relative px-4 lg:px-4 ',
                className
            )}
            onClick={handlePopupView}
            title={name}
        >
            <div className="grid grid-cols-7 gap-2">
                <div className="relative col-span-12 sm:col-span-3">
                    <div className="flex justify-center overflow-hidden mx-auto relative">
                        <Image
                            src={image?.original ?? productPlaceholder}
                            alt={name || 'Product Image'}
                            width={350}
                            height={350}
                            quality={100}
                            className="object-cover bg-skin-thumbnail"
                        />
                    </div>

                    <div className="w-full h-full absolute top-0 z-10 -mx-0.5 sm:-mx-1">
                        <span
                            className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                          {t('text-on-sale')}
                        </span>
                    </div>
                </div>


                <div className="col-span-12 sm:col-span-4 flex flex-col pb-5 lg:pb-6 mb-0.5 lg:pt-3 h-full ">
                    <h2 className="text-skin-base text-base font-semibold mb-4">
                        {name}
                    </h2>
                    <div className="space-s-2 mb-1 lg:mb-4">
                          <span
                              className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
                          </span>
                        {basePrice && (
                            <del className="text-sm text-skin-base text-opacity-70">
                                {basePrice}
                            </del>
                        )}
                    </div>
                    <h2 className="text-skin-base text-opacity-60 sm:text-sm lg:text-15px mb-2"> {t('text-offer-end')}</h2>
                    <Countdown date={date} intervalDelay={1000} renderer={renderer}/>
                    <ProgressCard
                        soldProduct={sold}
                        totalProduct={quantity}
                        className="pt-4 lg:pt-6"
                    />
                </div>
            </div>


        </article>
    );
};

export default ProductFlashSellCard;
