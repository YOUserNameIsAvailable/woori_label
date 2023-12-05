import BannerCard from '@components/cards/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import {IsEditable, onlyForBuilder} from "@components/config";

const breakpoints = {
  '1536': {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  '1280': {
    slidesPerView: 5,
    spaceBetween: 16,
  },
  '1024': {
    slidesPerView: 4,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '520': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 2,
  },
};

const defaultData = [
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/bannerBrand-1.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  },
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/bannerBrand--2.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  },
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/bannerBrand--3.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  },
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/bannerBrand--4.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  },
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/bannerBrand--5.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  },
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/banner-6.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  },
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/bannerBrand-1.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  },
  {
    "image": {
      "imageSrc": "https://builder.smart-ui.pro/files/bannerBrand--2.jpg",
      "imageAlt": ""
    },
    "linkText": "/search",
    "link": "/search",
    "variant": "rounded"
  }
]

interface BannerProps {
  BannerAllCarousel: any;
  className?: string;
  layout?: string;
  buttonSize?: 'default' | 'small';
}

const BannerAllCarousel: React.FC<BannerProps> = ({
  BannerAllCarousel = defaultData,
  className = 'mb-6',
  layout,
  buttonSize = 'default',
}) => {

  const classCarousel =  "border-t border-black/10  py-5  md:py-10 ";

  console.log('BannerAllCarousel ', {BannerAllCarousel, className})

  if (onlyForBuilder()) {
    return (
      <div data-component="BannerAllCarousel" style={{margin: "0 0 15px 0"}}>
        <div data-props="BannerAllCarousel">
          className:
          <p {...IsEditable({className: "textContent"})}>mb-8 lg:mb-12</p>
          <br/>
        </div>
        <br/>
        <div data-repeater="BannerAllCarousel" style={{borderBottom: "solid red 1px", margin: "0 0 15px 0"}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div data-repeaterbtn="collapseElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#E5E7EB", fontSize: "16px", color: "#000"}}>
              Collapsed
            </div>

            <div data-repeaterbtn="removeElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#EF4444", fontSize: "16px", color: "#fff"}}>
              Remove Banner
            </div>
          </div>

          <div data-repeaterbody="BannerAllCarousel" className={'active'}>
            <img {...IsEditable({imageSrc: "src", imageAlt: "textContent"})}
                 src="https://lavar.com.ua/image/cache/catalog/vafelni-kartynku/vk-1172-750x750-product_thumb.jpg"
                 alt=""/>
            <a {...IsEditable({linkText: "textContent", link: "href"})} href="#"> link text </a>
            <div{...IsEditable({variant: "textContent"})}>rounded</div>
          </div>
        </div>

        <div data-repeaterbtn="addElem" style={{cursor: "pointer", display: "inline-block", padding: "2px 15px", borderRadius: "9999px", background: "#2C752F", fontSize: "16px", color: "#fff"}}>
          Add Banner
        </div>
      </div>
    )
  }


  return (
    <div data-component="BannerAllCarousel" className={className}>
      {
        // @ts-ignore
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          buttonSize={buttonSize}
          prevActivateId="all-banner-carousel-button-prev"
          nextActivateId="all-banner-carousel-button-next"
          className={classCarousel}
        >
          {BannerAllCarousel?.map((banner: any, i) => (
            <SwiperSlide key={`all-banner--key${i}`}>
              {
                // @ts-ignore
                <BannerCard banner={banner} effectActive={true}/>
              }
            </SwiperSlide>
          ))}
        </Carousel>
      }
    </div>
  );
};

export default BannerAllCarousel;
