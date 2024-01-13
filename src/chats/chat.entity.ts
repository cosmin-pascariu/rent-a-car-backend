import { Message } from 'src/messages/message.entity';
import { User } from 'src/users/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('chats')
  export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'first_name' })
    firstName: string;
  
    @Column({ name: 'last_name' })
    lastName: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;

    @ManyToOne(() => User, (user) => user.chats)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];
  }