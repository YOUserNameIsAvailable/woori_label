import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";
import LogoBlack from "@components/ui/logo-black";
import LogoWhite from "@components/ui/logo";

interface AboutProps {
  className?: string;
  logoReverse?: boolean;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ social, className,logoReverse }) => {
  const { t } = useTranslation('footer');
  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div className={`${className}`}>
      <div className="text-sm sm:max-w-[350px] mx-auto sm:ms-0 pb-2">
        {logoReverse ? (
            <LogoWhite href={ROUTES.HOME} className="mb-3 lg:mb-6 mx-auto sm:ms-0" />
          ):(
            <LogoBlack href={ROUTES.HOME} className="mb-3 lg:mb-6 mx-auto sm:ms-0" />
        )}

        <div className="mb-3">{t('text-address')} {t('link-address')}</div>
        <div className="mb-3">{t('text-phone')} {t('link-phone')}</div>
        <div className="mb-3">{t('text-email')} {t('link-email')}</div>
      </div>

      {social && (
        <ul className="flex flex-wrap  space-s-4 md:space-s-5 mx-auto md:mx-0">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'}>
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
