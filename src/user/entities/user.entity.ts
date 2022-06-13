export class User {
    constructor() { }

    private _uid: number
    private _name: string
    private _age: number
    private _address: string
    private _email: string

    public get uid(): number {
        return this._uid
    }

    public set uid(value: number) {
        this._uid = value
    }

    public get age(): number {
        return this._age
    }
    public set age(value: number) {
        this._age = value
    }

    public get address(): string {
        return this._address
    }
    public set address(value: string) {
        this._address = value
    }

    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }

    public get email(): string {
        return this._email
    }
    public set email(value: string) {
        this._email = value
    }
}
