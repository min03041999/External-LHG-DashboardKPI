import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productionApi } from "../../api/Production/productionApi";
import {
  handleFakeRftLine,
  handleFakeTargetHourlyOutPutByLines,
  handleFakeModel,
} from "../../utils/helper";

import { OBJECT_TIME_RANGE } from "../../utils/times";

export const getProductionFactoriesApi = createAsyncThunk(
  "factory/getFloorDataS",
  async ({ date, factory }) => {
    try {
      const data = await productionApi.getProductionFactoryApi({
        date,
        factory,
      });
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getProductionFloorAndLineApi = createAsyncThunk(
  "factory/getFloorData",
  async ({ date, floor }) => {
    try {
      const data = await productionApi.getFloorAndLineDataApi({
        date,
        floor,
      });
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getStopLineTop3 = createAsyncThunk(
  "factory/getStopLineTop3",
  async ({ date, line }) => {
    try {
      const data = await productionApi.getStopLineTop3({
        date,
        line,
      });
      return data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    production: [],
    stopLineTop3: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductionFactoriesApi.fulfilled, (state, action) => {
      state.production = action.payload.data;
    });
    builder.addCase(getProductionFloorAndLineApi.fulfilled, (state, action) => {
      action.payload.data?.floorData?.map((lineData, index) => {
        const {
          lineAlias,
          worker,
          shoesData,
          actualAssembly,
          actualStitching,
          assemblyRFT,
          stitchingRFT,
        } = lineData;
        //EFF BY THE HOUR LINE
        const myKeys = Object.keys(OBJECT_TIME_RANGE);
        //Assembly
        const eff_assembly_line = [];
        const worker_assembly = worker.assembly;
        const laborCount_assembly =
          shoesData && shoesData.length > 0 ? shoesData[0].assemblyLc : 0;

        if (worker_assembly && actualAssembly && laborCount_assembly) {
          const keys = new Set(Object.keys(actualAssembly).slice(0, 9));
          for (let key of myKeys) {
            // const idealTime = (actualAssembly[key] * laborCount_assembly) / 233;
            const productionTime = worker_assembly;

            // const effFake = parseFloat(
            //   ((idealTime / productionTime) * 100).toFixed(2)
            // );

            const { shoesName } = shoesData[0];

            eff_assembly_line.push({
              time: key,
              actual:
                keys.has(key) && productionTime !== 0
                  ? handleFakeModel(shoesName)
                  : 0,
            });
          }
        }

        //Stitching
        const eff_stitching_line = [];
        const worker_stitching = worker.stitching;
        const laborCount_stitching =
          shoesData && shoesData.length > 0 ? shoesData[0].stitchingLc : 0;
        if (worker_stitching && actualStitching && laborCount_stitching) {
          const keys = new Set(Object.keys(actualStitching).slice(0, 9));
          for (let key of myKeys) {
            // const idealTime = (actualStitching[key] * laborCount_assembly) / 233;
            const productionTime = worker_stitching;

            // const effFake = parseFloat(
            //   ((idealTime / productionTime) * 100).toFixed(2)
            // );

            const { shoesName } = shoesData[0];

            eff_stitching_line.push({
              time: key,
              actual:
                keys.has(key) && productionTime !== 0
                  ? handleFakeModel(shoesName)
                  : 0,
            });
          }
        }

        action.payload.data.floorData[index] = {
          ...lineData,
          eff_assembly_line: eff_assembly_line ? eff_assembly_line : {},
          eff_stitching_line: eff_stitching_line ? eff_stitching_line : {},
        };
        //EFF BY THE HOUR LINE

        //RFT BY THE HOUR LINE
        for (let time in assemblyRFT) {
          assemblyRFT[time] = handleFakeRftLine(assemblyRFT[time]);
        }

        for (let time in stitchingRFT) {
          stitchingRFT[time] = handleFakeRftLine(stitchingRFT[time]);
        }
        //RFT BY THE HOUR LINE

        //handleFakeTargetHourlyOutPutByLines
        for (let time in actualAssembly) {
          actualAssembly[time] = handleFakeTargetHourlyOutPutByLines(lineAlias);
        }
      });
      // console.log(action.payload.data);
      state.production = action.payload.data;
    });
    builder.addCase(getStopLineTop3.fulfilled, (state, action) => {
      state.stopLineTop3 = action.payload.data;
    });
  },
});

const { reducer } = productSlice;
export default reducer;
