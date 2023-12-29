/**
 * This entity represents the membership of a user in a workspace.
 */

import { User } from 'src/users/user.entity';
import { Workspace } from 'src/workspaces/workspaces.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class UserWorkspace {
  // TODO: Add role to membership
  // TODO: Add date joined to membership

  /**
   * Composite primary key of userId and workspaceId.
   * @see: https://github.com/typeorm/typeorm/issues/4653#issuecomment-525839855
   */
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  workspaceId: string;
  /**
   * Many membership can belong to one user.
   */
  @ManyToOne(() => User, (User) => User.memberships)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * Many members can belong to one workspace.
   */
  @ManyToOne(() => Workspace, (Workspace) => Workspace.memberships)
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;
}
