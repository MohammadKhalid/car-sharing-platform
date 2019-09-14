import { Component, OnInit } from '@angular/core';
import { Invoice } from '../services/invoice';
import { InvoicesService } from '../services/invoices.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
    generateVisible = false;
    invoices: Invoice[];
    ngOnInit() {
        this.invoicesService.list().subscribe(
            res => {
                this.invoices = res;
                console.log(res);
            },
            err => {
                console.log("Error occured");
            });
    }
    confirmPayment(data){
        this.invoicesService.confirm(data);
    }
    invalidatePayment(data){
        this.invoicesService.invalidate(data);
    }
    submit(form) {
        var data = form.value;
        this.invoicesService.generate(data);
    }

    constructor(private invoicesService: InvoicesService) { }

}
