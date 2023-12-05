import {ROUTES} from '@utils/routes';
import {LIMITS} from "@framework/utils/limits";
import ProductsCarousel from '@components/product/products-carousel-v2';


interface Props {
    data: any;
    isLoading: any;
    error?: any;
    rowCarousel: number;
    showBanner: boolean;
}
const SupperCategoryContainer: React.FC<Props> = ({data, isLoading, error,rowCarousel=1, showBanner}) => {
    let breakpoints:object = {};
    if(showBanner){
         breakpoints = {
            '1536': {
                slidesPerView: 4,
            },
            '1280': {
                slidesPerView: 3,
            },
            '1024': {
                slidesPerView: 4,
            },
            '640': {
                slidesPerView: 3,
            },
            '360': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }else{
         breakpoints = {
            '1536': {
                slidesPerView: 5,
            },
            '1280': {
                slidesPerView: 4,
            },
            '1024': {
                slidesPerView: 4,
            },
            '640': {
                slidesPerView: 3,
            },
            '360': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        };
    }


    return (
        <ProductsCarousel
            sectionHeading=""
            categorySlug={ROUTES.PRODUCTS}
            products={data}
            loading={isLoading}
            error={error?.message}
            limit={LIMITS.FASHION_PRODUCTS_LIMITS}
            uniqueKey="fresh-vegetable"
            carouselBreakpoint={breakpoints}
            rowCarousel= {rowCarousel}
        />
    );
};
export default SupperCategoryContainer;
