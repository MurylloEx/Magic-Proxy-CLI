import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEmail, IsFQDN, IsNotEmpty } from "class-validator";

export class AcmeRequestData {

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsArray()
  @IsFQDN({}, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  public domains: string[];

}