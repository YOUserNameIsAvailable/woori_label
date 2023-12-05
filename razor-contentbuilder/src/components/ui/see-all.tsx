import ArrowIcon from '@components/icons/arrow-icon';
import Link from "next/link";
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";

interface Props {
  className?: string;
  href?: LinkProps['href'];
}

const SeeAll: React.FC<Props> = ({ className, href = '/' }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <Link
      href={href}
      className={`${className} p-4 flex items-center justify-center flex-col hover:opacity-80`}
    >
      <ArrowIcon color="#02B290" className={`w-10 ${dir === 'rtl' && 'rotate-180'}`} />
      <span className="font-semibold text-sm sm:text-base text-skin-primary block pt-1.5 sm:pt-3.5">
        {t('text-see-all')}
      </span>
    </Link>
  );
};

export default SeeAll;
