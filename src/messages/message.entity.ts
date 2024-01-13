import { Chat } from 'src/chats/chat.entity';
import { User } from 'src/users/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('messages')
  export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'chat_id' })
    chatId: string;
  
    @Column({ name: 'sender_id' })
    sender_id: string;
  
    @Column({ name: 'content' })
    content: string;
  
    @Column({ name: 'timestamp' })
    timestamp: Date;

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn({ name: 'sender_id' })
    sender: User;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    @JoinColumn({ name: 'chat_id' })
    chat: Chat;

  }