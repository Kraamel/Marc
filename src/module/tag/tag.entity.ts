import { BaseEntity, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('tag')
export class TagEntity extends BaseEntity {
  @PrimaryColumn()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
