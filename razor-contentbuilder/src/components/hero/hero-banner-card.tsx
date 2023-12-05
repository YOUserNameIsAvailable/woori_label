import type {FC} from 'react';
import cn from 'classnames';
import Link from "next/link";
import useWindowSize from '@utils/use-window-size';
import HeroSearchBox from '@components/hero/hero-banner-search';
import {useTranslation} from 'next-i18next';

interface BannerProps {
	banner?: any;
	className?: string;
	heroContentCard?: boolean;
	variant?: 'default' | 'slider' | 'medium';
}

function getImage(deviceWidth: number, imgObj: any) {
	return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const HeroBannerCard: FC<BannerProps> = ({
	                                         banner,
	                                         className = 'py-20 xy:pt-24',
	                                         variant = 'default', heroContentCard = true,
                                         }) => {
	const {t} = useTranslation('common');
	const {width} = useWindowSize();
	const {title, description, imageSrc, image} = banner;
	// const selectedImage = getImage(width!, image);
	return (heroContentCard ? (
			<div
				className={cn(
					'w-full bg-skin-thumbnail bg-no-repeat bg-cover bg-center flex items-center',
					{
						'h-full min-h-[180px]  xl:min-h-[500px] 2xl:min-h-[550px]':
							variant === 'slider',
					},
					className
				)}
				style={{
					backgroundImage: `url('${image?.imageSrc}')`,
				}}
			>
				<div
					className={cn(
						'mx-auto h-full flex flex-col xl:max-w-[1300px] 2xl:w-[1300px]',
						{
							'max-w-[480px] md:max-w-[550px]': variant === 'default' || 'slider',
							'max-w-[480px] md:max-w-[650px]': variant === 'medium',
						}
					)}
				>
					<div className="text-left">
						<h2
							className={cn(
								'text-2xl md:text-4xl font-medium leading-snug md:leading-tight xl:leading-[1.3em] mb-3 md:mb-4 xl:mb-3 -mt-2 xl:-mt-3 2xl:-mt-4',
								{
									'text-skin-secondary xl:text-5xl 2xl:text-[48px]':
										variant === 'default',
									'text-skin-secondary xl:text-[40px] 2xl:text-5xl 2xl:mb-4 2xl:pb-0.5':
										variant === 'medium',
									'text-skin-inverted xl:text-5xl 2xl:text-[48px]':
										variant === 'slider',
								}
							)}
						>
							{t(title)}
						</h2>
						<p
							className={cn(
								'text-base md:text-[15px] xl:text-lg leading-7 md:leading-8 xl:leading-[1.92em]',
								{
									'text-skin-base text-opacity-80 ':
										variant === 'default',
									'text-skin-inverted': variant === 'slider',
									'2xl:px-24': variant === 'medium',
								}
							)}
						>
							{t(description)}
						</p>
						{banner.btnText && (
							<Link
								href={banner.btnUrl}
								className="h-[45px] mt-7 md:mt-12 text-base inline-flex items-center justify-center transition duration-300 rounded px-10 py-2 font-semibold border-2 text-white hover:border-skin-primary hover:bg-skin-primary"
							>
								{t(banner.btnText)}
							</Link>
						)}

						{banner.searchBox && (
							<div className="hidden lg:flex max-w-[620px] mx-auto md:pt-1 lg:pt-3">
								<HeroSearchBox/>
							</div>
						)}
					</div>
				</div>
			</div>
		) : (
			<Link href={banner.btnUrl}>
				<div
					className={cn(
						'w-full bg-skin-thumbnail bg-no-repeat bg-cover flex items-center',
						{
							'min-h-[160px]  ':
								variant === 'slider',
						},
						className
					)}
					style={{
						backgroundImage: `url('${imageSrc}')`,
					}}
				>
				</div>
			</Link>
		)
	);
};

export default HeroBannerCard;
