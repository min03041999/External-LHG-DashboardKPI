import axiosClient from "../axiosClient";

const autoCuttingApi = {
  getAutoCutting: (type, params) => {
    const url = "material_wh/GetAutoCutting";
    return axiosClient.get(url);
  },
  getMaterialOnGoing: (type, params) => {
    const url = "material_wh/GetMaterialOnGoing";
    return axiosClient.get(url);
  },
  getMaterialDone: (type, params) => {
    const url = "material_wh/GetMaterialDone";
    return axiosClient.get(url);
  },
};

export { autoCuttingApi };
