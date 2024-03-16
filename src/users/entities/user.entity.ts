import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: 'user unique identifier' })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
