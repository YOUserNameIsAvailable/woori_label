import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {getDirection} from "@utils/get-direction";
import HeaderMenutop from "@components/layout/header/header-menutop";

interface MenuProps {
  classNameLink?: string;
}

const LanguageSwitcher: React.FC<MenuProps> = ({classNameLink }) => {

  const { site_header } = siteSettings;
  const { t } = useTranslation('common');
  const options = site_header.languageMenu;
  const router = useRouter();
  const { asPath, locale } = router;
  const currentSelectedItem = locale
    ? options.find((o) => o.value === locale)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);
  const dir = getDirection(locale);
  function handleItemClick(values: any) {
    setSelectedItem(values);
    router.push(asPath, undefined, {
      locale: values.value,
    });
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative z-10 lg:top-[1px]">
          <Listbox.Button className="text-skin-base relative w-full py-2 px-5 pe-5  text-start  focus:outline-none cursor-pointer">
            <span className={`${classNameLink? classNameLink: 'text-gray-300' } flex truncate items-center`}>
              <span className="me-2 w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                {selectedItem.icon}
              </span>
              <span className="leading-5 pb-0.5">{t(selectedItem.name)}</span>
            </span>
            <span className={`absolute inset-y-0  flex items-center pointer-events-none ${dir === 'rtl' ? '-left-2' : '-right-2'}`}>
              <BsChevronDown
                className="w-7 h-3.5 text-white opacity-40"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute end-0 3xl:start-0 w-full py-1 mt-1 overflow-auto bg-skin-fill rounded shadow-dropDown max-h-60 focus:outline-none text-sm min-w-[150px]"
            >
              {options?.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-skin-base bg-skin-dropdown-hover'
                        : 'text-skin-base'
                    }
												cursor-pointer relative py-2 px-3`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center">
                      <span className="w-[22px] h-4">{option.icon}</span>
                      <span
                        className={`${
                          selected ? 'font-medium ' : 'font-normal'
                        } block truncate ms-1.5 text-sm pb-0.5`}
                      >
                        {t(option.name)}
                      </span>

                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
export default LanguageSwitcher;