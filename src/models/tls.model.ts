import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDefined, MaxLength, ValidateIf, validateOrReject } from "class-validator";

@Entity({ name: 'sys_tls' })
export class TlsModel extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ValidateIf(o => false)
  @Column()
  public timestamp?: number = +new Date;

  @IsDefined()
  @MaxLength(131072)
  @Column()
  public certificate?: string;

  @IsDefined()
  @MaxLength(131072)
  @Column()
  public privateKey?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}