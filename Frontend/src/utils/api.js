import axios from "axios";
import config from "../config.json";

export const getLatestApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getLatestApis}`
  );

  return response.data.data;
};

export const getBestRatedApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getBestRatedApis}`
  );

  return response.data.data;
};

export const getRandomApi = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getRandomApi}`
  );

  return response.data.data;
};

export const addNewApi = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.createApi}`,
    data
  );

  return response.data.data;
};

export const searchApis = async (q, searchBy) => {
  const { Name, Category, UploadBy } = searchBy;

  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.searchApi}/?q=${q}&name=${Name}&category=${Category}&uploadby=${UploadBy}`
  );

  return response.data.data;
};

export const getAllCategories = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.getAllCategories}`
  );

  return response.data.data;
};
