import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import Link from "next/link";
import { LinkProps } from 'next/link';
import Text from '@components/ui/text';
import { useTranslation } from 'next-i18next';
import { collectionPlaceholder } from '@assets/placeholders';
import QuoteIcon from "@components/icons/quote-alt-icon";

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  href: LinkProps['href'];
  collection: {
    image: string;
    author_name: string;
    author_position: string;
    description?: string;
  };
}

const TestimonialCard: React.FC<Props> = ({
  collection,
  imgWidth = 80,
  imgHeight = 80,
  href,
}) => {
  const { image, author_name, author_position, description } = collection;
  const { t } = useTranslation('common');
  return (
    <>
      <div className="testimonial-text px-4 pt-4  pb-14  bg-[#f2f6f8]">
        <QuoteIcon className="my-3 mb-2 w-full text-center"/>
        <Text variant="small" className="text-center">
          {t(`${description}`)}
        </Text>
      </div>
      <div className="testimonial-image m-auto w-[80px] relative -mt-10">
        <Image
            src={image ?? collectionPlaceholder}
            alt={t(author_name) || t('text-card-thumbnail')}
            width={+imgWidth}
            height={+imgHeight}
            className="bg-skin-thumbnail object-cover transform transition duration-300 ease-in-out rounded-full "
        />
      </div>

      <div className="pt-5 pb-12 text-center">
        <p className="mb-1 lg:mb-1.5 text-[12px] uppercase font-medium">
          {t(author_name)}
        </p>
        <p className=" text-[13px] ">
          {t(author_position)}
        </p>
      </div>
    </>
  );
};

export default TestimonialCard;
