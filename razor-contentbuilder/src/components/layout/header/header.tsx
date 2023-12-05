import {useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import {useTranslation} from 'next-i18next';
import cn from 'classnames';
import {ROUTES} from '@utils/routes';
import {useUI} from '@contexts/ui.context';
import {siteSettings} from '@settings/site-settings';
import {AddActiveScroll} from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import HeaderMenu from '@components/layout/header/header-menu';
import HeaderMenutop from '@components/layout/header/header-menutop';
import Search from '@components/common/search';
import LanguageSwitcher from '@components/ui/language-switcher';
import UserIcon from '@components/icons/user-icon';
import SearchIcon from '@components/icons/search-icon';
import {useModalAction} from '@components/common/modal/modal.context';
import useOnClickOutside from '@utils/use-click-outside';
import {FiMenu} from 'react-icons/fi';
import Delivery from '@components/layout/header/delivery';
import CategoryDropdownMenu from '@components/category/category-dropdown-menu';
import {Drawer} from "@components/common/drawer/drawer";
import { getDirection } from '@utils/get-direction';
import {useRouter} from "next/router";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import MobileAllCategories from "@components/layout/header/mobile-all-categories";
const AuthMenu = dynamic(() => import('./auth-menu'), {ssr: false});
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
    ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const {site_header} = siteSettings;

const Header: React.FC = () => {
    const {t} = useTranslation('common');
    const {
        openSidebar,
        displaySearch,
        displayMobileSearch,
        openMobileAllCategories,
        closeMobileAllCategories,
        displayMobileAllCategories,
        displaySidebar,
        closeSidebar,
        openSearch,
        closeSearch,
        isAuthorized,
    } = useUI();
    const {openModal} = useModalAction();
    const siteHeaderRef = useRef() as DivElementRef;
    const siteSearchRef = useRef() as DivElementRef;
    const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
    const { locale } = useRouter();
    const dir = getDirection(locale);
    const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
    AddActiveScroll(siteHeaderRef, 130);
    useOnClickOutside(siteSearchRef, () => closeSearch());

    function handleLogin() {
        openModal('LOGIN_VIEW');
    }

    function handleCategoryMenu() {
        setCategoryMenu(!categoryMenu);
    }
    function handleMobileAllCategories() {
        return openMobileAllCategories();
    }

    return (
        <>
            <header
                id="siteHeader"
                ref={siteHeaderRef}
                className={cn(
                    'header-five sticky-header sticky top-0 z-50 lg:relative w-full',
                    displayMobileSearch && 'active-mobile-search'
                )}
            >
                <div
                    className="bg-skin-footer  innerSticky w-screen lg:w-full transition-all duration-200 ease-in-out body-font bg-skin-fill z-50">
                    <Search
                        searchId="mobile-search"
                        className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
                    />
                    {/* End of Mobile search */}

                    <div className="top-bar  text-13px text-gray-300 border-b border-white/5">
                        <Container>
                            <div className="h-12 flex justify-between items-center py-2 gap-5">
                                <text className={`hidden md:block truncate`}>
                                    {t('text-free-shipping')}
                                </text>
                                <div className="flex flex-shrink-0 smx-auto max-w-[1920px]pace-s-5">
                                    <HeaderMenutop
                                        data={site_header.topmenu}
                                        className="flex transition-all duration-200 ease-in-out"
                                    />
                                    <LanguageSwitcher/>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="border-b border-white/5">
                        <Container >
                            <div className="flex items-center justify-between  py-2 md:py-4">


                            <div className="relative flex-shrink-0 lg:hidden">
                                <button
                                    className="border border-skin-base/40 rounded-md focus:outline-none flex-shrink-0 text-sm  text-skin-inverted px-2.5 md:px-3 lg:px-[18px] py-2 md:py-2.5 lg:py-3 flex items-center transition-all hover:border-skin-four"
                                    onClick={handleMobileAllCategories}
                                >
                                    <FiMenu className="text-xl lg:text-2xl"/>
                                </button>

                                <Drawer
                                    placement={dir === 'rtl' ? 'right' : 'left'}
                                    open={displayMobileAllCategories}
                                    onClose={closeMobileAllCategories}
                                    handler={false}
                                    showMask={true}
                                    level={null}
                                    contentWrapperStyle={contentWrapperCSS}
                                >
                                    <MobileAllCategories/>
                                </Drawer>
                            </div>
                            {/* End of Category */}

                            <Logo className="logo ps-3 md:ps-0 lg:mx-0"/>
                            {/* End of logo */}

                            <Search
                                searchId="top-bar-search"
                                className="hidden lg:flex lg:max-w-[450px] xl:max-w-[650px] 2xl:max-w-[900px] lg:mx-10"
                                variant="fill"
                            />
                            {/* End of search */}

                            <div className="flex space-s-5 xl:space-s-10 lg:max-w-[33%]">
                                <div className="hidden lg:flex items-center flex-shrink-0 ">
                                    <div className="cart-button">
                                        <UserIcon className="text-skin-primary"/>
                                    </div>

                                    {// @ts-ignore
                                        <AuthMenu
                                          isAuthorized={isAuthorized}
                                          href={ROUTES.ACCOUNT}
                                          btnProps={{
                                              children: t('text-sign-in'),
                                              onClick: handleLogin,
                                          }}
                                        >
                                            {t('text-account')}
                                        </AuthMenu>}
                                </div>
                                <CartButton className="hidden lg:flex"/>

                            </div>
                            {/* End of auth & lang */}
                            </div>
                        </Container>
                    </div>
                    {/* End of top part */}

                    <div className="navbar hidden lg:block bg-skin-footer">
                        <Container>
                            <div  className="flex justify-between items-center">
                            <Logo className="navbar-logo w-0 opacity-0 transition-all duration-200 ease-in-out"/>
                            {/* End of logo */}
                            <div className="categories-header-button relative me-8 flex-shrink-0 w-72">
                                <button
                                    className="bg-skin-primary rounded-t min-h-[60px] focus:outline-none w-full font-medium text-white px-[18px] uppercase py-4 flex items-center transition-all hover:border-skin-four"
                                    onClick={handleCategoryMenu}
                                >
                                    <FiMenu className="text-2xl me-3"/>
                                    {t('text-all-categories')}
                                </button>
                                {categoryMenu && (
                                    <CategoryDropdownMenu className=""/>
                                )}

                            </div>

                            <HeaderMenu
                                data={site_header.menu}
                                className="flex transition-all duration-200 ease-in-out"
                            />
                            {/* End of main menu */}

                            {displaySearch && (
                                <div
                                    className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                                    <Search
                                        ref={siteSearchRef}
                                        className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                                    />
                                </div>
                            )}
                            {/* End of conditional search  */}
                            <div className="ms-auto flex items-center flex-shrink-0">

                                <div
                                    className="navbar-right flex items-center overflow-hidden w-0 opacity-0 transition-all duration-200 ease-in-out">
                                    <button
                                        type="button"
                                        aria-label="Search Toggle"
                                        onClick={() => openSearch()}
                                        title="Search toggle"
                                        className="outline-none me-6 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                                    >
                                        <SearchIcon className="w-[22px] h-[22px] text-white "/>
                                    </button>
                                    {/* End of search handler btn */}

                                    <div className="flex-shrink-0 flex items-center">
                                        <div className={"cart-button"}>
                                            <UserIcon className="text-skin-primary"/>
                                        </div>

                                        {// @ts-ignore
                                            <AuthMenu
                                              isAuthorized={isAuthorized}
                                              href={ROUTES.ACCOUNT}
                                              btnProps={{
                                                  children: t('text-sign-in'),
                                                  onClick: handleLogin,
                                              }}
                                            >
                                                {t('text-account')}
                                            </AuthMenu>}
                                    </div>
                                    {/* End of auth */}

                                    <CartButton className="ms-8 "/>
                                    {/* End of cart btn */}


                                </div>
                            </div>
                            </div>
                        </Container>
                    </div>
                    {/* End of menu part */}
                </div>
            </header>
            {categoryMenu && (
                <div className="shadow_bkg_show fixed w-full h-full inset-0 bg-black/60 z-40" onClick={handleCategoryMenu}></div>
            )}
        </>
    );
};

export default Header;
