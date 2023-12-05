import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import SidebarMenu from '@components/ui/sidebar-menu';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';
import SectionHeader from "@components/common/section-header";

interface CategorySidebarProps {
  className?: string;
}

const CategoryDropdownSidebar: React.FC<CategorySidebarProps> = ({
  className,
}) => {
  const {data, isLoading: loading, error} = useCategoriesQuery({limit: 10,});

  return (
    <aside
      className={cn('category-mobile-sidebar', className)}
    >
      <div className=" mb-5 md:mb-6">
        <SectionHeader sectionHeading={`text-all-categories`} className="mb-0 block-title" />
      </div>
      <div className="max-h-full overflow-hidden  h-full">
        {error ? (
          <div className="2xl:pe-10">
            <Alert message={error.message} />
          </div>
        ) : (
          <Scrollbar className="category-scrollbar w-full h-full">
            {
              // @ts-ignore
              loading && !data?.categories?.data?.length ? (
              Array.from({ length: 15 }).map((_, idx) => (
                <CategoryListCardLoader
                  key={`category-list-${idx}`}
                  uniqueKey="category-list-card-loader"
                />
              ))
            ) : (
              <SidebarMenu items={data?.categories?.data} />
            )}
          </Scrollbar>
        )}
      </div>
    </aside>
  );
};

export default CategoryDropdownSidebar;
