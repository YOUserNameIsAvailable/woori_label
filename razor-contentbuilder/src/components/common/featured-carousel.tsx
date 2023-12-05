import Carousel from '@components/ui/carousel/carousel';
import {SwiperSlide} from '@components/ui/carousel/slider';
import {IsEditable, onlyForBuilder} from "@components/config";
import FeaturedCard from "@components/cards/featured-card";


interface Props {
	className?: string;
	classNameCarousel?: string;
	Slides: any
}

const breakpoints = {
	'1536': {
		slidesPerView: 5,
	},
	'1280': {
		slidesPerView: 4,
	},
	'1024': {
		slidesPerView: 3,
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

const defaultData = [
	{
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/rocket.png",
			"imageAlt": ""
		},
		"title": "Free Shipping",
		"description": "Free Shipping On All Order",
		"btnText": "/search",
		"btnUrl": "/search"
	},
	{
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/syncIcon.png",
			"imageAlt": ""
		},
		"title": "Money Guarantee",
		"description": "30 Day Money Back Guarantee",
		"btnText": "/search",
		"btnUrl": "/search"
	},
	{
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/feedbackIcon.png",
			"imageAlt": ""
		},
		"title": "Online Support 24/7",
		"description": "Technical Support 24/7",
		"btnText": "/search",
		"btnUrl": "/search"
	},
	{
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/thumbsIcon.png",
			"imageAlt": ""
		},
		"title": "Member Discount",
		"description": "Upto 40% Discount All Products",
		"btnText": "/search",
		"btnUrl": "/search"
	},
	{
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/licenseIcon.png",
			"imageAlt": ""
		},
		"title": "Secure Payment",
		"description": "All Cards Accepted",
		"btnText": "/search",
		"btnUrl": "/search"
	}
]

const FeatureCarousel: React.FC<Props> = ({className = 'mb-7 md:mb-10 ', classNameCarousel, Slides = defaultData}) => {

	console.log('asdFeatureCarousel', Slides)

	if (onlyForBuilder()) {
		return (
			<div data-component="FeatureCarousel" style={{margin: "0 0 15px 0"}}>
				<div data-repeater="Slides" style={{borderBottom: "solid red 1px", margin: "0 0 15px 0"}}>
					<div style={{display: "flex", justifyContent: "space-between"}}>
						<div data-repeaterbtn="collapseElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#E5E7EB", fontSize: "16px", color: "#000"}}>
							Collapsed
						</div>

						<div data-repeaterbtn="removeElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#EF4444", fontSize: "16px", color: "#fff"}}>
							Remove Slide
						</div>
					</div>

					<div data-repeaterbody="Slides" className={'active'}>
						<img {...IsEditable({imageSrc: "src", imageAlt: "textContent"})} src="https://lavar.com.ua/image/cache/catalog/vafelni-kartynku/vk-1172-750x750-product_thumb.jpg" alt=""/>
						<h3 {...IsEditable({title: "textContent"})}>Title</h3>
						<p {...IsEditable({description: "textContent"})}>paragraph text</p>
						<a {...IsEditable({btnText: "textContent", btnUrl: "href"})} href="#"> link text </a>
					</div>
				</div>

				<div data-repeaterbtn="addElem" style={{cursor: "pointer", display: "inline-block", padding: "2px 15px", borderRadius: "9999px", background: "#2C752F", fontSize: "16px", color: "#fff"}}>
					Add Slide
				</div>
			</div>
		)
	}

	return (
		<div data-component="FeatureCarousel" className={`mb-7 md:mb-10 ${className}`}>
			{// @ts-ignore
				<Carousel
					autoplay={false}
					breakpoints={breakpoints}
					prevActivateId="featured-carousel-button-prev"
					nextActivateId="featured-carousel-button-next"
					prevButtonClassName="start-3  3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
					nextButtonClassName={`end-3  3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 `}
					className={`rounded-md border border-black/10 py-6  ${classNameCarousel}`}
				>
					{Slides?.map((item: any, i: number) => (
						<SwiperSlide key={`featured-key-${item.title}${i}`}>
							<FeaturedCard item={item}/>
						</SwiperSlide>
					))}

				</Carousel>}
		</div>
	);
};

export default FeatureCarousel;
