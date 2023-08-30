import * as reactAdmin from "react-admin";
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import { url } from "../config/connection";

export const apiUrl = url;
export const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params?.pagination;
    const { field, order } = params?.sort;
    const flatFilter = reactAdmin.fetchUtils.flattenObject(params.filter);
    const query = {
      sort: field,
      order,
      page: page - 1,
      perPage,
      ...flatFilter,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url)
      .then((reps) => {
        const { json } = reps
        if (!json) {
          return {
            count: 0,
            data: [],
            page: 1,
            pageCount: 1,
            total: 0,
          };
        }
        return {
          count: 10,
          data: json,
          page: 1,
          pageCount: 10,
          total: 10,
        };
      })
      .catch((e) => {
        console.log(e);
      });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => {
      return { data: json }
    });
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: field,
      order,
      page: page - 1,
      perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json?.content || [],
      total: json?.totalElements,
    }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ status, json }) => {
      return { data: json?.data || [] };
    }),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json?.message || [] }));
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json?.message })),

  deleteMany: (resource, params) => {
    const query = {
      // filter: JSON.stringify ({id: params.ids})
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json?.message }));
  },
};
