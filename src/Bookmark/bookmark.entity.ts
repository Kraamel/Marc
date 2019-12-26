import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookmarkStatus } from './BookmarkStatus';
import { UserEntity } from '../Auth/user.entity';
import { TagEntity } from '../Tag/tag.entity';

@Entity()
export class BookmarkEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  title: string; /*recuperer de l'url*/

  @Column()
  url: string; /*obligatoire*/

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  review: number | null;

  @Column()
  status: BookmarkStatus = BookmarkStatus.TO_TEST;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => TagEntity)
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(type => UserEntity, user => user.bookmarks, { eager: false })
  user: UserEntity;

  @Column('uuid')
  userId: string;
}
