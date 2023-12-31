/**
 * Should match server side dto at `server/src/users/dto`.
 */
export default interface GetWorkspaceDto {
  id: string;

  name: string;

  domain: string;

  samlEnabled: boolean;

  members: string[];
}
