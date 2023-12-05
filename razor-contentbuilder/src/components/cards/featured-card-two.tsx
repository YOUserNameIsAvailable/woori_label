import Heading from '@components/ui/heading';
import Link from "next/link";
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { IoCaretForward } from 'react-icons/io5';
import Text from '@components/ui/text';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}

const FeaturedCard: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation('common');
  const { icon, title, description } = item;
  return (
    <div
      className={cn(
        'group px-5 xl:px-5 2xl:px-8  flex items-center border-r border-black/10',
        className
      )}
    >
      <div className="flex flex-shrink-0 items-center justify-center">
        {icon}
      </div>
      <div className="ps-4">
        <Heading variant="base">
          {t(title)}
        </Heading>
        <Text>{t(description)}</Text>
      </div>
    </div>
  );
};

export default FeaturedCard;
