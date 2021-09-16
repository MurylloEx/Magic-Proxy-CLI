import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsDefined, IsInt, IsOptional, MaxLength, Min, MinLength, ValidateIf, validateOrReject } from "class-validator";

@Entity({ name: 'sys_proxies' })
export class ProxyModel extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ValidateIf(o => false)
  @Column()
  public timestamp?: number = +new Date;

  @IsDefined()
  @IsBoolean()
  @Column()
  public isDefault?: boolean = false;

  @IsDefined()
  @MinLength(4)
  @MaxLength(1024)
  @Column()
  public domain?: string;

  @IsInt()
  @Min(1000)
  @Column()
  public timeout?: number = 1000;

  @IsInt()
  @Min(0)
  @Column()
  public round?: number = 0;

  @IsOptional()
  @Column()
  public destinations?: string;

  @IsOptional()
  @Column()
  public websockDestinations?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}