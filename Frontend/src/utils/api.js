import axios from "axios";
import config from "../config.json";
import { getUserToken } from "../utils/browser";

const headers = (token) => {
  token = token ? token : getUserToken();
  return { headers: { Authorization: token ? `Bearer ${token}` : undefined } };
};

export const getLatestApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getLatestApis}`,
    headers()
  );

  return response.data.data;
};

export const getBestRatedApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getBestRatedApis}`,
    headers()
  );

  return response.data.data;
};

export const getRandomApi = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getRandomApi}`,
    headers()
  );

  return response.data.data;
};

export const addNewApi = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.createApi}`,
    data,
    headers()
  );

  return response.data.data;
};

export const searchApis = async (q, searchBy) => {
  const { Name, Category, UploadBy } = searchBy;

  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.searchApi}/?q=${q}&name=${Name}&category=${Category}&uploadby=${UploadBy}`,
    headers()
  );

  return response.data.data;
};

export const getAllCategories = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.getAllCategories}`,
    headers()
  );

  return response.data.data;
};

export const getAllBookmarks = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.bookmark.getAllBookmark}`,
    headers()
  );

  return response.data.data;
};

export const getUserById = async (userId, token) => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.getById}/${userId}`,
    headers(token)
  );

  return response.data.data;
};

export const getUserInfoByToken = async (token) => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.userByToken}`,
    headers(token)
  );

  return response.data.data;
};

export const getApiById = async (apiId) => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getApiById}/${apiId}`,
    headers()
  );

  return response.data.data;
};

export const editUser = async (userId, data) => {
  const response = await axios.put(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.editUser}/${userId}`,
    data,
    headers()
  );

  return response.data.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.getAllUsers}`,
    headers()
  );

  return response.data.data;
};

export const getTotalUpvotes = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getTotalUpvotes}`,
    headers()
  );

  return response.data.data;
};

export const getAllApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.getAllApis}`,
    headers()
  );

  return response.data.data;
};

export const getCategoryById = async (id) => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.getById}/${id}`,
    headers()
  );

  return response.data.data;
};

export const addNewCategory = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.createCategory}`,
    data,
    headers()
  );

  return response.data.data;
};

export const editCategory = async (id, data) => {
  const response = await axios.put(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.updateCategory}/${id}`,
    data,
    headers()
  );

  return response.data.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.deleteCategory}/${id}`,
    headers()
  );

  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.deleteUser}/${id}`,
    headers()
  );

  return response.data.data;
};

export const deleteApi = async (id) => {
  const response = await axios.delete(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.deleteApi}/${id}`,
    headers()
  );

  return response.data.data;
};

export const upvoteApi = async (id) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.api.upvoteApi}/${id}`,
    {},
    headers()
  );

  return response.data.data;
};

export const createUser = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.users.createUser}`,
    data,
    headers()
  );

  return response.data.data;
};

export const signUpUser = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.auth.signup}`,
    data,
    headers()
  );

  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.auth.login}`,
    data,
    headers()
  );

  return response.data;
};

export const getAmountsOfApis = async () => {
  const response = await axios.get(
    `${config.serverConfig.baseUrl}${config.serverConfig.routes.category.getAmountsOfApis}`,
    headers()
  )

  return response.data.data;
}