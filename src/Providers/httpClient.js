import { fetchUtils } from "react-admin";

const httpClient = (url, options = {}) => {
  options.headers = new Headers({ Accept: "application/json" });
  options.headers.set("Accept", "application/json,image/*,bin/*");
  options.headers.set("Access-Control-Allow-Origin", "*");
  options.headers.set(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  );
  options.headers.set("Access-Control-Expose-Headers", "Content-Range");

  // const token = localStorage.getItem('token')
  const res = fetchUtils.fetchJson(url, options);

  return Promise.resolve(res);
};

export default httpClient;
