import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookmarkStatus } from './BookmarkStatus';

@Entity()
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  title: string; /*recuperer de l'url*/

  @Column()
  url: string; /*obligatoire*/

  @Column({ nullable: true })
  description: string|null;

  @Column({ nullable: true })
  review: number|null;

  @Column({ nullable: true })
  tags: string|null;

  @Column()
  status: BookmarkStatus = BookmarkStatus.TO_TEST;
}
