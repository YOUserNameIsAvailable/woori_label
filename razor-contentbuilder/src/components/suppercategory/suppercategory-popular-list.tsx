import cn from 'classnames';
import {ROUTES} from '@utils/routes';
import Link from "next/link";
import {useTranslation} from "next-i18next";

interface Props {
    className?: string;
    data: any;
    showBanner: boolean;
}

const SupperCategoryList: React.FC<Props> = ({className = 'mb-12 pb-0.5', data,showBanner}) => {
    const {t} = useTranslation('common');
    let CATEGORIES_LIMITS = 5;
    if(showBanner)  CATEGORIES_LIMITS = 8;

    return (
        <div className={cn('heightFull-demo', className)}>
            {Array.isArray(data?.children) ? (
                <ul key="content" className="text-[14px] leading-7">
                    {data?.children.slice(0, CATEGORIES_LIMITS)?.map((currentItem: any, idx:number) => {
                        return (
                            <li className="border-b border-black/10 py-2 hover:text-skin-primary" key={`${idx}`}>
                                <Link
                                    href={{
                                        pathname: ROUTES.SEARCH,
                                        query: { category: currentItem.slug },
                                    }}
                                >
                                    {currentItem.name}
                                </Link>
                            </li>
                        );
                    })}
                    <li className=" text-skin-primary py-2 hover:text-skin-primary">
                        <Link
                            href={{
                                pathname: ROUTES.SEARCH,
                                query: { category: data?.slug },
                            }}
                        >
                            {t('text-view-all-categories')}
                        </Link>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

export default SupperCategoryList;
