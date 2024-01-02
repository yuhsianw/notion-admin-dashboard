import { UserWorkspace } from 'src/user-workspace/user-workspace.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Workspace entity that represents the workspaces table in the database.
 */
@Entity()
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  domain: string;

  @Column({ default: false })
  samlEnabled: boolean;

  /**
   * One workspace can have many members.
   * `JoinColumn` marks this as the owner side of the relationship.
   * A foreign key will be created in the `user_workspaces` table.
   * @see: https://typeorm.io/relations
   * @see: https://typeorm.io/faq#what-does-owner-side-in-a-relations-mean-or-why-we-need-to-use-joincolumn-and-jointable
   */
  @OneToMany(() => UserWorkspace, (UserWorkspace) => UserWorkspace.workspace)
  @JoinColumn({ referencedColumnName: 'user' })
  memberships: UserWorkspace[];
}
