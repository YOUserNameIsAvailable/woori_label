import type {FC} from 'react';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import Alert from '@components/ui/alert';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import {useBlogsQuery} from '@framework/blog/get-all-blogs';
import {LIMITS} from '@framework/utils/limits';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@components/ui/pagination";
import {useState} from "react";
import BlogCardBig from "@components/blog/blog-card-big";
import {getDirection} from "@utils/get-direction";

interface blogGridProps {
    className?: string;
}

export const BlogBig: FC<blogGridProps> = ({className = ''}) => {
    const {t} = useTranslation('common');
    const { locale } = useRouter();
    const dir = getDirection(locale);

    const {data, isLoading, error} = useBlogsQuery({limit: 10});
    const dataBlog = data?.blogs?.data;

    return (
        <>
            <div
                className={cn(
                    'grid grid-cols-1 gap-[35px] ',
                    className
                )}
                >{error ? (
                    <div className="col-span-full ">
                        <Alert message={error?.message}/>
                    </div>
                ) : isLoading && !dataBlog?.length ? (
                    Array.from({length: 10}).map((_, idx) => (
                        <article className={`flex flex-col product-card m-3 h-full`} key={`blog--key-${idx}`}>
                            <ProductCardLoader
                                uniqueKey={`blog--key-${idx}`}
                            />
                        </article>
                    ))
                ) : (
                dataBlog?.map((item: any) => {
                        return <BlogCardBig key={`blog--key-${item.id}`} blog={item}/>;
                    })
                )}
                {/* end of error state */}
            </div>

        </>
    );
};
