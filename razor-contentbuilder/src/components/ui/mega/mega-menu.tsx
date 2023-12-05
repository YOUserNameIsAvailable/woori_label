import {useTranslation} from 'next-i18next';
import Link from "next/link";
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";
import Image from "@components/ui/image";

const ListMenu = ({dept, data, hasSubMenu, menuIndex}: any) => {
    const {t} = useTranslation('menu');
    const {locale} = useRouter();
    const dir = getDirection(locale);

    return (
        <li className="relative">
            {data?.image && (
                <Link href={data.path}>

                        <Image
                            src={data?.image?.thumbnail ?? '/assets/placeholder/collection.svg'}
                            alt={data.label || t('text-category-thumbnail')}
                            width={255}
                            height={160}
                            className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform "
                        />

                </Link>
            )}

            <Link
                href={data.path}
                className={`flex items-center justify-between py-2 hover:text-skin-primary ${data.subMenu ? 'text-base font-medium' : ' '}`}
            >
                {t(data.label)}
            </Link>
            {hasSubMenu && (
                <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex}/>
            )}
        </li>
    );
};

const SubMenu: React.FC<any> = ({dept, data, menuIndex}) => {
    dept = dept + 1;
    return (
        <ul className="subMenuChild  w-full py-1">
            {data?.map((menu: any, index: number) => {
                const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
                return (
                    <ListMenu
                        dept={dept}
                        data={menu}
                        hasSubMenu={menu.subMenu}
                        menuName={menuName}
                        key={menuName}
                        menuIndex={index}
                    />
                );
            })}
        </ul>
    );
};

export default ListMenu;
