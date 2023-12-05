import BannerCard from '@components/cards/banner-card';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import {SwiperSlide} from '@components/ui/carousel/slider';
import {ROUTES} from '@utils/routes';

const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
    ssr: false,
});

interface Props {
    className?: string;
    data: any;
}

const breakpoints = {
    '1024': {
        slidesPerView: 3,
        spaceBetween: 16,
    },
    '768': {
        slidesPerView: 2,
        spaceBetween: 16,
    },
    '680': {
        slidesPerView: 2,
        spaceBetween: 12,
    },
    '0': {
        slidesPerView: 1,
    },
};

const BundleGrid: React.FC<Props> = ({className = 'mb-12 pb-0.5', data}) => {
    console.log('data ', data)
    const {width} = useWindowSize();
    // @ts-ignore
    return (
        <div className={cn('heightFull', className)}>
            {width! < 1536 ? (
              // @ts-ignore
                <Carousel breakpoints={breakpoints}>
                    {data?.map((item: any) => (
                        <SwiperSlide key={`bundle-key-${item.id}`}>
                            {/* @ts-ignore */}
                            <BannerCard banner={item} effectActive={false}/>
                        </SwiperSlide>
                    ))}
                </Carousel>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* @ts-ignore */}
                    {data?.map((item: any) => (<BannerCard key={`bundle-key-${item.id}`} banner={item} effectActive={false}/>))}
                </div>
            )}
        </div>
    );
};

export default BundleGrid;
