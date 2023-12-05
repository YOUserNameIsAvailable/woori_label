import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const ErrorInformation: React.FC = () => {
  const { t } = useTranslation('common')
  const backgroundThumbnail = '/assets/images/404-bg.png'
  const errorThumbnail = '/assets/images/404.png'
  return (
    <div className="py-20 mx-auto max-w-[1320px] px-4 md:px-6 lg:px-8 2xl:px-20">
      <div className="flex flex-col lg:flex-row w-full items-center">
        <div className="basis-full md:basis-1/2">
          <Image
            src={errorThumbnail}
            alt={t('error-heading')}
            width={479}
            height={251}
          />
        </div>
        <div className="basis-full md:basis-1/2">
          <h2 className="text-2xl md:text-3xl 2xl:text-3xl font-medium text-skin-base ">
            {t('error-heading')}
          </h2>
          <p className="text-14px md:text-base 2xl:text-[18px] leading-7 md:leading-8 pt-4 font-medium">
            {t('error-sub-heading')}
          </p>
        </div>
      </div>

    </div>
  );
};

export default ErrorInformation;
