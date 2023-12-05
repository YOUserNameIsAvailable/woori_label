import BannerCard from '@components/cards/banner-card';
import useWindowSize from '@utils/use-window-size';


interface BannerProps {
  data: any;
  grid?: number;
  className?: string;
  girdClassName?: string;
}

const breakpoints = {
  '560': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const BannerGrid: React.FC<BannerProps> = ({
  data,
  grid = 3,
  className = 'mb-3 xl:mb-6',
  girdClassName
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <div
          className={`grid gap-4  grid-cols-1 sm:grid-cols-${grid} ${girdClassName ? girdClassName: '2xl:gap-5 '}`}
      >
        {data?.map((banner: any) => (
          // @ts-ignore
            <BannerCard key={`banner--key${banner.id}`} banner={banner} effectActive={true}
            />
        ))}
      </div>
    </div>
  );
};

export default BannerGrid;
