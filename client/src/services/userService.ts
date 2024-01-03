import axios from 'axios';
import { WORKSPACE_API_URL } from '../config';
import { GetUserDto } from '../dto/get-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const getAllUsers = async (): Promise<GetUserDto[]> => {
  const response = await axios.get(WORKSPACE_API_URL);
  return response.data;
};

export const getUserById = async (id: string): Promise<GetUserDto> => {
  const response = await axios.get(`${WORKSPACE_API_URL}${id}`);
  return response.data;
};

export const createUser = async (data: any): Promise<GetUserDto | null> => {
  const user: CreateUserDto = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    workspaces: data.workspaces,
  };
  return axios.post(WORKSPACE_API_URL, user);
};

export const updateUser = async (
  id: string,
  user: UpdateUserDto,
): Promise<GetUserDto> => {
  const response = await axios.patch(`${WORKSPACE_API_URL}${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<null> => {
  return axios.delete(`${WORKSPACE_API_URL}${id}`);
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;