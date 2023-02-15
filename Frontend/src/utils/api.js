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

export const getAllBookmarks = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.bookmark.getAllBookmark}`
  );

  return response.data.data;
};

export const getUserById = async (userId) => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.getById}/${userId}`
  );

  return response.data.data;
};

export const getApiById = async (apiId) => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getApiById}/${apiId}`
  );

  return response.data.data;
};

export const editUser = async (userId, data) => {
  const response = await axios.put(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.editUser}/${userId}`,
    data
  );

  return response.data.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.getAllUsers}`
  );

  return response.data.data;
};

export const getTotalUpvotes = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getTotalUpvotes}`
  );

  return response.data.data;
};

export const getAllApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getAllApis}`
  );

  return response.data.data;
};

export const getCategoryById = async (id) => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.getById}/${id}`
  );

  return response.data.data;
};

export const addNewCategory = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.createCategory}`,
    data
  );

  return response.data.data;
};

export const editCategory = async (id, data) => {
  const response = await axios.put(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.updateCategory}/${id}`,
    data
  );

  return response.data.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.deleteCategory}/${id}`
  );

  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.deleteUser}/${id}`
  );

  return response.data.data;
};

export const deleteApi = async (id) => {
  const response = await axios.delete(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.deleteApi}/${id}`
  );

  return response.data.data;
};

export const upvoteApi = async (id) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.upvoteApi}/${id}`
  );

  return response.data.data;
};
