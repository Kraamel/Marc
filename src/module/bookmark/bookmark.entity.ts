import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookmarkStatusEnum } from './bookmark-status.enum';
import { UserEntity } from '../auth/user.entity';
import { TagEntity } from '../tag/tag.entity';

@Entity('bookmark')
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
  //   type: 'enum',
  //   enum: BookmarkStatusEnum,
  //   default: BookmarkStatusEnum.TO_TEST,
  status: BookmarkStatusEnum = BookmarkStatusEnum.TO_TEST;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => TagEntity)
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(type => UserEntity, user => user.bookmarks, { eager: false })
  user: UserEntity;
}
