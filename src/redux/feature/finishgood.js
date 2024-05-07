import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fgwhApi } from "../../api/FGWH/fgwhApi";

export const getTotalShipped = createAsyncThunk(
  "finish_good/getTotalShipped",
  async () => {
    try {
      const data = await fgwhApi.getTotalShipped();
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getTotalWaitingShipment = createAsyncThunk(
  "finish_good/getTotalWaitingShipment",
  async () => {
    try {
      const data = await fgwhApi.getTotalWaitingShipment();
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getTotalWaitingInspection = createAsyncThunk(
  "finish_good/getTotalWaitingInspection",
  async () => {
    try {
      const data = await fgwhApi.getTotalWaitingInspection();
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getTotalWaitingTesting = createAsyncThunk(
  "finish_good/getTotalWaitingTesting",
  async () => {
    try {
      const data = await fgwhApi.getTotalWaitingTesting();
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getTotalNotFullyImported = createAsyncThunk(
  "finish_good/getTotalNotFullyImported",
  async () => {
    try {
      const data = await fgwhApi.getTotalNotFullyImported();
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getMDP = createAsyncThunk("finish_good/getMDP", async () => {
  try {
    const data = await fgwhApi.getMDP();
    return data.data;
  } catch (error) {
    return error.message;
  }
});

export const getShippings = createAsyncThunk(
  "finish_good/getShippings",
  async (date) => {
    try {
      const data = await fgwhApi.getShippings(date);
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getRepackingReason = createAsyncThunk(
  "finish_good/getRepackingReason",
  async () => {
    try {
      const data = await fgwhApi.getRepackingReason();
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const finishGoodSlice = createSlice({
  name: "finishgood",
  initialState: {
    totalShipped: 0,
    waitingShipment: 0,
    waitingInspection: 0,
    waitingTesting: 0,
    notFullyImported: 0,
    MDP: [
      {
        MDPTarget: 0,
        MDPPercent: 0,
      },
    ],
    shippings: [],
    repackingReason: {
      po: {
        total: 0,
      },
      defects: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalShipped.fulfilled, (state, action) => {
        state.totalShipped = action.payload.data[0].totalShipped;
        // console.log(state, action);
      })
      .addCase(getTotalWaitingShipment.fulfilled, (state, action) => {
        state.waitingShipment = action.payload.data[0].waitingShipment;
        // console.log(state, action);
      })
      .addCase(getTotalWaitingInspection.fulfilled, (state, action) => {
        state.waitingInspection = action.payload.data[0].waitingInspection;
        // console.log(state, action);
      })
      .addCase(getTotalWaitingTesting.fulfilled, (state, action) => {
        state.waitingTesting = action.payload.data[0].waitingTesting;
      })
      .addCase(getTotalNotFullyImported.fulfilled, (state, action) => {
        state.notFullyImported = action.payload.data[0].notFullyImported;
        // console.log(state, action);
      })
      .addCase(getMDP.fulfilled, (state, action) => {
        state.MDP = [...action.payload.data];
        // console.log(state, action);
      })
      .addCase(getShippings.fulfilled, (state, action) => {
        state.shippings = [...action.payload.data];
      })
      .addCase(getRepackingReason.fulfilled, (state, action) => {
        state.repackingReason.po = { ...action.payload.data.po };
        state.repackingReason.defects = [...action.payload.data.defects];
        // console.log(state, action);
      });
  },
});

export default finishGoodSlice.reducer;
