import { toasterMessage } from "./toasterMessage";
import { redirectToPath } from "./browser";

export const toasterAndRedirect = (toasterData, redirectPath) => {
  const { toasterType, message } = toasterData;
  toasterMessage(toasterType, message);
  setTimeout(() => {
    redirectToPath(redirectPath);
  }, 1000);
};
