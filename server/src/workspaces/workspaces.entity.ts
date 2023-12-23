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

  @ManyToMany(() => User, (user) => user.workspaces)
  @JoinTable()
  members: User[];

  @Column({ default: false })
  samlEnabled: boolean;
}
