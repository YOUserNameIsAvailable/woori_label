import cn from 'classnames';
import dynamic from 'next/dynamic';
import {ROUTES} from '@utils/routes';
import Link from "next/link";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-feed";
import useWindowSize from "@utils/use-window-size";
import {useState} from "react";
import {FiChevronDown} from "react-icons/fi";
import CategoryDropdownMenu from "@components/category/category-dropdown-menu";

interface Props {
    className?: string;
    data: any;
}

const ListingTabsList: React.FC<Props> = ({className = 'mb-12 pb-0.5', data}) => {
    const { width } = useWindowSize();
    const [categoryMenu, setCategoryMenu] = useState(Boolean(false));


    function handleCategoryMenu() {
        setCategoryMenu(!categoryMenu);
    }
    return (
        <div className={cn('sm:flex items-center block-title mb-3 gap-2', className)}>
            <h3 className="text-[20px] text-skin-base font-medium  border-0 hover:text-skin-primary lg:basis-[30%]">
                <Link
                    href={{
                        pathname: ROUTES.SEARCH,
                        query: { category: data?.slug },
                    }}
                >
                       {data?.name}
                </Link>
            </h3>
            {Array.isArray(data?.children)  ? (
                <>
                    {
                        width! > 1280 ? (
                            <div className="ltabs-tabs-wrap flex flex-wrap	 justify-end lg:basis-[70%]">
                            <ul key="content" className="flex text-[14px] leading-7 ">
                                {data?.children.slice(0, 4)?.map((currentItem: any, idx:number) => {
                                    return (
                                        <li className={`ps-5 hover:text-skin-primary`} key={`${idx}`} >
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
                            <div className="ltabs-tabs-wrap relative z-10">
                                <button
                                    className="flex justify-between border border-skin-base rounded-md min-w-[170px] focus:outline-none text-sm  px-3 py-2 mt-3 mb-1"
                                    onClick={handleCategoryMenu}
                                >
                                    <span className="inline-flex me-2.5">
                                        {data?.children[0].name}
                                    </span>
                                    <FiChevronDown className="text-xl lg:text-2xl"/>
                                </button>
                                {categoryMenu  && (
                                    <div id="dropdown"  className="z-10 w-44 bg-white rounded drop-shadow absolute">
                                        <ul key="content" className="py-2 text-[14px] leading-6">
                                            {data?.children.slice(0, 4)?.map((currentItem: any, idx:number) => {
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
