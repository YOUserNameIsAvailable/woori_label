import SectionHeader from '@components/common/section-header';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import Alert from '@components/ui/alert';
import CategoryListCard from '@components/cards/category-list-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import useSWR from "swr";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {fetcher, fetcherCategory} from "../../services/helpers";
import {IsEditable, onlyForBuilder} from "@components/config";
import {useCategoriesQuery} from "@framework/category/get-all-categories";

interface CategoriesProps {
  className?: string;
  limit?: number
}

const breakpoints = {
  '1480': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 3,
  },
  '768': {
    slidesPerView: 3,
  },
  '600': {
    slidesPerView: 3,
  },
  '0': {
    slidesPerView: 2,
  },
};

const CategoryGridListBlock: React.FC<CategoriesProps> = ({
  className = 'mb-8',
  limit = 6
}) => {
  const { width } = useWindowSize();


  const {data, isLoading, error} = useSWR(
    `/api${API_ENDPOINTS.CATEGORIES}?limit=${limit}`, fetcherCategory
  )

  console.log('CategoryGridListBlockProps ', {className, limit})

  if (onlyForBuilder()) {
    return (
      <div data-component="CategoryGridListBlock">
        <div style={{pointerEvents: "none"}}>limit: </div>
        <p {...IsEditable({limit: "textContent"})}>6</p>
        <div style={{pointerEvents: "none"}}>className:</div>
        <p {...IsEditable({className: "textContent"})}>mb-8</p>
      </div>
    )
  }

  return (
    <div data-component="CategoryGridListBlock" className={cn(className)}>
        <SectionHeader sectionHeading="text-choose-categories" className="mb-6 block-title" />

        <div className="mt-0">
          {error ? (
            <Alert message={error?.message} />
          ) : (
            <>
              {// @ts-ignore
                <Carousel
                  breakpoints={breakpoints}
                  grid={{rows: 1, fill: 'row'}}
                  className=""
                >
                  {isLoading && !data
                    ? Array.from({length: 6}).map((_, idx) => {
                      return (
                        <SwiperSlide
                          className="p-1.5 md:p-2"
                          key={`category--key-${idx}`}
                        >
                          <CategoryListCardLoader
                            uniqueKey={`category-card-${idx}`}
                          />
                        </SwiperSlide>
                      );
                    })
                    : data?.categories?.data?.slice(0, 6).map((category) => (
                      <SwiperSlide
                        key={`category--key-${category.id}`}
                        className=""
                      >
                        <CategoryListCard
                          category={category}
                          href={{
                            pathname: ROUTES.SEARCH,
                            query: {category: category.slug},
                          }}
                          className=""
                        />
                      </SwiperSlide>
                    ))}
                </Carousel>}
            </>
          ) }
        </div>

    </div>
  );
};

export default CategoryGridListBlock;
