import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  comment: string;
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
