/**
 * Should match server side dto at `server/src/users/dto`.
 */
export default interface CreateWorkspaceDto {
  name: string;

  domain: string;

  samlEnabled: boolean;

  members?: string[];
}
