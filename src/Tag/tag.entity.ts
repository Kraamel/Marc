import { BaseEntity, Column, CreateDateColumn, Entity} from 'typeorm';

@Entity()
export class TagEntity extends BaseEntity {
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
