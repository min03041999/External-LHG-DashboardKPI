import axiosClient from "../axiosClient";

const materialApi = {
  getTop3Supplier: (type, params) => {
    const url = "material_wh/top3_n762";
    return axiosClient.get(url);
  },
  getTop3Subcon: (type, params) => {
    const url = "material_wh/top3_n761";
    return axiosClient.get(url);
  },
  getMatCheckChart: (type, params) => {
    const url = "material_wh/MatCheckChart";
    return axiosClient.get(url);
  },
  getLeatherChart: (type, params) => {
    const url = "material_wh/LeatherChart";
    return axiosClient.get(url);
  },
  getWhEscalation: (type, params) => {
    const url = "material_wh/getWhEscalation";
    return axiosClient.get(url);
  },
  getDailyLeather: (type, params) => {
    const url = "material_wh/LeatherSumary";
    return axiosClient.get(url);
  },
  getDailyMatQCCheck: (type, params) => {
    const url = "material_wh/MatQCCheck";
    return axiosClient.get(url);
  },
  getDailyRequestKanBan: (type, params) => {
    const url = "material_wh/DailyRequestKanBan";
    return axiosClient.get(url);
  },
  getDailyDoneKanBan: (type, params) => {
    const url = "material_wh/DailyDoneKanBan";
    return axiosClient.get(url);
  },
  getDailyIngrogressKanBan: (type, params) => {
    const url = "material_wh/DailyInProgressKanBan";
    return axiosClient.get(url);
  },
};

export { materialApi };
