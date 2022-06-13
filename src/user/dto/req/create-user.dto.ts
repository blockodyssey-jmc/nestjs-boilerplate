import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    protected  name: string

    @IsNumber()
    protected age: number

    @IsString()
    protected address: string

    @IsEmail()
    protected email: string
}
