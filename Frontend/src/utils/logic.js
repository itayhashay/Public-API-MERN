import { toasterMessage } from "./toasterMessage";
import { redirectToPath } from "./browser";

export const toasterAndRedirect = (toasterData, redirectPath) => {
  const { toasterType, message } = toasterData;
  toasterMessage(toasterType, message);
  setTimeout(() => {
    redirectToPath(redirectPath);
  }, 2000);
};

export const getPropValue = (propObj, path) => {
  const pathLevels = path.split(".");
  const propValue = pathLevels.reduce((value, level) => {
    const val = value[level];

    return val || "-";
  }, propObj);

  return propValue;
};
