import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from '../user/model';
import Post from './post';

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    content!: string;

    @ManyToOne(() => User, (user) => user.comments)
    user?: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post?: Post;
}
