import Widgets from '@components/layout/footer/widget/widget-footer4';
import Copyright from '@components/layout/footer/copyright4';
import { footer } from './data';
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="footer-four border-t border-black/18 pt-10 md:pt-16">
    <Widgets widgets={widgets} />
    <Copyright payment={payment} className={"bg-skin-six"} />
  </footer>
);

export default Footer;
