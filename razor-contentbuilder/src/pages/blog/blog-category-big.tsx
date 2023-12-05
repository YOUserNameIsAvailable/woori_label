import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { LIMITS } from '@framework/utils/limits';
import {fetchBlogs} from "@framework/blog/get-all-blogs";
import Breadcrumb from "@components/ui/breadcrumb";
import {BlogBig} from "@components/blog/blog-big";

export default function Blog() {
  return (
      <>
        <Seo
            title="Blog"
            description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
            path="blog"
        />
        <Divider />
        <Container>
          <Element name="grid" className="pt-7 lg:pt-11 pb-16 lg:pb-20 blog-category">
              <Breadcrumb />
              <div className="max-w-screen-lg m-auto">
                  <BlogBig key={"prouctGrid"} className={`pt-8 pb-8`}/>
              </div>
          </Element>
        </Container>

      </>
  );
}

Blog.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
      [API_ENDPOINTS.BLOGS, { limit: LIMITS.CATEGORIES_LIMITS }],
      fetchBlogs
  );


  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
