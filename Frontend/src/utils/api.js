import axios from "axios";
import config from "../config.json";

export const getLatestApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.getLatestApis}`
  );

  return response.data.data;
};

export const getBestRatedApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.getBestRatedApis}`
  );

  return response.data.data;
};

export const getRandomApi = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.getRandomApi}`
  );

  return response.data.data;
};

export const addNewApi = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.createApi}`,
    data
  );

  return response.data.data;
};

export const searchApis = async (q, searchBy) => {
  const { Name, Category, UploadBy } = searchBy;

  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.searchApi}/?q=${q}&name=${Name}&category=${Category}&uploadby=${UploadBy}`
  );

  return response.data.data;
};
