export class Invoice{
    date: Date;
    amount: number;
    hasPaid: boolean;
    user: string;
    constructor(){
        this.date = null;
        this.amount = null;
        this.hasPaid = null;
        this.user = null;
    }
}