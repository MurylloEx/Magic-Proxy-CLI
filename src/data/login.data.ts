import { IsDefined, IsUUID, Matches, MaxLength, MinLength, validateOrReject } from "class-validator";

export class LoginData {

  @IsDefined()
  @MaxLength(64)
  @MinLength(4)
  @Matches(/[a-zA-Z0-9_\-@$!#.]+/gm)
  public name?: string;

  @IsDefined()
  @IsUUID()
  public token?: string;

}