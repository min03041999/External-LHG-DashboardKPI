import axiosClient from "../axiosClient";

const tierMeetingApi = {
  getTierMeeting: (type, params) => {
    const url = "tier_metting/getTierMetting";
    return axiosClient.get(url);
  },
};

export { tierMeetingApi };
