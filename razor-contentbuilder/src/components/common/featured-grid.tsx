
import FeedbackIcon from '@components/icons/featured/feedback-icon';
import FeaturedCard from '@components/cards/featured-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';
import RocketIcon from "@components/icons/featured/rocket-icon";
import SyncIcon from "@components/icons/featured/sync-icon";
import ThumbsIcon from "@components/icons/featured/thumbs-icon";

const data = [
  {
    id: 1,
    icon: (
        <RocketIcon
            color="#333"
        />
    ),
    title: 'feature-title-one',
    description: 'feature-title-one-description',
    href: ROUTES.SEARCH,
  },
  {
    id: 2,
    icon: (
        <SyncIcon color="#333"/>
    ),
    title: 'feature-title-two',
    description: 'feature-title-two-description',
    href: ROUTES.SEARCH,
  },
  {
    id: 3,
    icon: (
        <FeedbackIcon color="#333"/>
    ),
    title: 'feature-title-three',
    description: 'feature-title-three-description',
    href: ROUTES.SEARCH,
  },
  {
    id: 4,
    icon: (
        <ThumbsIcon
            color="#333"
        />
    ),
    title: 'feature-title-four',
    description: 'feature-title-four-description',
    href: ROUTES.SEARCH,
  },
];

interface Props {
  className?: string;
}

const breakpoints = {
  '1024': {
    slidesPerView: 4,
  },
  '768': {
    slidesPerView: 2,
  },
  '640 ': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const FeatureGrid: React.FC<Props> = ({
  className = 'mb-8',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`${className}`}>
      {// @ts-ignore
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          prevActivateId="featured-carousel-button-prev"
          nextActivateId="featured-carousel-button-next"
          className={'rounded-md border border-black/10 py-5'}
        >
          {data?.map((item) => (
            <SwiperSlide key={`featured-key-${item.id}`}>
              <FeaturedCard item={item}/>
            </SwiperSlide>
          ))}

        </Carousel>}
    </div>
  );
};

export default FeatureGrid;
