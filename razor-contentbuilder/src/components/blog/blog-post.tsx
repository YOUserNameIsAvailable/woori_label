import type {FC} from 'react';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import {useBlogPostQuery} from '@framework/blog/get-blog-post';
import BlogPostCard from "@components/blog/blog-post-card";

interface blogGridProps {
    className?: string;
}

export const BlogPost: FC<blogGridProps> = ({className = ''}) => {
    const {data: dataPost, isLoading, error} = useBlogPostQuery({});


  // @ts-ignore
    return (
        <>
            <div
                className={cn(
                    'blog-post w-full ',
                    className
                )}
            >
                {error ? (
                    <div className="col-span-full ">
                        <Alert message={error?.message}/>
                    </div>
                ) : (
                   <BlogPostCard key={`blog--post`} blog={dataPost}/>
                )}
            </div>

        </>
    );
};
