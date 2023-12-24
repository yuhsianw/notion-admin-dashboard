import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  domain: string;

  /**
   * A list of users that is a member of this workspace. JoinTable is added here
   * since workspace is the owning side of the relationship.
   */
  @ManyToMany(() => User, (user) => user.workspaces)
  @JoinTable()
  members: User[];

  @Column({ default: false })
  samlEnabled: boolean;
}
