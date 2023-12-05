import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import LocationIcon from '@components/icons/contact/location-icon';
import PhoneIcon from '@components/icons/contact/phone-icon';
import MailIcon from '@components/icons/contact/mail-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';

const data = [
  {
    id: 1,
    slug: '/',
    icon: (
      <LocationIcon  />
    ),
    name: 'text-office-location',
    description: 'text-office-location-details',
  },
  {
    id: 2,
    slug: '/',
    icon: (
      <PhoneIcon  />
    ),
    name: 'text-phone',
    description: 'text-phone-details',
  },
  {
    id: 3,
    slug: '/',
    icon: (
      <MailIcon  />
    ),
    name: 'text-email',
    description: 'text-email-details',
  },
];
const ContactInformation: FC = () => {
  const { t } = useTranslation('common');
  return (
    <>
      {data.length > 0 && (
        <div className="mx-auto space-y-4 mb-6">
          {data?.map((item: any) => (
            <div
              key={`contact--key${item.id}`}
              className="flex flex-col lg:flex-row max-w-xs lg:max-w-sm xl:pe-7"
            >
              <div className="flex-shrink-0 w-14  h-14 border-2 p-3 rounded-md">{item.icon}</div>
              <div className="lg:ps-3 2xl:ps-4 mt-4 lg:mt-0">
                <Heading variant="base" className="">
                  {t(item.name)}
                </Heading>
                <Text>{t(item.description)}</Text>
              </div>

            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ContactInformation;
