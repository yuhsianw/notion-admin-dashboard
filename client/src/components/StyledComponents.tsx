/**
 * This file contains all the styled components used in the application,
 * primarily sourced from the MUI documentation. While I'm currently exploring
 * alternative approaches to Styled Components, these components are retained
 * here until they can be removed.
 *
 * @see: https://mui.com/material-ui/react-drawer/#persistent-drawer
 */
import { AppBar, AppBarProps, styled } from '@mui/material';
import { DRAWER_WIDTH } from '../config/constants';

export const DrawerHeaderStyledComponent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar, // necessary for content to be below app bar
}));

export const MainStyledComponent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `-${DRAWER_WIDTH}px`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarStyledComponentProps extends AppBarProps {
  open?: boolean;
}

export const AppBarStyledComponent = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarStyledComponentProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const LogoStyledComponent = styled('img')(({ theme }) => ({
  height: '30px',
  marginRight: theme.spacing(2),
}));
