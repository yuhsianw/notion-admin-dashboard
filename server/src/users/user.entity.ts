import { UserWorkspace } from 'src/user-workspace/user-workspace.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

/**
 * User entity is the abstraction of the database user table.
 * TODO: Decouple the two by creating an entity schema.
 * @see: https://docs.nestjs.com/techniques/database#separating-entity-definition
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO: Add back null restriction after completing error handling.
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  /**
   * One user can have many memberships.
   * `JoinColumn` marks this as the owner of the relationship. A foreign key
   * will be created on the `user_workspace` table.
   */
  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.user)
  @JoinColumn()
  memberships: UserWorkspace[];
}
