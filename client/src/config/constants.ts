import { randomId } from '@mui/x-data-grid-generator';
import { UserGridRow } from '../components/Users/UsersTable';
import { WorkspaceGridRow } from '../components/Workspaces/WorkspacesTable';

export const DRAWER_WIDTH = 240;

export const BASE_URL = 'http://localhost:3000';

export const POLLING_INTERVAL = 1000 * 5;

export const DEFAULT_WORKSPACE_ROWS: WorkspaceGridRow[] = [
  {
    id: randomId(),
    name: 'Engineering',
    domain: 'eng',
    samlEnabled: false,
    members: [],
  },
  {
    id: randomId(),
    name: 'Design',
    domain: 'design',
    samlEnabled: false,
    members: [],
  },
  {
    id: randomId(),
    name: 'Sales',
    domain: 'sales',
    samlEnabled: false,
    members: [],
  },
  {
    id: randomId(),
    name: 'Marketing',
    domain: 'marketing',
    samlEnabled: false,
    members: [],
  },
];

export const DEFAULT_USER_ROWS: UserGridRow[] = [
  {
    id: randomId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'example@com',
    workspaces: [],
  },
];
