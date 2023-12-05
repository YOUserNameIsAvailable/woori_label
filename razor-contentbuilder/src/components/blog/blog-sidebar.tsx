import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import BestSellerSidebarProductFeed from "@components/product/feeds/best-seller-sidebar-product-feed";

export const BlogSidebar: React.FC = () => {


  return (
    <div className="space-y-10">
      <CategoryDropdownSidebar/>
      <BestSellerSidebarProductFeed />
    </div>
  );
};
