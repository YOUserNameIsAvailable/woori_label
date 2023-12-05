import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import Text from '@components/ui/text';
import { useUI } from '@contexts/ui.context';
import FilterSidebar from '@components/search/filter-sidebar';
import ListBox from '@components/ui/filter-list-box';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getDirection } from '@utils/get-direction';
import { IoArrowRedoOutline } from 'react-icons/io5';
import {useState} from "react";

interface Props {
    onNavClick: any;
    viewAs: boolean;
}

const SearchTopBar : React.FC<Props> = ({onNavClick, viewAs}) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start mb-6 filters-panel">
      <button
        className="inline-block lg:hidden text-skin-base text-sm px-4 py-2 font-semibold border border-skin-base rounded flex items-center mb-5"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ps-2.5">{t('text-filters')}</span>
      </button>
      <div className="flex w-full items-center lg:justify-between">
      <div className="list-view">
          <div className="btn btn-gridview text-skin-base text-opacity-70">View as:</div>
          <button type="button" id="grid-5" className={`btn btn-view grid ${viewAs && 'active'|| ''}`} onClick={() => onNavClick(!viewAs)}>
              <div>
                  <div className="icon-bar"></div>
                  <div className="icon-bar"></div>
                  <div className="icon-bar"></div>
              </div>
          </button>
          <button type="button" id="list-view" className={`btn btn-view list ${!viewAs && 'active'|| ''}`}  onClick={() => onNavClick(!viewAs)}>
              <div>
                  <div className="icon-bar"></div>
                  <div className="icon-bar"></div>
                  <div className="icon-bar"></div>
              </div>
          </button>
      </div>

        <ListBox
          options={[
            { name: 'text-lowest-price', value: 'lowest' },
            { name: 'text-highest-price', value: 'highest' },
            { name: 'text-new-arrival', value: 'new-arrival' },
            { name: 'text-most-order', value: 'most-order' },
          ]}
        />
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayFilter}
        onClose={closeFilter}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
};

export default SearchTopBar;
