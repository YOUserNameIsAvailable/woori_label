import Header from '@components/layout/header/header-four';
import Footer from '@components/layout/footer/footer4';
import { useTranslation } from 'next-i18next';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import BackToTopButton from "@components/ui/back-to-top";

// @ts-ignore
const Layout: React.FC = ({ children }) => {
  const { t } = useTranslation('common');

  return (
    <div className="page-type-home4 flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow bg-zinc-100"
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
