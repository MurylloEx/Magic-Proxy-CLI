import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsDefined, IsInt, Max, Min, ValidateIf, validateOrReject } from "class-validator";

@Entity({ name: 'sys_settings' })
export class SettingsModel extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ValidateIf(o => false)
  @Column()
  public timestamp?: number = +new Date;

  @IsDefined()
  @IsBoolean()
  @Column()
  public allowUnknownHost?: boolean = false;

  @IsDefined()
  @IsBoolean()
  @Column()
  public allowWebsockets?: boolean = false;

  @IsDefined()
  @IsBoolean()
  @Column()
  public httpEnabled?: boolean = true;

  @IsDefined()
  @IsBoolean()
  @Column()
  public httpsEnabled?: boolean = false;

  @IsDefined()
  @IsInt()
  @Max(65535)
  @Min(0)
  @Column()
  public httpPort?: number = 8080;

  @IsDefined()
  @IsInt()
  @Max(65535)
  @Min(0)
  @Column()
  public httpsPort?: number = 8443;

  @IsDefined()
  @IsBoolean()
  @Column()
  public hstsEnabled?: boolean = false;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}