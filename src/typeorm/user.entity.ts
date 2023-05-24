import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Post } from './post.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  @JoinColumn()
  address: Address;
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
