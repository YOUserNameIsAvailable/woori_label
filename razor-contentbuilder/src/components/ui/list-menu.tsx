import { useTranslation } from 'next-i18next';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Link from "next/link";
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";

const ListMenu = ({ dept, data, hasSubMenu, menuIndex, builder }: any) => {
  const { t } = useTranslation('menu');
    const { locale } = useRouter();
    const dir = getDirection(locale);
  return (
    <li className="relative">
      <Link
        href={data.path}
        className="flex items-center justify-between py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-skin-dropdown-hover hover:text-skin-primary"
      >
        {t(data.label)}
        {data.subMenu && (
          <span className="text-sm mt-0.5 shrink-0">
              {dir === 'rtl' ? <IoIosArrowBack className="text-body transition duration-300 ease-in-out group-hover:text-skin-base" />
                  : <IoIosArrowForward className="text-body transition duration-300 ease-in-out group-hover:text-skin-base" />}
          </span>
        )}
      </Link>
      {hasSubMenu && (
        <SubMenu dept={dept} data={data.subMenu} menuIndex={menuIndex} />
      )}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
  dept = dept + 1;
  return (
    <ul className="subMenuChild shadow-subMenu bg-skin-fill absolute z-0 end-full 2xl:end-auto 2xl:start-full opacity-0 invisible top-4 w-56 py-3">
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
