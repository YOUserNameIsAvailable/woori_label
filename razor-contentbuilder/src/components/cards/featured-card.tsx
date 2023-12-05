import Heading from '@components/ui/heading';
import Link from "next/link";
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import Text from "@components/ui/text";
import {useRouter} from "next/router";
import {getDirection} from "@utils/get-direction";
import Image from "next/image";

interface ItemProps {
  image?: {imageSrc?: string, imageAlt?: string};
  title?: string;
  btnUrl?: LinkProps['href'];
  description?: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}


const FeaturedCard: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation('common');
  const { btnUrl, title, image, description } = item;

  const {locale} = useRouter();
  const dir = getDirection(locale);
  const borderRTL = (dir=='rtl') ? 'border-l':'border-r';

  return (
    <Link href={btnUrl} className="w-full ">
      <div
        className={cn('group px-5 xl:px-5 2xl:px-8  flex items-center justify-center  border-black/10',borderRTL, className)}
      >
        <div className="flex flex-shrink-0 items-center justify-center">
          <Image src={image?.imageSrc} width={50} height={50} alt={image?.imageAlt}/>
        </div>

        <div className="ps-4">
          <Heading variant="base" className="hover:text-skin-primary">
            {t(title)}
          </Heading>
          <Text>{t(description)}</Text>
        </div>

      </div>
    </Link>
  );
};

export default FeaturedCard;
