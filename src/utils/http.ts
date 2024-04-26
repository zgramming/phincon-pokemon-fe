import axios from 'axios';
import { BASE_POKEMON_URL } from './constant';

// export const instance = axios.create({
//   baseURL: BASE_POKEMON_URL,
// });

const customAxios = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  return instance;
};

export default customAxios;

// export const http = {
//   fetcher: async (url: string) => {
//     const uri = `${BASE_POKEMON_URL}${url}`;
//     const resp = await instance.get(uri);

//     return resp.data;
//   },
//   get: async (url: string, opts = {}) => {
//     const resp = await instance.get(BASE_POKEMON_URL + url, opts);

//     return resp.data;
//   },
//   post: async (url: string, data: any, opts: any) => {
//     const resp = await instance.post(BASE_POKEMON_URL + url, data, opts);

//     return resp.data;
//   },
//   put: async (url: string, data: any, opts: any) => {
//     const resp = await instance.put(BASE_POKEMON_URL + url, data, opts);

//     return resp.data;
//   },
//   patch: async (url: string, data: any, opts: any) => {
//     const resp = await instance.patch(BASE_POKEMON_URL + url, data, opts);

//     return resp.data;
//   },
//   del: async (url: string, opts: any) => {
//     const resp = await instance.delete(BASE_POKEMON_URL + url, opts);

//     return resp.data;
//   },
// };
