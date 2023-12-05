import ContentLoader from 'react-content-loader';

const CategoryListCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={255}
    height={88}
    viewBox="0 0 255 88"
    backgroundColor="#f9f9f9"
    foregroundColor="#ecebeb"
    className="rounded-md "
    {...props}
  >
    <circle cx="43" cy="45" r="30" />
    <rect x="88" y="40" rx="3" ry="3" width="96" height="8" />
  </ContentLoader>
);

export default CategoryListCardLoader;
