import TestimonialCard from '@components/cards/testimonial-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';

const data = [
  {
    id: 1,
    slug: 'feel-the-thirsty-in-summer-anytime',
    image: '/assets/images/support/1.jpg',
    description: 'testimonial-description-one',
    author_name: 'testimonial-author-name-one',
    author_position: 'testimonial-author-position-one'
  },
  {
    id: 2,
    slug: 'most-popular-item-for-Fast-food',
    image: '/assets/images/support/2.jpg',
    description: 'testimonial-description-two',
    author_name: 'testimonial-author-name-two',
    author_position: 'testimonial-author-position-two'
  }
];

interface Props {
  className?: string;
}

const breakpoints = {
  '1024': {
    slidesPerView: 1,
  },
  '768': {
    slidesPerView: 1,
  },
  '540': {
    slidesPerView: 1,
  },
  '0': {
    slidesPerView: 1,
  },
};

const Testimonial: React.FC<Props> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 pb-1 lg:pb-0 3xl:pb-2.5',
}) => {
  return (
    <div className={className}>
      {// @ts-ignore
        <Carousel
          breakpoints={breakpoints}
          autoplay={false}
          className="carouselTestimonial  border border-[#ebebeb] rounded"
          navigation={false}
          pagination={{
            clickable: true,
          }}
          prevActivateId="collection-carousel-button-prev"
          nextActivateId="collection-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide
              key={`collection-key-${item.id}`}
              className=""
            >
              <TestimonialCard
                key={item.id}
                collection={item}
                href={`${ROUTES.BUNDLE}/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Carousel>}

    </div>
  );
};

export default Testimonial;
