import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  address1: string;
  @Column()
  address2: string;
  @Column()
  pincode: string;
  @OneToOne(() => User, (user) => user.address)
  user: User;
}
