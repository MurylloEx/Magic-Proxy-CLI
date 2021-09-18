import { models } from '../docs/swagger.json';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDefined, IsInt, IsUUID, Matches, MaxLength, MinLength, ValidateIf, validateOrReject } from "class-validator";

@Entity({ name: 'sys_users' })
export class UserModel extends BaseEntity {
  
  @ApiProperty(models.user.fields.id)
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty(models.user.fields.timestamp)
  @ValidateIf(o => false)
  @Column()
  public timestamp?: number = +new Date;

  @ApiProperty(models.user.fields.name)
  @IsDefined()
  @MaxLength(64)
  @MinLength(4)
  @Matches(/[a-zA-Z0-9_\-@$!#.]+/m)
  @Column({ unique: true })
  public name?: string;

  @ApiProperty(models.user.fields.token)
  @IsDefined()
  @IsUUID()
  @Column()
  public token?: string;

  @ApiProperty(models.user.fields.role)
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
