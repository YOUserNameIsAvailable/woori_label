import {QueryOptionsType, Blog} from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import {useInfiniteQuery, useQuery} from 'react-query';

const fetchBlogPost = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BLOGDETAILS);
  return data;

};

const useBlogPostQuery = (options: QueryOptionsType) => {
  return useQuery<Blog, Error>(
      [API_ENDPOINTS.BLOGDETAILS, options],
      fetchBlogPost
  );
};

export { useBlogPostQuery, fetchBlogPost };
