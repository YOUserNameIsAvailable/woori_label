import cn from 'classnames';
import {useTranslation} from 'next-i18next';
import Link from "next/link";
import {IoIosArrowForward, IoIosAddCircleOutline, IoIosRemoveCircleOutline, IoIosArrowBack} from 'react-icons/io';
import Image from '@components/ui/image';
import {ROUTES} from '@utils/routes';
import {useState} from "react";
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";
import SubMegaVertical from "@components/ui/mega/sub-mega-vertical";

function SidebarMenuItem({className, item, depth = 0}: any) {
    const {t} = useTranslation('common');
    const {locale} = useRouter();
    const dir = getDirection(locale);
    const {name, children: items, icon, type} = item;

    return (
        <>
            <li
                className={`px-4  transition ${type != 'mega' && 'relative'} ${
                    className
                        ? className
                        : 'text-sm hover:text-skin-primary '
                }`}
            >
                <Link
                    href={ROUTES.SEARCH}
                    className={cn(
                        'flex items-center w-full py-3 text-start outline-none focus:outline-none focus:ring-0 focus:text-skin-base'
                    )}
                >
                    {icon && (
                        <div className="inline-flex flex-shrink-0 w-8 3xl:h-auto">
                            <Image
                                src={icon ?? '/assets/placeholder/category-small.svg'}
                                alt={name || t('text-category-thumbnail')}
                                width={25}
                                height={25}
                            />
                        </div>
                    )}
                    <span className="capitalize ">
                        {name}
                    </span>
                    {items && (
                        <span className="ms-auto hidden md:inline-flex">
                            {dir === 'rtl' ? <IoIosArrowBack className="text-15px text-skin-base text-opacity-40"/>
                                : <IoIosArrowForward className="text-15px text-skin-base text-opacity-40"/>}
                         </span>
                    )}
                </Link>
                {Array.isArray(items) && (
                    <>
                        {type != 'mega' ? (
                            <div
                                className={`dropdownMenu hidden md:block absolute z-10 left-full top-0 w-64 bg-skin-fill opacity-0 invisible shadow-md subMenu--level${depth}`}>
                                <ul key="content" className="text-xs px-1 py-3">
                                    {items?.map((currentItem) => {
                                        const childDepth = depth + 1;
                                        return (
                                            <SidebarMenuItem
                                                key={`${currentItem.name}${currentItem.slug}`}
                                                item={currentItem}
                                                depth={childDepth}
                                                className={cn(
                                                    'text-sm p-0 pe-4 text-skin-base hover:text-skin-primary mb-0.5'
                                                )}
                                            />
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <SubMegaVertical items={items} />
                        )}
                    </>

                )}
            </li>
        </>
    );
}

function CategoryMenu({items, categoriesLimit, className}: any) {
    const [categoryMenuToggle, setcategoryMenuToggle] = useState(Boolean(false));
    const {t} = useTranslation('common');
    const {locale} = useRouter();
    const dir = getDirection(locale);

    function handleCategoryMenu() {
        setcategoryMenuToggle(!categoryMenuToggle);
    }

    return (
        <ul
            className={cn(
                'w-full bg-skin-fill border-t-0 border-2 border-skin-primary rounded-b-md category-dropdown-menu',
                className
            )}
        >

            {items?.map((item: any, idx: number) => (
                idx <= categoriesLimit - 1 ? (
                    <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item}/>
                ) : (
                    categoryMenuToggle && <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item}/>
                )
            ))}

            {items.length >= categoriesLimit && (
                <li className={`px-4 relative transition text-sm hover:text-skin-primary`}>
                    <div
                        className={`flex items-center w-full py-3 text-start cursor-pointer`}
                        onClick={handleCategoryMenu}>
                        <div className={`inline-flex flex-shrink-0 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                            {categoryMenuToggle ? (
                                <IoIosRemoveCircleOutline className="text-xl text-skin-base text-opacity-80"/>
                            ) : (
                                <IoIosAddCircleOutline className="text-xl text-skin-base text-opacity-80"/>
                            )}
                        </div>
                        <span className="capitalize ">
                            {t('text-all-categories')}
                        </span>
                    </div>
                </li>
            )}
        </ul>
    );
}

export default CategoryMenu;
