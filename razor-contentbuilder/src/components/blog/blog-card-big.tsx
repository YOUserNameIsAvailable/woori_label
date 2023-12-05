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

const BlogCardBig: React.FC<BlogProps> = ({blog, className}) => {
    const {title, image, totalWatchCount, slug, date, shortDescription} = blog ?? {};
    const {t} = useTranslation('common');
    const {width} = useWindowSize();
    const iconSize = width! > 1024 ? '20' : '17';
    const { locale } = useRouter();
    const dir = getDirection(locale);

    return (
        <article
            className={cn(
                'blog-card overflow-hidden w-full ',
                className
            )}
            title={title}
        >
            <div className="relative ">
                <Link
                    href={`${ROUTES.BLOG}/${slug}`}
                    className="text-skin-base "
                >
                    <div className="card-img-container flex overflow-hidden  mx-auto relative rounded-xl">
                        <Image
                            src={image ?? productPlaceholder}
                            alt={title || 'Product Image'}
                            width={1050}
                            height={460}
                            quality={100}
                            className="object-cover bg-skin-thumbnail"
                        />
                    </div>
                </Link>
            </div>

            <div className="justify-center py-5 sm:py-8 relative">
                <h4 className={"font-semibold text-2xl lg:text-4xl mb-5"}>
                    <Link
                        href={`${ROUTES.BLOG}/${slug}`}
                        className="text-skin-base line-clamp-2 hover:text-skin-primary"
                    >
                        {title}
                    </Link>
                </h4>
                <div className="post-exerpt mb-6 text-gray-400">{shortDescription}</div>
                <div className={"flex justify-between items-center"}>
                    <div className="entry-meta text-13px text-gray-500 flex">
                        <span className="post-on pe-2.5 relative flex items-center gap-1.5"> <BsClock className="transition " /> {`${date.date} ${date.month} ${date.year}`}</span>
                        <span className="has-dot px-2.5 relative">{getCountview(totalWatchCount)} {t('text-view')}</span>
                    </div>
                    <Link
                        href={`${ROUTES.PRODUCTS}/${slug}`}
                        className="bg-skin-primary rounded text-white px-4 lg:px-5 py-2 hover:bg-opacity-90 focus:bg-opacity-70 text-13px flex items-center gap-1.5 "
                    >
                        {t("text-read-more")}
                        <BsArrowRight className={`${dir == 'rtl' && 'rotate-180'}`} />
                    </Link>
                </div>


            </div>
        </article>
    );
};

export default BlogCardBig;
