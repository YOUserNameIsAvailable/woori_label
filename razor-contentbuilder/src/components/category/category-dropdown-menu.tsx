import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import SidebarMenu from '@components/ui/sidebar-menu';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';
import CategoryMenu from '@components/ui/category-menu';

interface CategoryDropdownProps {
  className?: string;
  categoriesLimit?: number;
}

const CategoryDropdownMenu: React.FC<CategoryDropdownProps> = ({
  className,
  categoriesLimit= 12
}) => {
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 15,
  });

  return (
    <div className={cn('absolute z-30 w-72 lg:w-full ', className)}>
      <div className="max-h-full">
        {error ? (
          <div className="2xl:pe-10">
            <Alert message={error.message} />
          </div>
          // @ts-ignore
        ) : loading && !data?.categories?.data?.length ? (
          <div className={"w-full bg-skin-fill border-t-0 border-2 border-skin-primary rounded-b-md category-dropdown-menu"}>
            {Array.from({ length: 6 }).map((_, idx) => (
                  <CategoryListCardLoader
                      key={`category-list-${idx}`}
                      uniqueKey="category-list-card-loader"
                  />
              ))}
          </div>
        ) : (
          <CategoryMenu items={data?.categories?.data} categoriesLimit={categoriesLimit} />
        )}
      </div>
    </div>
  );
};

export default CategoryDropdownMenu;
