import Axios from "axios";

let axios = Axios.create({
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Expose-Headers": "Content-Range",
    Accept: "multipart/form-data, application/json",
  },
});

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint, method = "get", data = null) {
  try {
    const res = await axios({
      url: endpoint,
      method,
      data,
    });
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`,
    );
    console.dir(err);
    if (err.response && err.response.status === 401) {
      window.location.assign("/#/login");
    }
    throw err;
  }
}
