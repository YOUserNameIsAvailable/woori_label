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
import {BlogSidebar} from "@components/blog/blog-sidebar";
import SearchTopBar from "@components/blog/search-top-bar";

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
                <div className="pt-7 lg:pt-11 ">
                    <Breadcrumb/>
                </div>
                <Element name="grid" className="flex pt-5 lg:pt-8 pb-16 lg:pb-20 blog-category overflow-hidden">

                    <div className="w-full">
                        <BlogPost key={"blogPost"} className={`pb-8`}/>
                    </div>
                    <div className="flex-shrink-0 ps-8 xl:ps-12 hidden lg:block w-80 xl:w-90 sticky top-16 h-full">
                        <BlogSidebar/>
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
