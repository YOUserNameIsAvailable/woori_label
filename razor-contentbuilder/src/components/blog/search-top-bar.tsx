import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import { useUI } from '@contexts/ui.context';
import {BlogSidebar} from "@components/blog/blog-sidebar";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getDirection } from '@utils/get-direction';
import BlogSidebarDrawer from "@components/blog/blog-sidebar-drawer";

const SearchTopBar = () => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return (
    <div className="flex justify-between items-center ">
      <button
        className="mb-5 lg:hidden text-skin-base text-sm px-4 py-2 font-semibold border border-skin-base rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:border-skin-primary hover:text-skin-primary"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ps-2.5">{t('text-sidebar')}</span>
      </button>
        <Drawer
            placement={dir === 'rtl' ? 'right' : 'left'}
            open={displayFilter}
            onClose={closeFilter}
            handler={false}
            showMask={true}
            level={null}
            contentWrapperStyle={contentWrapperCSS}
        >
            <BlogSidebarDrawer />
        </Drawer>
    </div>
  );
};

export default SearchTopBar;
