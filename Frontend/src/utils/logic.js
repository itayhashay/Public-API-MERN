import { toasterMessage } from "./toasterMessage";
import { redirectToPath } from "./browser";
import { getUserInfoByToken } from "./api";

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

export const getFirstLetterAvatar = () => {};

export const removeSpaceBetweenWords = (word) => {
  return word.split(" ").join("");
};

export const filterObjectByKeys = (originalObj, keys) => {
  return keys.reduce((obj, key) => {
    return Object.assign(obj, {
      [key]: originalObj[key],
    });
  }, {});
};

export const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const getUserByToken = async (userToken) => {
  return await getUserInfoByToken(userToken);
};
