import Header from '@components/layout/header/header-five';
import Footer from '@components/layout/footer/footer4';
import { useTranslation } from 'next-i18next';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import BackToTopButton from "@components/ui/back-to-top";

// @ts-ignore
const Layout: React.FC = ({ children }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow bg-[#f7f7f7]"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer />
      <BackToTopButton />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
