import SupperCategoryList from "@components/suppercategory/suppercategory-list";
import SupperCategoryContainer from "@components/suppercategory/suppercategory-container";
import useSWR from "swr";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {fetcher} from "../../../services/helpers";
import {IsEditable, onlyForBuilder} from "@components/config";

const SupperCategoryClothFeed = ({limit = 7}) => {

  console.log('SupperCategoryClothFeed ', limit)

  const {data: category, isLoading: isLoadingCategory} = useSWR(
    `/api${API_ENDPOINTS.CLOTH_CATEGORY}?limit=${limit}`, fetcher
  )
  const {data: products, isLoading: isLoadingProducts, error: errorProducts} = useSWR(
    `/api${API_ENDPOINTS.FASHION_PRODUCTS}?limit=${limit}`, fetcher
  )


  if (onlyForBuilder()) {
    return (
      <div data-component="SupperCategoryClothFeed">
        <div style={{pointerEvents: "none"}}>limit: </div>
        <p {...IsEditable({limit: "textContent"})}>10</p>
      </div>
    )
  }


  return (
      <div data-component="SupperCategoryClothFeed" className="mb-8 lg:mb-12">
        <div className="xl:flex border border-black/10" >
          <div className={`xl:w-[420px] p-7 bg-no-repeat bg-left`}
               style={{backgroundImage: `url(/assets/images/collection/cate_2.jpg)`}}
          >
            <SupperCategoryList className={`supper-category--list`} data={category}/>
          </div>
          <div className="trendy-main-content w-full p-2.5">
            <SupperCategoryContainer data = {products} isLoading={isLoadingProducts} error={errorProducts} limit={limit}/>
          </div>
        </div>
      </div>
  );
}

export default SupperCategoryClothFeed
