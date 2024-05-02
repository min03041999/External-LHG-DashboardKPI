import axiosClient from "../axiosClient";

const productionApi = {
  getProductionFactoryApi: ({ date, factory }) => {
    const url = `factory/getFloorDataS?date=${date}&factory=${factory}`;
    return axiosClient.get(url);
  },
  getFloorAndLineDataApi: ({ date, floor }) => {
    const url = `factory/getFloorData?date=${date}&floor=${floor}`;
    return axiosClient.get(url);
  },
  getStopLineTop3: ({ date, line }) => {
    const url = `factory/getStopLineTop3?date=${date}&line=${line}`;
    return axiosClient.get(url);
  },
};

export { productionApi };
