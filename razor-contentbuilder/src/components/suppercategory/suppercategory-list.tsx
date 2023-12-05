import cn from 'classnames';
import {ROUTES} from '@utils/routes';
import Link from "next/link";
import {useTranslation} from "next-i18next";

interface Props {
    className?: string;
    data: any;
}

const SupperCategoryList: React.FC<Props> = ({className = 'mb-12 pb-0.5', data}) => {
    const {t} = useTranslation('common');
    return (
        <div className={cn('heightFull-demo', className)}>
            <h3 className="text-[20px] text-skin-base font-medium block-title border-0 ">
                {data?.name}
            </h3>
            {Array.isArray(data?.children) ? (
                <ul key="content" className="pt-4 text-[14px] leading-7">
                    {data?.children.slice(0, 5)?.map((currentItem: any, idx:number) => {
                        return (
                            <li className="pb-2 hover:text-skin-primary" key={`${idx}`}>
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
                    <li className=" text-skin-primary hover:text-skin-primary">
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
