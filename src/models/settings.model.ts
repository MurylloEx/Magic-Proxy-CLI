import { models } from '../docs/swagger.json';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsBoolean, IsDefined, IsInt, Max, Min, ValidateIf, validateOrReject } from "class-validator";

@Entity({ name: 'sys_settings' })
export class SettingsModel extends BaseEntity {

  @ApiProperty(models.settings.fields.id)
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty(models.settings.fields.timestamp)
  @ValidateIf(o => false)
  @Column()
  public timestamp?: number = +new Date;

  @ApiProperty(models.settings.fields.allowUnknownHost)
  @IsDefined()
  @IsBoolean()
  @Column()
  public allowUnknownHost?: boolean = false;

  @ApiProperty(models.settings.fields.allowWebsockets)
  @IsDefined()
  @IsBoolean()
  @Column()
  public allowWebsockets?: boolean = false;

  @ApiProperty(models.settings.fields.httpEnabled)
  @IsDefined()
  @IsBoolean()
  @Column()
  public httpEnabled?: boolean = true;

  @ApiProperty(models.settings.fields.httpsEnabled)
  @IsDefined()
  @IsBoolean()
  @Column()
  public httpsEnabled?: boolean = false;

  @ApiProperty(models.settings.fields.httpPort)
  @IsDefined()
  @IsInt()
  @Max(65535)
  @Min(0)
  @Column()
  public httpPort?: number = 8080;

  @ApiProperty(models.settings.fields.httpsPort)
  @IsDefined()
  @IsInt()
  @Max(65535)
  @Min(0)
  @Column()
  public httpsPort?: number = 8443;

  @ApiProperty(models.settings.fields.hstsEnabled)
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