import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDefined, IsInt, IsUUID, Matches, MaxLength, MinLength, validateOrReject } from "class-validator";

@Entity({ name: 'sys_users' })
export class UserModel extends BaseEntity {
  
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @IsDefined()
  @MaxLength(64)
  @MinLength(4)
  @Matches(/[a-zA-Z0-9_\-@$!#.]+/gm)
  @Column()
  public name?: string;

  @IsDefined()
  @IsUUID()
  @Column()
  public token?: string;

  @IsDefined()
  @IsInt()
  @Column()
  public role?: number;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}
