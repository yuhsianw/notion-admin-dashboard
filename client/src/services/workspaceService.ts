import axios from 'axios';
import GetWorkspaceDto from '../dto/get-workspace.dto';
import { BASE_URL } from '../config/constants';

const API_URL = `${BASE_URL}/workspaces/`;

export const getAllWorkspaces = async (): Promise<GetWorkspaceDto[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getWorkspaceById = async (
  id: string,
): Promise<GetWorkspaceDto> => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

export const createWorkspace = async (
  data: any,
): Promise<GetWorkspaceDto | null> => {
  const workspace = {
    name: data.name,
    domain: data.domain,
    samlEnabled: data.samlEnabled,
  };
  return axios.post(API_URL, workspace);
};

export const updateWorkspace = async (
  id: string,
  workspace: any,
): Promise<GetWorkspaceDto> => {
  const response = await axios.patch(`${API_URL}${id}`, workspace);
  return response.data;
};

export const deleteWorkspace = async (id: string): Promise<null> => {
  return axios.delete(`${API_URL}${id}`);
};

const workspaceService = {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};

export default workspaceService;
