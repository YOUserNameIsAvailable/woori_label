import { useTranslation } from 'next-i18next';
import useWindowSize from '@utils/use-window-size';
import Breadcrumb from '@components/ui/breadcrumb';
import cn from 'classnames';

interface HeaderProps {
  heroTitle?: string;
  variant?: 'default' | 'white';
}

const PageHeroSection: React.FC<HeaderProps> = ({
  heroTitle = 'text-page-title',
  variant = 'default',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <div
      className={cn(
        'flex justify-center md:min-h-[250px] lg:min-h-[288px] py-20 w-full  bg-slate-100 page-header-banner bg-skin',
        {
          'style-variant-white': variant === 'white',
        }
      )}

    >
      <div className="w-full flex flex-col items-center justify-center relative">
        <h2
          className={cn(
            'text-xl md:text-2xl lg:text-3xl 2xl:text-[32px] font-bold text-center',
            {
              'text-skin-base': variant === 'default',
              'text-skin-inverted': variant === 'white',
            }
          )}
        >
          <span className=" block font-bold mb-3 md:mb-4 lg:mb-5 2xl:mb-7 ">
            {t(heroTitle)}
          </span>
        </h2>
        <Breadcrumb />
      </div>
    </div>
  );
};

export default PageHeroSection;
