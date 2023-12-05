import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

interface Props {
  className?: string;
  shareUrl?: string;
}
interface NewsLetterFormValues {
  shareLink: string;
}
const defaultValues = {
  shareLink: '',
};

const SocialShareThis: React.FC<Props> = ({ className = '', shareUrl = '' }) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
        '',
        className
      )}
    >
      <Heading className="text-gray-500 pe-3 sm:text-sm font-normal">{t('text-share-this')}</Heading>
      <div className="flex items-center flex-wrap space-s-2 ">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} separator=":: ">
          <WhatsappIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </LinkedinShareButton>
      </div>

    </div>
  );
};

export default SocialShareThis;
