import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import User  from './user.entity';

@Entity('tasks')
export class Task extends Model {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: false,
  })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {nullable: false})
  @JoinColumn({name: 'userId'})
  user: User;
}
