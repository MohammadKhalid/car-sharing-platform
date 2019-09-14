export class Invoice{
    
    constructor(
        private date: Date = null,
        private amount: number = null,
        private hasPaid: boolean = null,
        private user: string = null,
        public screenshot: string = ""
    ){
    }
}