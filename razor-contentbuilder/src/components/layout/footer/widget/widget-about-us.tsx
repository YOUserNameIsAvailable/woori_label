import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Logo from '@components/ui/logo';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  const { t } = useTranslation('footer');
  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div className={`${className}`}>
      <div className="text-sm max-w-[350px] mx-auto sm:ms-0 pb-2">
        <Logo href={ROUTES.HOME} className="mb-3 lg:mb-6 mx-auto sm:ms-0" />

        <div className={`bg-iconPhone bg-no-repeat  min-h-[60px] mb-5 ${dir === 'rtl' ? 'pr-16 xl:pr-20 bg-right': 'pl-16 xl:pl-20'}`}>
          <p className="text-white">{t('text-hotline')}</p>
          <a className="text-skin-primary text-lg duration-200 hover:text-white">
            {t('link-phone')}
          </a>
        </div>
        <div className="mb-3">{t('text-address')} {t('link-address')}</div>
        <div className="mb-3">{t('text-email')} {t('link-email')}</div>
      </div>

      {social && (
        <ul className="flex flex-wrap  space-s-4 md:space-s-5 mx-auto md:mx-0">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'} target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                  />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;
