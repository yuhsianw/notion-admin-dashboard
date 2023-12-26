import React, { PropsWithChildren } from 'react';
import { DrawerHeaderStyledComponent } from '../StyledComponents';

export default function DrawerHeader({ children }: PropsWithChildren<{}>) {
  return <DrawerHeaderStyledComponent>{children}</DrawerHeaderStyledComponent>;
}
