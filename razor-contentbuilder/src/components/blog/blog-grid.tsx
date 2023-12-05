import type {FC} from 'react';
import {useRouter} from 'next/router';
import {useTranslation} from 'next-i18next';
import Alert from '@components/ui/alert';
import BlogCard from '@components/blog/blog-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import {useBlogsQuery} from '@framework/blog/get-all-blogs';
import {GrNext, GrPrevious} from "react-icons/gr";
import Pagination from "@components/ui/pagination";
import {useState} from "react";
import {getDirection} from "@utils/get-direction";

interface blogGridProps {
    className?: string;
}

export const BlogGrid: FC<blogGridProps> = ({className = ''}) => {
    const {t} = useTranslation('common');
    const { locale } = useRouter();
    const dir = getDirection(locale);

    const {data, isLoading, error} = useBlogsQuery({limit: 10,});
    const dataBlog = data?.blogs?.data;


    const [currentPage, setCurrentPage] = useState(1);
    const [value, setValue] = useState('');
    const countPerPage = 8;
    const useDatablog = dataBlog?.slice(0, countPerPage);

    let [filterData, setDataValue] = useState([useDatablog]);

    const updatePage = (p: any) => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        //setDataValue(dataBlog?.slice(from, to));
    };

    return (
        <>
            <div
                className={cn(
                    'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] sm:gap-[30px]',
                    className
                )}
                >{error ? (
                    <div className="col-span-full ">
                        <Alert message={error?.message}/>
                    </div>
                ) : isLoading && !filterData?.length ? (
                    Array.from({length: 10}).map((_, idx) => (
                        <article className={`flex flex-col product-card m-3 h-full`} key={`blog--key-${idx}`}>
                            <ProductCardLoader
                                uniqueKey={`blog--key-${idx}`}
                            />
                        </article>
                    ))
                ) : (
                dataBlog?.map((item: any) => {
                            return <BlogCard key={`blog--key-${item.id}`} blog={item}/>;
                        })
                    )}

            </div>
            <Pagination
                current={currentPage}
                onChange={updatePage}
                pageSize={countPerPage}
                total={dataBlog?.length}
                prevIcon={<GrPrevious size={14}  className={`m-auto my-1.5 ${dir == 'rtl' && 'rotate-180'}`}/>}
                nextIcon={<GrNext size={14}  className={`m-auto my-1.5 ${dir == 'rtl' && 'rotate-180'}`}/>}
                className="blog-pagination"
            />
        </>
    );
};
