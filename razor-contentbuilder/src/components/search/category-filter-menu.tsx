import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useMemo, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import { FaCheck } from 'react-icons/fa';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItem({
  className = 'text-skin-base hover:text-skin-primary  py-3 xl:py-3',
  item,
  depth = 0,
}: any) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );
  const isActive =
    checkIsActive(selectedCategories, item.slug) ||
    item?.children?.some((_item: any) =>
      checkIsActive(selectedCategories, _item.slug)
    );
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      const { category, ...restQuery } = query;
      let currentFormState = selectedCategories.includes(slug)
        ? selectedCategories.filter((i) => i !== slug)
        : [...selectedCategories, slug];
      router.push(
        {
          pathname,
          query: {
            ...restQuery,
            ...(!!currentFormState.length
              ? { category: currentFormState.join(',') }
              : {}),
          },
        },
        undefined,
        { scroll: false }
      );

      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-skin-base text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-skin-base text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex justify-between items-center transition text-sm border-b border-skin-base',
          { 'text-skin-primary border-b-0': isOpen },
          className
        )}
      >
        <button
          className={cn(
            'flex items-center w-full flex-start gap-2 cursor-pointer group',
            { 'py-2': depth > 0 }
          )}
          // onClick={handleChange}
        >
          {icon && (
            <div className="inline-flex flex-shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto me-2.5 md:me-4 2xl:me-3 3xl:me-4">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || t('text-category-thumbnail')}
                width={40}
                height={40}
              />
            </div>
          )}

          {depth > 0 && (
            <span
              className={`w-[20px] h-[20px] text-[11px] flex items-center justify-center border-2 border-skin-four rounded-full transition duration-500 ease-in-out group-hover:border-skin-yellow text-skin-inverted ${
                selectedCategories.includes(slug) &&
                'border-skin-yellow bg-skin-yellow'
              }`}
            >
              {selectedCategories.includes(slug) && <FaCheck />}
            </span>
          )}
          <span className="capitalize py-0.5">{name}</span>
          {expandIcon && <span className="ms-auto">{expandIcon}</span>}
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li className={'text-sm border-b border-skin-base'}>
          <ul key="content" className="text-xs pb-4">
            {items?.map((currentItem: any) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-b-0 "
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryFilterMenu({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={`${item.slug}-key-${item.id}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
