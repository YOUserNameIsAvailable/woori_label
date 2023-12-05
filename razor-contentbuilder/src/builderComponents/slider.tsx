import HeroBannerCard from '@components/hero/hero-banner-card';
import Carousel from '@components/ui/carousel/carousel';
import {SwiperSlide} from '@components/ui/carousel/slider';
import {onlyForBuilder, IsEditable} from "@components/config";

interface Props {
	className?: string;
	contentClassName?: string;
	heroContent?: boolean;
	builderProps?: any
	Slides?: any
}

const defaultSlider = [
	{
		"title": "Smart Electric New Cooker 2021",
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/slider_1.jpg",
			"imageAlt": ""
		},
		"description": "This all-in-one cooking solution uses an induction system that reacts.",
		"btnText": "Get it Now",
		"btnUrl": "/search"
	},
	{
		"title": "Smart Electric New Cooker 2021",
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/slider_2.jpg",
			"imageAlt": ""
		},
		"description": "This all-in-one cooking solution uses an induction system that reacts.",
		"btnText": "Get it Now",
		"btnUrl": "/search"
	}
]



const Slider: React.FC<Props> = ({
	                                 className = 'mb-7',
	                                 contentClassName = 'py-24',
	                                 heroContent = true,
	                                 Slides = defaultSlider, ...props
                                 }) => {



	if (onlyForBuilder()) {
		return (
				<div data-component="Slider" style={{ margin: "0 0 15px 0" }}>
					<div data-repeater="Slides" style={{ borderBottom: "solid red 1px", margin: "0 0 15px 0" }}>
						<div style={{display: "flex", justifyContent: "space-between"}}>
							<div data-repeaterbtn="collapseElem" style={{ cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#E5E7EB", fontSize: "16px", color: "#000"}}>
								Collapsed
							</div>

							<div data-repeaterbtn="removeElem" style={{ cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#EF4444", fontSize: "16px", color: "#fff" }}>
								Remove Slide
							</div>
						</div>

					<div data-repeaterbody="Slides" className={'active'}>
						<h2 {...IsEditable({ title: "textContent" })}>Title</h2>
						<img {...IsEditable({ imageSrc: "src", imageAlt: "textContent" })} src="https://lavar.com.ua/image/cache/catalog/vafelni-kartynku/vk-1172-750x750-product_thumb.jpg" alt="" />
						<p {...IsEditable({ description: "textContent" })}>paragraph text</p>
						<a {...IsEditable({ btnText: "textContent", btnUrl: "href" })} href="#"> link text </a>
					</div>

					</div>

					<div data-repeaterbtn="addElem" style={{ cursor: "pointer", display: "inline-block", padding: "2px 15px", borderRadius: "9999px", background: "#2C752F", fontSize: "16px", color: "#fff" }}>
						Add Slide
					</div>
				</div>

		)
	}

	return (
		<div data-component={"Slider"} className={`${className} mb-7 mt-6`} >
			{
				// @ts-ignore
				<Carousel
					pagination={{
						clickable: true,
					}}
					navigation={true}
					autoplay={true}
					prevActivateId={`prevActivateId`}
					nextActivateId={`nextActivateId`}
					className={'overflow-hidden'}
				>

					{Slides?.map((banner: any, i: number) => (
						<SwiperSlide key={`banner--key${i}`}>
							<HeroBannerCard
								banner={banner}
								variant="slider"
								heroContentCard={heroContent}
								className={contentClassName}
							/>
						</SwiperSlide>
					))}
				</Carousel>
				}
		</div>
	);
};

export default Slider;
