import Link from 'next/link';
import Image from '@components/ui/image';
import {Category} from '@framework/types';
import cn from 'classnames';
import {useTranslation} from 'next-i18next';
import {LinkProps} from 'next/link';
import {ROUTES} from "@utils/routes";
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";
import {categoryPlaceholder} from '@assets/placeholders';

interface Props {
	category: Category;
	href: LinkProps['href'];
	className?: string;
	variant?: 'default' | 'small';
}

const CategoryListCard: React.FC<Props> = ({
	                                           category,
	                                           className,
	                                           href,
	                                           variant = 'default',
                                           }) => {
	const {name, image, children} = category;
	const {t} = useTranslation('common');
	const {locale} = useRouter();
	const dir = getDirection(locale);
	const SUBCATEGORIES_LIMITS = 5;
	return (
		<div className={`wb-categories__items  ${dir == 'rtl' ? 'pl-4' : 'pr-4'}`}>
			<Link href={href}
			      className={cn(
				      'group flex justify-between items-center px-0 transition pb-5',
				      className
			      )}
			>
				<Image
					src={image?.original ?? categoryPlaceholder}
					alt={name || t('text-category-thumbnail')}
					width={255}
					height={160}
					className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform group-hover:opacity-80"
				/>
			</Link>

			<h3 className="text-[16px] text-skin-base capitalize  font-medium hover:text-skin-primary">
				<Link href={href}>{name}</Link>
			</h3>
			{Array.isArray(children) ? (
				<ul key="content" className="py-3 text-[14px] leading-6">
					{children.slice(0, SUBCATEGORIES_LIMITS)?.map((currentItem: any, idx: number) => {
						return (
							<li className="pb-1 hover:text-skin-primary" key={`${idx}`}>
								<Link
									href={{
										pathname: ROUTES.SEARCH,
										query: {category: currentItem.slug},
									}}
								>
									{currentItem.name}
								</Link>
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
};

export default CategoryListCard;
