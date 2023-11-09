import { Entity, Column, Index,  } from 'typeorm';
import Model from './model.entity';

@Entity('users')
export class User extends Model {
  @Column()
  username: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;
  
}
