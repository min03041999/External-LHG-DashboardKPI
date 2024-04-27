import axiosClient from "../axiosClient";

const fgwhApi = {
  getTotalShipped: (type, params) => {
    const url = "finish_good/getTotalShipped";
    return axiosClient.get(url);
  },
  getTotalWaitingShipment: (type, params) => {
    const url = "finish_good/getTotalWaitingShipment";
    return axiosClient.get(url);
  },
  getTotalWaitingInspection: (type, params) => {
    const url = "finish_good/getTotalWaitingInspection";
    return axiosClient.get(url);
  },
  getTotalWaitingTesting: (type, params) => {
    const url = "finish_good/getTotalWaitingTesting";
    return axiosClient.get(url);
  },
  getTotalNotFullyImported: (type, params) => {
    const url = "finish_good/getTotalNotFullyImported";
    return axiosClient.get(url);
  },
  getMDP: (type, params) => {
    const url = "finish_good/getMDP";
    return axiosClient.get(url);
  },
  getShippings: (date) => {
    // console.log(date);
    const url = `finish_good/getShippings?date=${date}`;
    return axiosClient.get(url);
  },
  getRepackingReason: (type, params) => {
    const url = "finish_good/getRepackingReason";
    return axiosClient.get(url);
  },
};

export { fgwhApi };
