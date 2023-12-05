import dynamic from 'next/dynamic';
import CategoryCard from '@components/cards/category-card';
import SectionHeader from '@components/common/section-header';
import {ROUTES} from '@utils/routes';
import Alert from '@components/ui/alert';
import {SwiperSlide} from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import {LIMITS} from '@framework/utils/limits';
import {useCategoriesQuery} from "@framework/category/get-all-categories";
import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";

const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
    ssr: false,
});

interface CategoriesProps {
    className?: string;
}

const breakpoints = {
    '1480': {
        slidesPerView: 6,
        spaceBetween: 1
    },
    '1280': {
        slidesPerView: 4,
        spaceBetween: 1
    },
    '1024': {
        slidesPerView: 3,
        spaceBetween: 1
    },
    '768': {
        slidesPerView: 3,
        spaceBetween: 1
    },
    '600': {
        slidesPerView: 2,
        spaceBetween: 1
    },
    '0': {
        slidesPerView: 2,
        spaceBetween: 1
    },
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
                                                          className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16',
                                                      }) => {
    const {width} = useWindowSize();

    const {data, isLoading, error} = useCategoriesQuery({
        limit: LIMITS.CATEGORIES_LIMITS,
    });
    return (
        <div className={className}>
            <SectionHeader
                sectionHeading="text-choose-categories"
                className="mb-3"
            />
            <div className="rounded border border-black/5 bg-black/5 w-full overflow-hidden">
                {error ? (
                    <Alert message={error?.message} className="mb-14 3xl:mx-3.5"/>
                ) : (
                  // @ts-ignore
                    <Carousel
                        grid={{rows: 2, fill: 'row'}}
                        breakpoints={breakpoints}
                        className="shopby-categories"
                    >
                        {isLoading && !data
                            ? Array.from({length: 12}).map((_, idx) => {
                                return (
                                    <SwiperSlide key={`category--key-${idx}`}>
                                        <CategoryListCardLoader uniqueKey={`category-card-${idx}`}/>
                                    </SwiperSlide>
                                );
                            })
                            : data?.categories?.data?.slice(0, 12)?.map((category) => (
                                <SwiperSlide key={`category--key-${category.id}`}>
                                    <CategoryCard
                                        item={category}
                                        href={{
                                            pathname: ROUTES.SEARCH,
                                            query: {category: category.slug},
                                        }}
                                        className="p-2 sm:p-4 bg-white"
                                    />
                                </SwiperSlide>
                            ))}
                    </Carousel>
                )}
            </div>
        </div>
    );
};

export default CategoryGridBlock;
