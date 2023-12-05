import BannerCard from '@components/cards/banner-card';
import {IsEditable, onlyForBuilder} from "@components/config";


interface BannerProps {
	className?: string;
	girdClassName?: string;
	BannerGrid: any;
}

const defaultData = [
	{
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/banner-1.jpg",
			"imageAlt": ""
		},
		"linkText": "/search",
		"link": "/search",
		"variant": "rounded"
	},
	{
		"image": {
			"imageSrc": "https://builder.smart-ui.pro/files/banner-2.jpg",
			"imageAlt": ""
		},
		"linkText": "/search",
		"link": "/search",
		"variant": "rounded"
	}
]

const BannerGrid: React.FC<BannerProps> = ({BannerGrid = defaultData, girdClassName = '2xl:gap-5', className}) => {

	console.log('BannerGridProps ', {BannerGrid, girdClassName})

	if (onlyForBuilder()) {
		return (
			<div data-component="BannerGrid" style={{margin: "0 0 15px 0"}}>
				<div data-props="BannerGrid">
					className:
					<p {...IsEditable({className: "textContent"})}>mb-8 lg:mb-12</p>
					<br/>

					girdClassName:
					<p {...IsEditable({girdClassName: "textContent"})}>xl:gap-5 </p>
				</div>
				<br/>
				<div data-repeater="BannerGrid" style={{borderBottom: "solid red 1px", margin: "0 0 15px 0"}}>
					<div style={{display: "flex", justifyContent: "space-between"}}>
						<div data-repeaterbtn="collapseElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#E5E7EB", fontSize: "16px", color: "#000"}}>
							Collapsed
						</div>

						<div data-repeaterbtn="removeElem" style={{cursor: "pointer", margin: "0 0 10px 0", padding: "2px 15px", borderRadius: "9999px", background: "#EF4444", fontSize: "16px", color: "#fff"}}>
							Remove Banner
						</div>
					</div>

					<div data-repeaterbody="BannerGrid" className={'active'}>
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
		<div data-component={"BannerGrid"} className={className}>
			<div className={`grid gap-4  grid-cols-1 lg:grid-cols-${BannerGrid.length} sm:grid-cols-${BannerGrid.length === 1 ? `${BannerGrid.length}` : 2} ${girdClassName}`}>
				{BannerGrid?.map((banner: any, i: number) => {
					return (
						<BannerCard key={`banner--key${i}`} banner={...banner} effectActive={true} className={`w-full`}/>
					)
				})}
			</div>
		</div>
	)
}

export default BannerGrid;
