import axios from 'axios';
import { BASE_URL } from '../config/constants';
import { GetUserDto } from '../dto/get-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

const API_URL = `${BASE_URL}/users/`;

export const getAllUsers = async (): Promise<GetUserDto[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUserById = async (id: string): Promise<GetUserDto[]> => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

export const createUser = async (data: any): Promise<GetUserDto | null> => {
  const user: CreateUserDto = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  };
  return axios.post(API_URL, user);
};

export const updateUser = async (
  id: string,
  user: UpdateUserDto,
): Promise<GetUserDto> => {
  const response = await axios.patch(`${API_URL}${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<GetUserDto | null> => {
  return axios.delete(`${API_URL}${id}`);
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;