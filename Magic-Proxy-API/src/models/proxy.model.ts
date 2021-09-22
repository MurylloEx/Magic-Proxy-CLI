import { models } from '../docs/swagger.json';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsDefined, IsInt, IsOptional, MaxLength, Min, MinLength, ValidateIf, validateOrReject } from "class-validator";

@Entity({ name: 'sys_proxies' })
export class ProxyModel extends BaseEntity {

  @ApiProperty(models.proxy.fields.id)
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty(models.proxy.fields.timestamp)
  @ValidateIf(o => false)
  @Column()
  public timestamp?: number = +new Date;

  @ApiProperty(models.proxy.fields.isDefault)
  @IsDefined()
  @IsBoolean()
  @Column()
  public isDefault?: boolean = false;

  @ApiProperty(models.proxy.fields.domain)
  @IsDefined()
  @MinLength(1)
  @MaxLength(1024)
  @Column()
  public domain?: string;

  @ApiProperty(models.proxy.fields.timeout)
  @IsInt()
  @Min(1000)
  @Column()
  public timeout?: number = 1000;

  @ApiProperty(models.proxy.fields.round)
  @IsInt()
  @Min(0)
  @Column()
  public round?: number = 0;

  @ApiProperty(models.proxy.fields.destinations)
  @IsOptional()
  @Column()
  public destinations?: string;

  @ApiProperty(models.proxy.fields.websockDestinations)
  @IsOptional()
  @Column()
  public websockDestinations?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}