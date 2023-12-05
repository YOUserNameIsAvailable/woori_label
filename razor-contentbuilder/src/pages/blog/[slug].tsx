import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { BlogPost } from '@components/blog/blog-post';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {GetServerSideProps, GetStaticProps} from 'next';
import { Element } from 'react-scroll';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import Breadcrumb from "@components/ui/breadcrumb";
import {BlogBig} from "@components/blog/blog-big";

export default function PostPage() {
  return (
      <>
        <Seo
            title="Blog"
            description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
            path="blog"
        />
        <Divider />
        <Container>
          <Element name="grid" className="pt-7 lg:pt-11 pb-10 blog-category">
              <Breadcrumb />
              <div className="max-w-screen-lg m-auto">
                  <BlogPost key={"blogPost"} className={`pt-8 pb-8`}/>
              </div>
          </Element>
        </Container>

      </>
  );
}

PostPage.Layout = Layout;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                'common',
                'forms',
                'menu',
                'footer',
            ])),
        },
    };
};
