import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AcmeRequestData {

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  public domains: string[];

}