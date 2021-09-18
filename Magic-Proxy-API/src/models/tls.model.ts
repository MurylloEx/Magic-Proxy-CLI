import { models } from '../docs/swagger.json';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDefined, IsNotEmpty, MaxLength, ValidateIf, validateOrReject } from "class-validator";

@Entity({ name: 'sys_tls' })
export class TlsModel extends BaseEntity {

  @ApiProperty(models.tls.fields.id)
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty(models.tls.fields.timestamp)
  @ValidateIf(o => false)
  @Column()
  public timestamp?: number = +new Date;

  @ApiProperty(models.tls.fields.certificate)
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(131072)
  @Column()
  public certificate?: string;

  @ApiProperty(models.tls.fields.privateKey)
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(131072)
  @Column()
  public privateKey?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}