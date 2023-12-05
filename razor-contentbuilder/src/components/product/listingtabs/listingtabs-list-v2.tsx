import cn from 'classnames';
import dynamic from 'next/dynamic';
import {ROUTES} from '@utils/routes';
import Link from "next/link";
import useWindowSize from "@utils/use-window-size";
import {useState} from "react";
import {FiChevronDown} from "react-icons/fi";
import {useTranslation} from "next-i18next";

interface Props {
    className?: string;
    data: any;
}

const ListingTabsList: React.FC<Props> = ({className = 'mb-12 pb-0.5', data}) => {
    const CATEGORIES_LIMITS = 5;
    const {t} = useTranslation('common');
    const { width } = useWindowSize();
    const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
    function handleCategoryMenu() {
        setCategoryMenu(!categoryMenu);
    }
    return (
        <div className={cn('sm:flex justify-between items-center mb-3 gap-2', className)}>
            <h3 className="text-[20px] text-skin-base font-medium  border-0 lg:basis-[30%]">
                {data?.name} <span className="font-light"> {t('Product')}</span>
            </h3>
            {Array.isArray(data?.children)  ? (
                <>
                    {
                        width! > 1024 ? (
                            <div className="ltabs-tabs-wrap flex flex-wrap	 justify-end lg:basis-[70%]">
                            <ul key="content" className="flex text-[14px] leading-7 ">
                                {data?.children.slice(0, CATEGORIES_LIMITS)?.map((currentItem: any, idx:number) => {
                                    return (
                                        <li className="ps-5 text-gray-500 hover:text-skin-primary" key={`${idx}`}>
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

                            </ul>
                            </div>
                        ):(
                            <div className="ltabs-tabs-wrap relative z-40">
                                <button
                                    className="flex justify-between border border-skin-base rounded min-w-[180px] focus:outline-none text-sm  px-2 py-2 mt-3 mb-1 bg-white"
                                    onClick={handleCategoryMenu}
                                >
                                    <span className="inline-flex me-2.5">
                                        {data?.children[0].name}
                                    </span>
                                    <FiChevronDown className="text-xl "/>
                                </button>
                                {categoryMenu  && (
                                    <div id="dropdown"  className="z-10 w-44 bg-white rounded drop-shadow absolute">
                                        <ul key="content" className="py-2 text-[14px] leading-6">
                                            {data?.children.slice(0, CATEGORIES_LIMITS)?.map((currentItem: any, idx:number) => {
                                                return (
                                                    <li className="hover:text-skin-primary" key={`${idx}`}>
                                                        <Link
                                                            href={{
                                                                pathname: ROUTES.SEARCH,
                                                                query: { category: currentItem.slug },
                                                            }} className={"py-2 px-4 block whitespace-no-wrap"}>
                                                                {currentItem.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                            </div>

                        )
                    }
                </>
            ) : null}
        </div>
    );
};

export default ListingTabsList;
