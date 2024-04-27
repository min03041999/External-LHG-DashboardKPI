import axiosClient from "../axiosClient";

const factoryApi = {
  getFactoryApi: (type, params) => {
    const url = "factory/getDistinctFloor";
    return axiosClient.get(url);
  },
};

export { factoryApi };
