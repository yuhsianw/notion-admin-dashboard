import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
