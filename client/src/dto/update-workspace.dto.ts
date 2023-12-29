/**
 * Should match server side dto at `server/src/users/dto`.
 */
export default interface UpdateWorkspaceDto {
  name?: string;

  domain?: string;

  samlEnabled?: boolean;

  members?: string[];
}
