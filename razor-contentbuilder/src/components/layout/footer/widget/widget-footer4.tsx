import Container from '@components/ui/container';
import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us-footer4';
import WidgetSubscription from './widget-newsletter';
import { footer } from '../data';

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  const { social } = footer;
  return (
      <>
        <WidgetSubscription className="newsletterFooter  items-center" />
        <Container className={"sm:max-w-[1730px]"}>
          <div className="grid grid-cols-2 md:grid-cols-9 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px] pt-10 md:pt-16">
            <WidgetAbout
                social={social}
                className="col-span-full sm:col-span-1 md:col-span-3 "
            />
            {widgets?.map((widget) => (
                <WidgetLink
                    key={`footer-widget--key${widget.id}`}
                    data={widget}
                    className="pb-3.5 sm:pb-0 col-span-1 md:col-span-3 xl:col-span-2"
                />
            ))}

          </div>
        </Container>
      </>

  );
};

export default Widgets;
