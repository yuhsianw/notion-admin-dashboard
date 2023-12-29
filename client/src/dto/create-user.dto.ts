/**
 * Should match server side dto at `server/src/users/dto`.
 */
export interface CreateUserDto {
  firstName: string;

  lastName: string;

  email: string;

  workspaces?: string[];
}
