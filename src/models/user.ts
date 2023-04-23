import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Post from './post';
import Comment from './comment';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column('text', { nullable: true })
    bio?: string;

    @Column()
    password!: string;

    @OneToMany(() => Post, (post) => post.user)
    posts?: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments?: Comment[];
}
