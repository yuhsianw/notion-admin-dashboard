import { randomId } from '@mui/x-data-grid-generator';
import { UserGridRow } from './components/Users/UsersTable';
import { WorkspaceGridRow } from './components/Workspaces/WorkspacesTable';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * API
 */
export const DEV_HOSTNAME = 'localhost';
export const DEV_PORT = 3000;
export const PROD_HOSTNAME = window.location.hostname;
export const BASE_URL = isProduction
  ? `${window.location.origin}/api`
  : `http://${DEV_HOSTNAME}:${DEV_PORT}/api`;
export const USER_API_URL = `${BASE_URL}/workspaces/`;
export const WORKSPACE_API_URL = `${BASE_URL}/users/`;
export const POLLING_INTERVAL = 1000 * 5;

/**
 * Data
 */
export const DEFAULT_WORKSPACE_ROWS: WorkspaceGridRow[] = [
  {
    id: randomId(),
    name: 'Engineering',
    domain: 'eng',
    samlEnabled: true,
    members: [],
  },
  {
    id: randomId(),
    name: 'Design',
    domain: 'design',
    samlEnabled: true,
    members: [],
  },
  {
    id: randomId(),
    name: 'Product',
    domain: 'product',
    samlEnabled: false,
    members: [],
  },
  {
    id: randomId(),
    name: 'Marketing',
    domain: 'mkt',
    samlEnabled: false,
    members: [],
  },
].reverse();
export const DEFAULT_USER_ROWS: UserGridRow[] = [
  {
    id: randomId(),
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'adal@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Douglas',
    lastName: 'Engelbart',
    email: 'douglase@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Alan',
    lastName: 'Kay',
    email: 'alank@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Grace',
    lastName: 'Hopper',
    email: 'graceh@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'John',
    lastName: 'von Neumann',
    email: 'johnv@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Claude',
    lastName: 'Shannon',
    email: 'claudes@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Tim',
    lastName: 'Berners-Lee',
    email: 'timb@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Donald',
    lastName: 'Knuth',
    email: 'donaldk@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Vint',
    lastName: 'Cerf',
    email: 'vintc@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Bob',
    lastName: 'Kahn',
    email: 'bobk@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Niklaus',
    lastName: 'Wirth',
    email: 'niklausw@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'John',
    lastName: 'McCarthy',
    email: 'johnm@example.com',
    workspaces: [],
  },
  {
    id: randomId(),
    firstName: 'Linus',
    lastName: 'Torvalds',
    email: 'linust@example.com',
    workspaces: [],
  },
].reverse();

/**
 * UI
 */
export const DRAWER_WIDTH = 240;
export const EDIT_CELL_ITEM_HEIGHT = 48;
export const EDIT_CELL_ITEM_PADDING_TOP = 8;
export const DEFAULT_PAGE_SIZE = 10;