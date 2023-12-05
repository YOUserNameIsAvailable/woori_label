import Link from "next/link";
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

interface MenuProps {
  data: any;
  className?: string;
  classNameLink?: string;
}

const HeaderMenutop: React.FC<MenuProps> = ({ data, className,classNameLink }) => {
  const { t } = useTranslation('menu');
  return (
      <nav
          className={cn(
              ' flex relative -mx-2 md:-mx-3',
              className
          )}
      >
        {data?.map((item: any) => (
            <div
                className={`menuItem group cursor-pointer mx-2 md:mx-3 ${
                    item.subMenu ? 'relative' : ''
                }`}
                key={item.id}
            >
              <Link
                  href={item.path}
                  className={`${classNameLink? classNameLink: 'text-gray-300' } inline-flex items-center py-2 font-normal relative group-hover:text-skin-primary `}
              >
                {t(item.label)}
                {(item?.columns || item.subMenu) && (
                    <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-skin-base opacity-40 group-hover:text-skin-primary">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
                )}
              </Link>

            </div>
        ))}
      </nav>
  );
};

export default HeaderMenutop;
