import { Workspace } from '../workspaces/workspaces.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

/**
 * User entity is the abstraction of the database user table. A recommended
 * practice is to decouple the two by creating an entity schema. Skipping that
 * for simplicity.
 * @see: https://docs.nestjs.com/techniques/database#separating-entity-definition
 */
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
