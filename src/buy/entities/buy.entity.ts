export class Buy {
    constructor() { }

    private _id: number
    private _market_id: number
    private _name: string
    private _desc: string
    private _order_date: Date

    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }
    public get market_id(): number {
        return this._market_id
    }
    public set market_id(value: number) {
        this._market_id = value
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
    public get order_date(): Date {
        return this._order_date
    }
    public set order_date(value: Date) {
        this._order_date = value
    }
}