/**
 * Should match server side dto at `server/src/users/dto`.
 */
export interface GetUserDto {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  workspaces: string[];
}
