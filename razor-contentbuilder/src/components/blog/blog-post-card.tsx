import cn from 'classnames';
import Image from '@components/ui/image';
import Link from "next/link";
import {Blog} from '@framework/types';

import {useTranslation} from 'next-i18next';
import {productPlaceholder} from '@assets/placeholders';
import {ROUTES} from "@utils/routes";
import {getCountview} from "@utils/get-countview";
import LabelIcon from "@components/icons/label-icon";
import TagLabel from "@components/ui/tag-label";
import SocialShareThis from "@components/ui/share-this";

interface BlogProps {
    blog: Blog;
    className?: string;
}


const BlogPostCard: React.FC<BlogProps> = ({blog, className}) => {
    const {
        title, image, totalWatchCount, slug, date, category, tags,
        authorName, content, titleTwo, contentTwo, contentThree, quote
    } = blog ?? {};
    const {t} = useTranslation('common');
    const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.BLOG}/${slug}`;
    // @ts-ignore
    return (
        <article
            className={cn(
                'flex flex-col product-card overflow-hidden  h-full',
                className
            )}
            title={title}
        >

            <div className="pb-5 h-full relative">
                <div className="text-base font-semibold mb-2.5 text-skin-primary">{category}</div>
                <h4 className={"font-bold text-2xl lg:text-4xl mb-3.5 "}>
                    <Link
                        href={`${ROUTES.BLOG}/${slug}`}
                        className="text-skin-base line-clamp-2 hover:text-skin-primary"
                    >
                        {title}
                    </Link>
                </h4>
                <div className="entry-meta text-13px text-gray-400">
                    <span className="post-by pe-2.5 relative inline-block"> By {authorName}</span>
                    <span className="has-dot px-2.5 relative inline-block"> {`${date?.date} ${date?.month} ${date?.year}`}</span>
                    <span className="has-dot px-2.5 relative inline-block">{getCountview(totalWatchCount)} {t('text-view')}</span>
                    <span className="has-dot ps-2.5 relative inline-block">4 mins read</span>
                </div>

            </div>
            <div className="relative flex-shrink-0 mb-10">
                <Link
                    href={`${ROUTES.BLOG}/${slug}`}
                    className="text-skin-base "
                >
                    <div className="card-img-container max-w-[1050px] overflow-hidden flex mx-auto relative rounded-xl">
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
            <div
                className="single-content text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7 mb-10">
                <p>{content}</p>
                <h3 className="mt-8 mb-3 text-[20px] text-skin-base font-medium truncate">{titleTwo}</h3>
                <p>{contentTwo}</p>
                <blockquote
                    className={'lg:max-w-[80%] my-10 mx-auto rounded-xl text-gray-500 bg-[#f4f6fa] text-[22px] px-8 lg:px-12 py-8'}>
                    {quote?.content}
                </blockquote>
                <p>{contentThree}</p>
            </div>
            <hr className="w-full border-gray-200 mb-6"/>
            <div className={'entry-bottom by-5 flex flex-col gap-3 md:flex-row justify-between'}>
                <div className={`tags`}>
                    {tags && (
                        <ul className="pt-0">
                            <li className="text-sm text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
                                <LabelIcon className="me-2"/> {t('text-tags')}:
                            </li>
                            {tags?.map((item: any) => (
                                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                                    <TagLabel data={item}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={`social-icons single-share`}>
                    <SocialShareThis
                        className={`flex items-center opacity-100 top-full`}
                        shareUrl={blogUrl}
                    />
                </div>
            </div>
        </article>
    );
};

export default BlogPostCard;
