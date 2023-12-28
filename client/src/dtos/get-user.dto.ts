export interface GetUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  // TODO:  Confirm workspace type
  workspaces: string[];
}
