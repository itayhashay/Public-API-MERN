import { toast } from "react-toastify";
import { toasterTypes, toasterProps } from "./constants/toaster";

export const toasterMessage = (ToasterType, message) => {
  switch (ToasterType) {
    case toasterTypes.INFO:
      toast.info(message, toasterProps);
      break;
    case toasterTypes.SUCCESS:
      toast.success(message, toasterProps);
      break;
    case toasterTypes.ERROR:
      toast.error(message, toasterProps);
      break;
    case toasterTypes.WARNING:
      toast.warn(message, toasterProps);
      break;
    default:
      break;
  }
};
