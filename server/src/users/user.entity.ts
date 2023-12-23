import { Workspace } from 'src/workspaces/workspaces.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

// Database table model abstraction
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToMany(() => Workspace, (workspace) => workspace.members)
  workspaces: Workspace[];
}
