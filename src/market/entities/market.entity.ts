export class Market {
    private _id: number
    private _name: string
    private _desc: string

    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get desc(): string {
        return this._desc
    }
    public set desc(value: string) {
        this._desc = value
    }
}