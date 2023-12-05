import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';

// 231122 전역변수선언용
import { createContext, useReducer } from "react";

// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@styles/scrollbar.css';
import '@styles/swiper-carousel.css';
import '@styles/custom-plugins.css';
import '@styles/tailwind.css';
import '@styles/themes.scss';
import { getDirection } from '@utils/get-direction';


import { LabelContextProvider } from '@utils/contexts/LabelContext';

// 231122 전역변수선언용
const replacedLabel = {
  "menu-demos" : "데모(대체합니다)",
  "menu-home1" : "개인",
  "menu-home2" : "조회",
  "menu-home3" : "이체",
  "menu-home4" : "오픈뱅킹",
  "menu-home5" : "공과금",
  "menu-home6" : "예금/신탁",
  "menu-home7" : "펀드",
  "menu-home8" : "퇴직연금",
  "menu-home9" : "보험",
  "menu-home10" : "대출",
  "menu-home11" : "외환/골드",
  "menu-home12" : "뱅킹관리",
  "myHomeMsg1" : "내 집 마련의 시작",
  "myHomeMsg2" : "주택청약종합저축 만들어 보세요!"
}

// @ts-ignore
const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = (Component as any).Layout || Noop;

  return (
 
      <LabelContextProvider initialLabelMap={replacedLabel}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            {// @ts-ignore
              <ManagedUIContext>
                <>
                  <DefaultSeo/>
                  <Layout pageProps={pageProps}>
                    <Component {...pageProps} key={router.route}/>
                  </Layout>
                  <ToastContainer/>
                  <ManagedModal/>
                  <ManagedDrawer/>
                </>
              </ManagedUIContext>}
          </Hydrate>
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </LabelContextProvider>
  );
};

export default appWithTranslation(CustomApp);
