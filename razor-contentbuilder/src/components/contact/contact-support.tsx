import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import ContactInformation from '@components/contact/contact-information';


interface Props {
  image?: HTMLImageElement;
}

const ContactSupport: FC<Props> = () => {
  const { t } = useTranslation('common');
  return (
    <div className="mb-0 3xl:pe-5">
      <Heading variant="heading" className="mb-3 lg:mb-4 xl:mb-5">
        {t('contact-form-info-title')}
      </Heading>
      <ContactInformation/>
      <Text className="xl:leading-8">{t('contact-form-info-content')}</Text>

    </div>
  );
};

export default ContactSupport;
