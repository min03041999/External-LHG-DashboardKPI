import axiosClient from "../axiosClient";

const downTimeApi = {
  getBreakdownTimes: (data) => {
    const url = "downtime/BreakdownTimes";
    return axiosClient.post(url, data);
  },
  getBreakdownMinutes: (data) => {
    const url = "downtime/BreakdownMinutes";
    return axiosClient.post(url, data);
  },
  getRepairingStatus: (data) => {
    const url = "downtime/RepairingStatus";
    return axiosClient.post(url, data);
  },
  getDowntimeReason: (data) => {
    const url = "downtime/DowntimeReason";
    return axiosClient.post(url, data);
  },
  getMechanicRepairTime: (data) => {
    const url = "downtime/MechanicRepairTime";
    return axiosClient.post(url, data);
  },
  getListMechanic: (data) => {
    const url = "downtime/ListMechanic";
    return axiosClient.post(url, data);
  },
};

export { downTimeApi };
