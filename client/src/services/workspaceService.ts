import axios from 'axios';
import GetWorkspaceDto from '../dto/get-workspace.dto';
import CreateWorkspaceDto from '../dto/create-workspace.dto';
import UpdateWorkspaceDto from '../dto/update-workspace.dto';
import { USER_API_URL } from '../config';

export const getAllWorkspaces = async (): Promise<GetWorkspaceDto[]> => {
  const response = await axios.get(USER_API_URL);
  return response.data;
};

export const getWorkspaceById = async (
  id: string,
): Promise<GetWorkspaceDto> => {
  const response = await axios.get(`${USER_API_URL}${id}`);
  return response.data;
};

export const createWorkspace = async (
  data: any,
): Promise<GetWorkspaceDto | null> => {
  const workspace: CreateWorkspaceDto = {
    name: data.name,
    domain: data.domain,
    samlEnabled: data.samlEnabled,
    members: data.members,
  };
  return axios.post(USER_API_URL, workspace);
};

export const updateWorkspace = async (
  id: string,
  workspace: UpdateWorkspaceDto,
): Promise<GetWorkspaceDto> => {
  const response = await axios.patch(`${USER_API_URL}${id}`, workspace);
  return response.data;
};

export const deleteWorkspace = async (id: string): Promise<null> => {
  return axios.delete(`${USER_API_URL}${id}`);
};

const workspaceService = {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};

export default workspaceService;
