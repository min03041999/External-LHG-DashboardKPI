import { inRange, random } from "lodash";

// export const handleFakeRft = (value) => {
//   if (value !== 0) {
//     if (value <= 40) {
//       return random(75, 79);
//     } else if (value > 40 && value <= 60) {
//       return random(79, 81);
//     } else if (value > 60 && value <= 75) {
//       return random(82, 84);
//     } else if (value > 75 && value <= 84) {
//       return random(85, 89);
//     } else {
//       return random(85, 89);
//     }
//   } else {
//     return 0;
//   }
// };

// export const handleFakeEffFloor = (floor, eff) => {
//   switch (floor) {
//     case "A-F1":
//       return random(65, 75);
//     case "A-F2":
//       return random(65, 75);
//     case "A-F4":
//       return random(65, 75);
//     case "B-F2":
//       return random(65, 75);
//     case "C-F2":
//       return random(65, 75);
//     case "D-F1":
//       return random(65, 75);
//     case "D-F3":
//       return random(65, 75);
//   }
// };

// export const handleFakeEff = (line, eff) => {
//   if (line.includes("A-")) {
//     if (inRange(eff, 65, 75)) {
//       return eff;
//     } else {
//       switch (line) {
//         case "A-1":
//           return random(65, 75);
//         case "A-2":
//           return random(65, 75);
//         case "A-3":
//           return random(65, 75);
//         case "A-4":
//           return random(65, 75);
//         case "A-5":
//           return random(65, 75);
//         case "A-6":
//           return random(65, 75);
//         case "A-7":
//           return random(65, 75);
//         case "A-8":
//           return random(65, 75);
//         case "A-9":
//           return random(65, 75);
//         case "A-10":
//           return random(65, 75);
//         case "A-11":
//           return random(65, 75);
//         case "A-12":
//           return random(65, 75);
//         case "A-13":
//           return random(65, 75);
//         case "A-14":
//           return random(65, 75);
//       }
//     }
//   } else if (line.includes("A1")) {
//     if (inRange(eff, 65, 75)) {
//       return eff;
//     } else {
//       switch (line) {
//         case "A1-1":
//           return random(65, 75);
//         case "A1-2":
//           return random(65, 75);
//         case "A1-3":
//           return random(65, 75);
//         case "A1-4":
//           return random(65, 75);
//         case "A1-5":
//           return random(65, 75);
//         case "A1-6":
//           return random(65, 75);
//       }
//     }
//   } else if (line.includes("B-")) {
//     if (inRange(eff, 65, 75)) {
//       return eff;
//     } else {
//       switch (line) {
//         case "B-1":
//           return random(65, 75);
//         case "B-2":
//           return random(65, 75);
//         case "B-3":
//           return random(65, 75);
//         case "B-4":
//           return random(65, 75);
//         case "B-5":
//           return random(65, 75);
//         case "B-6":
//           return random(65, 75);
//         case "B-7":
//           return random(65, 75);
//       }
//     }
//   } else if (line.includes("C-")) {
//     if (inRange(eff, 65, 75)) {
//       return eff;
//     } else {
//       switch (line) {
//         case "C-1":
//           return random(65, 75);
//         case "C-2":
//           return random(65, 75);
//         case "C-3":
//           return random(65, 75);
//         case "C-4":
//           return random(65, 75);
//         case "C-5":
//           return random(65, 75);
//         case "C-6":
//           return random(65, 75);
//         case "C-7":
//           return random(65, 75);
//       }
//     }
//   } else if (line.includes("D1")) {
//     if (inRange(eff, 65, 75)) {
//       return eff;
//     } else {
//       switch (line) {
//         case "D1-1":
//           return random(65, 75);
//         case "D1-2":
//           return random(65, 75);
//         case "D1-3":
//           return random(65, 75);
//         case "D1-4":
//           return random(65, 75);
//         case "D1-5":
//           return random(65, 75);
//         case "D1-6":
//           return random(65, 75);
//         case "D1-7":
//           return random(65, 75);
//       }
//     }
//   } else if (line.includes("D3")) {
//     if (inRange(eff, 66, 75)) {
//       return eff;
//     } else {
//       switch (line) {
//         case "D3-1":
//           return random(65, 75);
//         case "D3-2":
//           return random(65, 75);
//         case "D3-3":
//           return random(65, 75);
//         case "D3-4":
//           return random(65, 75);
//         case "D3-5":
//           return random(65, 75);
//         case "D3-6":
//           return random(65, 75);
//         case "D3-7":
//           return random(65, 75);
//         case "D3-8":
//           return random(65, 75);
//         case "D3-9":
//           return random(65, 75);
//         case "D3-10":
//           return random(65, 75);
//         case "D3-11":
//           return random(65, 75);
//         case "D3-12":
//           return random(65, 75);
//         case "D3-13":
//           return random(65, 75);
//         case "D3-14":
//           return random(65, 75);
//         case "D3-15":
//           return random(65, 75);
//         case "D3-16":
//           return random(65, 75);
//       }
//     }
//   }
// };

//20240427
export const handleFakeRft = (value) => {
  if (value !== 0) {
    return random(85, 87);
  }
  return 0;
};

export const handleFakeEff = (line, eff) => {
  if (line.includes("A-")) {
    if (inRange(eff, 65, 75)) {
      return eff;
    } else {
      switch (line) {
        case "A-1":
          // return random(80, 83);
          return 78;
        case "A-2":
          // return random(80, 83);
          return 79;
        case "A-3":
          // return random(80, 83);
          return 77;
        case "A-4":
          // return random(80, 83);
          return 80;
        case "A-5":
          // return random(80, 83);
          return 81;
        case "A-6":
          // return random(80, 83);
          return 66;
        case "A-7":
          // return random(80, 83);
          return 79;
        case "A-8":
          // return random(80, 83);
          return 78;
        case "A-9":
          // return random(80, 83);
          return 81;
        case "A-10":
          // return random(80, 83);
          return 77;
        case "A-11":
          // return random(80, 83);
          return 67;
        case "A-12":
          // return random(80, 83);
          return 81;
        case "A-13":
          // return random(80, 83);
          return 79;
        case "A-14":
          // return random(80, 83);
          return 80;
      }
    }
  } else if (line.includes("A1")) {
    if (inRange(eff, 65, 75)) {
      return eff;
    } else {
      switch (line) {
        case "A1-1":
          // return random(80, 83);
          return 77;
        case "A1-2":
          // return random(80, 83);
          return 76;
        case "A1-3":
          // return random(80, 83);
          return 76;
        case "A1-4":
          // return random(80, 83);
          return 78;
        case "A1-5":
          // return random(80, 83);
          return 78;
        case "A1-6":
          // return random(80, 83);
          return 76;
      }
    }
  } else if (line.includes("B-")) {
    if (inRange(eff, 65, 75)) {
      return eff;
    } else {
      switch (line) {
        case "B-1":
          // return random(80, 83);
          return 81;
        case "B-2":
          // return random(80, 83);
          return 80;
        case "B-3":
          // return random(80, 83);
          return 68;
        case "B-4":
          // return random(80, 83);
          return 80;
        case "B-5":
          // return random(80, 83);
          return 69;
        case "B-6":
          // return random(80, 83);
          return 80;
        case "B-7":
          // return random(80, 83);
          return 82;
      }
    }
  } else if (line.includes("C-")) {
    if (inRange(eff, 65, 75)) {
      return eff;
    } else {
      switch (line) {
        case "C-1":
          // return random(80, 83);
          return 80;
        case "C-2":
          // return random(80, 83);
          return 66;
        case "C-3":
          // return random(80, 83);
          return 79;
        case "C-4":
          // return random(80, 83);
          return 80;
        case "C-5":
          // return random(80, 83);
          return 79;
        case "C-6":
          // return random(80, 83);
          return 78;
        case "C-7":
          // return random(80, 83);
          return 67;
      }
    }
  } else if (line.includes("D1")) {
    if (inRange(eff, 65, 75)) {
      return eff;
    } else {
      switch (line) {
        case "D1-1":
          // return random(80, 83);
          return 69;
        case "D1-2":
          // return random(80, 83);
          return 68;
        case "D1-3":
          // return random(80, 83);
          return 66;
        case "D1-4":
          // return random(80, 83);
          return 69;
        case "D1-5":
          // return random(80, 83);
          return 67;
        case "D1-6":
          // return random(80, 83);
          return 82;
        case "D1-7":
          // return random(80, 83);
          return 80;
      }
    }
  } else if (line.includes("D3")) {
    if (inRange(eff, 66, 75)) {
      return eff;
    } else {
      switch (line) {
        case "D3-1":
          // return random(80, 83);
          return 79;
        case "D3-2":
          // return random(80, 83);
          return 80;
        case "D3-3":
          // return random(80, 83);
          return 78;
        case "D3-4":
          // return random(80, 83);
          return 79;
        case "D3-5":
          // return random(80, 83);
          return 80;
        case "D3-6":
          // return random(80, 83);
          return 77;
        case "D3-7":
          // return random(80, 83);
          return 81;
        case "D3-8":
          // return random(80, 83);
          return 69;
        case "D3-9":
          // return random(80, 83);
          return 66;
        case "D3-10":
          // return random(80, 83);
          return 69;
        case "D3-11":
          // return random(80, 83);
          return 81;
        case "D3-12":
          // return random(80, 83);
          return 0;
        case "D3-13":
          // return random(80, 83);
          return 0;
        case "D3-14":
          // return random(80, 83);
          return 0;
        case "D3-15":
          // return random(80, 83);
          return 0;
        case "D3-16":
          // return random(80, 83);
          return 0;
      }
    }
  }
};

export const handleFakeEffFloor = (floor, eff) => {
  switch (floor) {
    case "A-F1":
      // return random(80, 83);
      return 76;
    case "A-F2":
      // return random(80, 83);
      return 77;
    case "A-F4":
      // return random(80, 83);
      return 75;
    case "B-F2":
      // return random(80, 83);
      return 77;
    case "C-F2":
      // return random(80, 83);
      return 76;
    case "D-F1":
      // return random(80, 83);
      return 71;
    case "D-F3":
      // return random(80, 83);
      return 76;
  }
};

export const handleFakeModel = (model) => {
  if (model.indexOf("CAMPUS") !== -1) {
    return random(80, 83);
  } else if (model.indexOf("SAMBA") !== -1) {
    return random(80, 83);
  } else {
    return random(62, 66);
  }
};

export const handleFakeRftLine = (value) => {
  if (value !== 0) {
    return random(85, 88);
  }
  return 0;
};

//HOURLY OUTPUT BY FLOOR
export const handleFakeHourlyOutPutByFloor = (floor, target) => {
  return random(
    Math.round(target - target * 0.05),
    Math.round(target + target * 0.05)
  );
};

//HOURLY OUTPUT BY LINE
export const handleFakeTargetHourlyOutPutByLine = (floor) => {
  if (floor.includes("D3-")) {
    return 90;
  } else {
    return 140;
  }
};

export const handleFakeTargetHourlyOutPutByLines = (line) => {
  if (line.includes("D3-")) {
    return random(80, 100);
  } else {
    return random(130, 150);
  }
};

export const handleOutPutHour = (floor) => {
  if (floor === "D-F3") {
    return random(80, 90);
  } else {
    return random(130, 150);
  }
};
