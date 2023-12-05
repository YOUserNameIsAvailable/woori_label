import cn from 'classnames';
import Image from '@components/ui/image';
import Link from "next/link";
import {Blog} from '@framework/types';
import useWindowSize from '@utils/use-window-size';
import {useTranslation} from 'next-i18next';
import {productPlaceholder} from '@assets/placeholders';
import {ROUTES} from "@utils/routes";
import {getCountview} from "@utils/get-countview";
import { BsArrowRight, BsClock } from 'react-icons/bs';
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";
interface BlogProps {
    blog: Blog;
    className?: string;
}

const BlogCardList: React.FC<BlogProps> = ({blog, className}) => {
    const {title, image, totalWatchCount, slug, date, shortDescription} = blog ?? {};
    const {t} = useTranslation('common');
    const {width} = useWindowSize();
    const iconSize = width! > 1024 ? '20' : '17';
    const { locale } = useRouter();
    const dir = getDirection(locale);
    return (
        <article
            className={cn(
                'flex flex-col sm:flex-row blog-card overflow-hidden w-full border border-black/10 rounded-xl',
                className
            )}
            title={title}
        >
            <div className="relative flex-shrink-0 ">
                <Link
                    href={`${ROUTES.BLOG}/${slug}`}
                    className="text-skin-base "
                >
                    <div className="card-img-container flex overflow-hidden max-w-[360px] lg:max-w-[440px] mx-auto relative sm:rounded-l-xl">
                        <Image
                            src={image ?? productPlaceholder}
                            alt={title || 'Product Image'}
                            width={440}
                            height={360}
                            quality={100}
                            className="object-cover bg-skin-thumbnail"
                        />
                    </div>
                </Link>
            </div>

            <div className="flex flex-col justify-center py-5 px-5 sm:px-8 h-full overflow-hidden relative">
                <h4 className={"font-semibold text-2xl lg:text-3xl mb-3.5 "}>
                    <Link
                        href={`${ROUTES.BLOG}/${slug}`}
                        className="text-skin-base line-clamp-2 hover:text-skin-primary"
                    >
                        {title}
                    </Link>
                </h4>
                <div className="post-exerpt mb-5 lg:mb-8 text-gray-500">{shortDescription}</div>
                <div className={"flex justify-between"}>
                    <div className="entry-meta text-13px text-gray-500 flex">
                        <span className="post-on pe-2.5 relative flex items-center gap-1.5"> <BsClock className="transition " /> {`${date.date} ${date.month} ${date.year}`}</span>
                        <span className="has-dot px-2.5 relative">{getCountview(totalWatchCount)} {t('text-view')}</span>
                    </div>
                    <Link
                        href={`${ROUTES.PRODUCTS}/${slug}`}
                        className="text-gray-500 hover:text-skin-primary text-13px flex items-center gap-1.5"
                    >
                        {t("text-read-more")}
                        <BsArrowRight className={`${dir == 'rtl' && 'rotate-180'}`} />
                    </Link>
                </div>


            </div>
        </article>
    );
};

export default BlogCardList;
