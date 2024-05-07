import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productionApi } from "../../api/Production/productionApi";
import {
  handleFakeEffFloor,
  handleFakeEff,
  handleFakeRftLine,
  handleFakeHourlyOutPutByFloor,
  handleFakeTargetHourlyOutPutByLines,
  handleFakeModel,
  handleFakeRft,
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
      action.payload.data?.floorData?.map((lineData, index) => {
        const {
          lineAlias,
          totalTarget,
          worker,
          shoesData,
          actualAssembly,
          actualStitching,
          actualWorkingHoursNew,
          quality,
        } = lineData;

        const totalActualAssembly = actualAssembly
          ? Object.values(actualAssembly).reduce((sum, value) => sum + value, 0)
          : 0;

        const totalLC =
          shoesData && shoesData.length > 0
            ? shoesData[0].stitchingLc + shoesData[0].assemblyLc
            : 0;
        const totalWorker = worker.stitching + worker.assembly;
        const idealTime = (totalActualAssembly * totalLC) / 233;

        const productionTime =
          actualWorkingHoursNew && actualWorkingHoursNew > 0
            ? totalWorker * actualWorkingHoursNew
            : 1; // Vi du dang lam duoc 2 tieng;

        const efficiency =
          productionTime !== 0
            ? Math.round((idealTime / productionTime) * 100)
            : 0;
        // const efficiency = Math.round(Math.random() * 10 + 65);

        action.payload.data.floorData[index] = {
          ...lineData,
          efficiency: handleFakeEffFloor(lineAlias, efficiency),
          quality: handleFakeRft(quality),
        };

        for (let time in actualAssembly) {
          actualAssembly[time] = handleFakeHourlyOutPutByFloor(
            lineAlias,
            totalTarget
          );
        }
      });
      action.payload.data?.stopLineData?.map((stopLineData) => {
        stopLineData.SL_NgungChuyen = Math.round(
          stopLineData.SL_NgungChuyen / 4
        );
      });
      // console.log(action.payload.data);
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
          actualWorkingHoursNew,
          assemblyRFT,
          stitchingRFT,
          quality, //RFT
        } = lineData;
        //EFF BY FLOOR
        const totalActualAssembly = actualAssembly
          ? Object.values(actualAssembly).reduce((sum, value) => sum + value, 0)
          : 0;
        const totalLC =
          shoesData && shoesData.length > 0
            ? shoesData[0].stitchingLc + shoesData[0].assemblyLc
            : 0;
        const totalWorker = worker.stitching + worker.assembly;
        const idealTime = (totalActualAssembly * totalLC) / 233;
        const productionTime =
          actualWorkingHoursNew && actualWorkingHoursNew > 0
            ? totalWorker * actualWorkingHoursNew
            : 1; // Vi du dang lam duoc 2 tieng;

        const efficiency =
          productionTime !== 0
            ? Math.round((idealTime / productionTime) * 100)
            : 0;
        // const efficiency = Math.round(Math.random() * 10 + 65);
        //EFF BY FLOOR

        //RFT BY FlOOR

        //RFT BY FlOOR

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

        const totalLine = eff_assembly_line.reduce(
          (total, item) => total + item.actual,
          0
        );
        const nonZeroActual = eff_assembly_line.filter(
          (item) => item.actual !== 0
        );
        const avgLine = Math.round(totalLine / nonZeroActual.length);

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
          efficiency: handleFakeEff(lineAlias, efficiency),
          quality: handleFakeRft(quality),
          eff_assembly_line: eff_assembly_line ? eff_assembly_line : {},
          eff_stitching_line: eff_stitching_line ? eff_stitching_line : {},
        };

        // console.log(action.payload.data.floorData[index]);
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
        //Assembly
        for (let time in actualAssembly) {
          actualAssembly[time] = handleFakeTargetHourlyOutPutByLines(lineAlias);
        }

        for (let time in actualStitching) {
          actualStitching[time] =
            handleFakeTargetHourlyOutPutByLines(lineAlias);
        }
        //Stitching
        //handleFakeTargetHourlyOutPutByLines
      });

      // action.payload.data?.stopLineData?.reduce((total, current) => {
      //   // stopLineData.SL_NgungChuyen = Math.round(
      //   //   stopLineData.SL_NgungChuyen / 4
      //   // );
      // });

      let totalStopLineData = Math.round(
        action.payload.data?.stopLineData?.reduce(
          (total, current) => total + current.SL_NgungChuyen,
          0
        ) / 4
      );

      action.payload.data?.stopLineData?.map((stopLineData) => {
        stopLineData.SL_NgungChuyen = Math.round(
          stopLineData.SL_NgungChuyen / 4
        );
      });

      const fakeStopLineData = action.payload.data?.stopLineData
        ?.map((stopLineData) => {
          if (totalStopLineData !== 0) {
            totalStopLineData -= stopLineData.SL_NgungChuyen;
            return {
              line: stopLineData.line,
              SL_NgungChuyen: stopLineData.SL_NgungChuyen,
            };
          }
        })
        .filter((item) => item);

      // console.log(fakeStopLineData);

      state.production = {
        ...action.payload.data,
        stopLineData: fakeStopLineData,
      };
    });
    builder.addCase(getStopLineTop3.fulfilled, (state, action) => {
      state.stopLineTop3 = action.payload.data;
    });
  },
});

const { reducer } = productSlice;
export default reducer;
