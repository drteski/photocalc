import {
  exposureTable,
  luminanceTable,
  isoTable,
  apertureTable,
  shutterTable,
  ndTable,
  compensationTable,
  frameTable,
} from "@/public/data";

export const useExposureMetter = (mode, data) => {
  const { exposure, luminance, iso, aperture, shutter, nd, compensation } =
    data;

  const calculatorShutterSpeed = () => {};
  const calculateAperture = () => {};

  let settings = {
    exposure: exposureTable[exposure],
    luminance: luminanceTable[luminance],
    iso: isoTable[iso],
    aperture: apertureTable[aperture],
    shutter: shutterTable[shutter],
    nd: ndTable[nd],
    compensation: compensationTable[compensation],
  };

  switch (mode) {
    case "M":
      settings = {};
      break;
    case "A":
      settings = {};
      break;
    case "P":
      settings = {};
      break;
  }

  return settings;
};
