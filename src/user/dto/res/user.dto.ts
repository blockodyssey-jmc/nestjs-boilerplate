import { CreateUserDto } from "../req/create-user.dto";

export class UserDto extends CreateUserDto {
    protected uid: number

    constructor(uid: number, name: string, age: number, address: string, email: string) {
        super();
        this.uid = uid
        this.name = name
        this.age = age
        this.address = address
        this.email = email
    }
}
