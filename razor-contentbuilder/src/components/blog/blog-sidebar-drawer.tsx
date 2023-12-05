import {BlogSidebar} from "@components/blog/blog-sidebar";
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
import Heading from '@components/ui/heading';

const BlogSidebarDrawer = () => {
  const { closeFilter } = useUI();
  const router = useRouter();
  const { t } = useTranslation('common');
  const dir = getDirection(router.locale);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border border-skin-base flex justify-between items-center relative pe-5 md:pe-7 flex-shrink-0 py-0.5">
        <button
          className="flex text-2xl items-center justify-center px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={closeFilter}
          aria-label="close"
        >
          {dir === 'rtl' ? (
            <IoArrowForward className="text-skin-base" />
          ) : (
            <IoArrowBack className="text-skin-base" />
          )}
        </button>
        <Heading variant="titleMedium" className="pe-6 text-center w-full">
          {t('text-sidebar')}
        </Heading>
      </div>

      <Scrollbar className="menu-scrollbar flex-grow mb-auto">
        <div className="flex flex-col py-7 px-5 md:px-7 text-heading">
          <BlogSidebar />
        </div>
      </Scrollbar>

    </div>
  );
};

export default BlogSidebarDrawer;
