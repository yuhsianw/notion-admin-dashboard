/**
 * Should match server side dto at `server/src/users/dto`.
 */ 
export interface UpdateUserDto {
  firstName?: string;

  lastName?: string;

  email?: string;
}
