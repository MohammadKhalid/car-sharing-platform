export class User{
    name: string;
    email: string;
    phone: string;
    address: string;
    approved: boolean;
    constructor(){
        this.name = null;
        this.email = null;
        this.phone = null;
        this.address = null;
        this.approved = false;
    }
}