import { Entity, Column, Index, OneToMany, JoinColumn,  } from 'typeorm';
import Model from './model.entity';
import { Task } from './tasks.entity';

@Entity('users')
class User extends Model {
  @Column()
  username: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;
  @OneToMany(() => Task, (task) => task.user, { eager: true , nullable: false})
  tasks: Task[];
}

export default User