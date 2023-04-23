import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import User from './user';
import Comment from './comment';

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title?: string;

    @Column('text')
    content!: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
}
