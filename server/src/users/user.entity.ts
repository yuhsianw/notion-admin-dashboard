import { UserWorkspace } from 'src/user-workspace/user-workspace.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

/**
 * User entity is the abstraction of the database user table. A recommended
 * practice is to decouple the two by creating an entity schema. Skipping that
 * for simplicity.
 * @see: https://docs.nestjs.com/techniques/database#separating-entity-definition
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  /**
   * One user can have many memberships.
   */
  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.user)
  @JoinColumn()
  memberships: UserWorkspace[];
}
