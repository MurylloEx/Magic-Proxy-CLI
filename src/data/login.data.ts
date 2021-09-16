import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsUUID, Matches, MaxLength, MinLength } from "class-validator";
import Docs from '../docs/swagger.json';

export class LoginData {

  @ApiProperty(Docs.datas.login.fields.name)
  @IsDefined()
  @MaxLength(64)
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9_\-@$!#.]+$/m)
  public name?: string;

  @ApiProperty(Docs.datas.login.fields.token)
  @IsDefined()
  @IsUUID()
  public token?: string;

}
