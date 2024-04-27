import axiosClient from "../axiosClient";

const stockFittingApi = {
  getOutputByLine: (type, params) => {
    const url = "stockfitting/getOutputByLine";
    return axiosClient.get(url);
  },
  getRftByLine: (type, params) => {
    const url = "stockfitting/getRftByLine";
    return axiosClient.get(url);
  },
  getHourlyOutputByLine: (type, params) => {
    const url = "stockfitting/getHourlyOutputByLine";
    return axiosClient.get(url);
  },
  getTotalOutputByRy: (type, params) => {
    const url = "stockfitting/getOutputByRy";
    return axiosClient.get(url);
  },
  getStopLineTop3: (date, line) => {
    const url = `stockfitting/getStopLineTop3?date=${date}&line=${line}`;
    return axiosClient.get(url);
  },
};

export { stockFittingApi };
