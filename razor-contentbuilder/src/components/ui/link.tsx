import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// @ts-ignore
const Link: React.FC<NextLinkProps & { className?: string }> = ({href, children, ...props}) => {
  return (
    <NextLink href={href}{...props}>
      {children}
    </NextLink>
  );
};

export default Link;
