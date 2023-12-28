export default interface GetWorkspaceDto {
  id: string;
  name: string;
  domain: string;
  samlEnabled: boolean;
  // TODO: Decide on storing members as an array of strings or an array of objects.
  members: string[];
}
